
import { InstitucionCreationAttributes, IntegranteCreationAttributes, PalabraClave, PersonaCreationAttributes, PropuestaCapacitacion, PropuestaCreationAttributes, PropuestaLineaTematica, PropuestaPalabraClave, PropuestaPrevia, PropuestaProgramaExtension, PropuestaRelacionada, ResponsableCreationAttributes, RolIntegranteCreationAttributes, initModels } from "../models/init-models";
import { request, response } from "express";
import logger from '../config/logsConfig';
import ServiciosPropuesta from '../services/propuesta';
import sequelizeExtension from "../config/dbConfig";
import ServiciosInstitucion from "../services/institucion";
import ServiciosIntegrantes from "../services/integrante";
import { ValidationError } from "sequelize";
import { ServiciosObjetivoEspecifico } from "../services/planificacion";

export const getPropuesta = async(req : typeof request , res : typeof response)=>{
    
    try {
        const {codigoPropuesta} = req.params;
        
        const {Propuesta} = initModels(sequelizeExtension);

        const iPropuesta = await Propuesta.findByPk(codigoPropuesta);
        
        if(!iPropuesta) throw { status : 400 , message : 'propuesta no encontrada'}
        
        const iServiciosPropuesta = new ServiciosPropuesta();
        
        await iServiciosPropuesta.leerDatosDeBD(iPropuesta);
    
   
        res.status(200).json({
            ok : true,
            data : {
                ...iServiciosPropuesta.verDatos(iPropuesta),
                integrantes: iServiciosPropuesta.verIntegrantes(iPropuesta),
                instituciones : iServiciosPropuesta.verInstituciones(iPropuesta),
                objetivosEspecificos : iServiciosPropuesta.verObjetivosEspecificos(iPropuesta),
                propuestaPalabrasClave : iServiciosPropuesta.verPalabrasClave(iPropuesta),
                propuestaLineasTematicas : iServiciosPropuesta.verLineasTematicas(iPropuesta),
                propuestaCapacitaciones : iServiciosPropuesta.verCapacitaciones(iPropuesta),
                propuestaProgramasExtension : iServiciosPropuesta.verProgramasSippe(iPropuesta),
                propuestasPrevias : iServiciosPropuesta.verPropPrevias(iPropuesta),
                propuestasRelacionadas : iServiciosPropuesta.verPropRelacionadas(iPropuesta)
            },
            error : null
        })
        

    } catch (error : any) {
        logger.log('error',error.status,' - ',error.message);
        res.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.message
        })
    }
}

