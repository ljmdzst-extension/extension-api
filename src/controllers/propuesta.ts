
import { InstitucionCreationAttributes, IntegranteCreationAttributes, PersonaCreationAttributes, PropuestaCreationAttributes, ResponsableCreationAttributes, RolIntegranteCreationAttributes, initModels } from "../models/init-models";
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
        
        await iServiciosPropuesta.leerDatos(iPropuesta)
            .then(()=>iServiciosPropuesta.leerDatosIntegrantes(iPropuesta))
            .then(()=>iServiciosPropuesta.leerDatosInstituciones(iPropuesta))
            .then(()=>iServiciosPropuesta.leerDatosObjetivos(iPropuesta))
            .then(()=>iServiciosPropuesta.leerDatosPalabrasClave(iPropuesta));
    
   
        res.status(200).json({
            ok : true,
            data : {
                ...iServiciosPropuesta.verDatos(iPropuesta),
                integrantes: iServiciosPropuesta.verIntegrantes(iPropuesta),
                instituciones : iServiciosPropuesta.verInstituciones(iPropuesta),
                objetivosEspecificos : iServiciosPropuesta.verObjetivosEspecificos(iPropuesta),
                palabrasClave : iServiciosPropuesta.verPalabrasClave(iPropuesta),
                propuestaObjetivos : iServiciosPropuesta.verObjetivosEspecificos(iPropuesta),
                propuestaLineasTematicas : iServiciosPropuesta.verLineasTematicas(iPropuesta),
                propuestaCapacitaciones : iServiciosPropuesta.verCapacitaciones(iPropuesta),
                propuestaProgramasExtension : iServiciosPropuesta.verProgramasSippe(iPropuesta)
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
       const {integrantes,instituciones,objetivos,...restData}  = req.body;


       const {Propuesta} = initModels(sequelizeExtension);

       const iPropuesta = await Propuesta.findByPk(codigoPropuesta);
       
       if(!iPropuesta) throw { status : 400 , message : 'propuesta no encontrada'}
       
       const iServiciosPropuesta = new ServiciosPropuesta();

       await iServiciosPropuesta.leerDatos(iPropuesta);
       await iServiciosPropuesta.leerDatosIntegrantes(iPropuesta);
       await iServiciosPropuesta.leerDatosInstituciones(iPropuesta);
       await iServiciosPropuesta.leerDatosObjetivos(iPropuesta);
       await iServiciosPropuesta.leerDatosPalabrasClave(iPropuesta);


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
        if(objetivos && objetivos.length) {
            const SObjetivos = new ServiciosObjetivoEspecifico();

            const lObjetivos = objetivos.map(  (obj : any) => SObjetivos.crearObjetivoEspecifico(obj) );
            iServiciosPropuesta.cargarObjetivosEspecificos(iPropuesta,lObjetivos);
        }
        
        await iServiciosPropuesta.guardarDatosIntegrantes(iPropuesta);
        await iServiciosPropuesta.guardarDatosInstituciones(iPropuesta);
        await iServiciosPropuesta.guardarDatosObjetivos(iPropuesta);
        await iServiciosPropuesta.guardarDatosPalabrasClave(iPropuesta);
        await iServiciosPropuesta.guardarDatos(iPropuesta);



       res.status(200).json({
        ok : true,
        data : {
            ...iServiciosPropuesta.verDatos(iPropuesta),
            integrantes: iServiciosPropuesta.verIntegrantes(iPropuesta),
            instituciones : iServiciosPropuesta.verInstituciones(iPropuesta),
            objetivosEspecificos : iServiciosPropuesta.verObjetivosEspecificos(iPropuesta),
            palabrasClave : iServiciosPropuesta.verPalabrasClave(iPropuesta),
            propuestaObjetivos : iServiciosPropuesta.verObjetivosEspecificos(iPropuesta),
            propuestaLineasTematicas : iServiciosPropuesta.verLineasTematicas(iPropuesta),
            propuestaCapacitaciones : iServiciosPropuesta.verCapacitaciones(iPropuesta),
            propuestaProgramasExtension : iServiciosPropuesta.verProgramasSippe(iPropuesta)
        },
        error : null
       })


    } catch (error : any) {
        logger.log('error',error.status,' - ',error.message);
        if(error instanceof ValidationError){
            console.log(error.stack)
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