export const postPropuesta = async(req : typeof request , res : typeof response)=>{
    const transaction = await sequelizeExtension.transaction();
    try {
      

    } catch (error : any) {
        await transaction.rollback();
        logger.log('error',error.status,' - ',error.message);
        res.status(500).json({
            ok : false,
            data : null,
            error : 'Error de servidor'
        })
    }
}
export const putPropuesta = async(req : typeof request , res : typeof response)=>{
    try {
        /**... */

       const {codigoPropuesta} = req.params;
       const {
        integrantes,
        instituciones,
        objetivosEspecificos,
        propuestaPalabrasClave,
        propuestaLineasTematicas,
        propuestaCapacitaciones,
        propuestaProgramasExtension,
        propuestasPrevias,
        propuestasRelacionadas,
        ...restData}  = req.body;

       const {Propuesta} = initModels(sequelizeExtension);

       const iPropuesta = await Propuesta.findByPk(codigoPropuesta);
       
       if(!iPropuesta) throw { status : 400 , message : 'propuesta no encontrada'}
       
       const iServiciosPropuesta = new ServiciosPropuesta();

        // await iServiciosPropuesta.leerDatosDeBD(iPropuesta);


       iServiciosPropuesta.editarDatos(iPropuesta,restData);

        console.log('inicio cargas')
        if(integrantes && integrantes.length){
           const SIntegrantes = new ServiciosIntegrantes();
           const lIntegrantes = integrantes.map( (integ : any) => SIntegrantes.crearIntegrante( integ))
           iServiciosPropuesta.cargarIntegrantes(iPropuesta,lIntegrantes);
        }
        if(instituciones && instituciones.length) {
            const SIntituciones = new ServiciosInstitucion();
            const lInstituciones = instituciones.map( (inst : any)=> SIntituciones.crearInstitucion(inst))
            iServiciosPropuesta.cargarInstituciones(iPropuesta,lInstituciones);
        }
        if(objetivosEspecificos && objetivosEspecificos.length) {
            const SObjetivos = new ServiciosObjetivoEspecifico();

            const lObjetivos = objetivosEspecificos.map(  (obj : any) => SObjetivos.crearObjetivoEspecifico(obj) );
            iServiciosPropuesta.cargarObjetivosEspecificos(iPropuesta,lObjetivos);
        }
        if(propuestaPalabrasClave){
            const lPalabraClaves = propuestaPalabrasClave.map( (propPalabra : any) => {
                const iPropPalabra = PropuestaPalabraClave.build(propPalabra);
                iPropPalabra.palabraClave = PalabraClave.build(propPalabra.palabraClave);
                return iPropPalabra;
            }) 
            iServiciosPropuesta.cargarPalabrasClave(iPropuesta,lPalabraClaves);
        }
        if(propuestaLineasTematicas){
            iServiciosPropuesta.cargarLineasTematicas(iPropuesta,PropuestaLineaTematica.bulkBuild(propuestaLineasTematicas))
        }
        if(propuestaCapacitaciones){
            iServiciosPropuesta.cargarCapacitaciones(iPropuesta,PropuestaCapacitacion.bulkBuild(propuestaCapacitaciones))
        }
        if(propuestaProgramasExtension){
            iServiciosPropuesta.cargarProgramasSippe(iPropuesta,PropuestaProgramaExtension.bulkBuild(propuestaProgramasExtension))
        }
        if(propuestasPrevias){
            iServiciosPropuesta.cargarPropPrevias(iPropuesta,PropuestaPrevia.bulkBuild(propuestasPrevias))
        }
        if(propuestasRelacionadas){
            iServiciosPropuesta.cargarPropRelacionadas(iPropuesta,PropuestaRelacionada.bulkBuild(propuestasRelacionadas))
        }
        
        await iServiciosPropuesta.guardarDatosEnBD(iPropuesta);



       res.status(200).json({
        ok : true,
        data : {
            ...iServiciosPropuesta.verDatos(iPropuesta),
            integrantes: iServiciosPropuesta.verIntegrantes(iPropuesta),
            instituciones : iServiciosPropuesta.verInstituciones(iPropuesta),
            objetivosEspecificos : iServiciosPropuesta.verObjetivosEspecificos(iPropuesta),
            palabrasClave : iServiciosPropuesta.verPalabrasClave(iPropuesta),
            propuestaLineasTematicas : iServiciosPropuesta.verLineasTematicas(iPropuesta),
            propuestaCapacitaciones : iServiciosPropuesta.verCapacitaciones(iPropuesta),
            propuestaProgramasExtension : iServiciosPropuesta.verProgramasSippe(iPropuesta),
            propuestasPrevias : iServiciosPropuesta.verPropPrevias(iPropuesta),
            propuestasRelacionadas : iServiciosPropuesta.verPropRelacionadas(iPropuesta)
        },
        error : null
       })


    } catch (error : any) {
        logger.log('error',error.status,' - ',error.message);
        if(error instanceof ValidationError){
            console.log(error)
            res.status(400).json({
                ok : false,
                data : null,
                error : error.errors
            })
        } else {
            console.log(error)
            res.status(500).json({
                ok : false,
                data : null,
                error : 'Error de servidor'
            })
        }
       
    }
}
export const deletePropuesta = async(req : typeof request , res : typeof response)=>{
    try {
        /**... */
        

    } catch (error : any) {
        logger.log('error',error.status,' - ',error.message);
        res.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.message
        })
    }
}

