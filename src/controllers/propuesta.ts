
import { InstitucionCreationAttributes, IntegranteCreationAttributes, PersonaCreationAttributes, PropuestaCreationAttributes, ResponsableCreationAttributes, RolIntegranteCreationAttributes, initModels } from "../models/init-models";
import { request, response } from "express";
import logger from '../config/logsConfig';
import ServiciosPropuesta from '../services/propuesta';
import sequelizeExtension from "../config/dbConfig";
import ServiciosInstitucion from "../services/institucion";
import ServiciosIntegrantes from "../services/integrante";

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
       const {integrantes,instituciones,...restData} : 
        PropuestaCreationAttributes & { 
            integrantes : (IntegranteCreationAttributes & {persona : PersonaCreationAttributes , roles : RolIntegranteCreationAttributes})[],
            instituciones : (InstitucionCreationAttributes & {responsable : ResponsableCreationAttributes  & { persona : PersonaCreationAttributes}})[]
        }  = req.body;


       const {Propuesta} = initModels(sequelizeExtension);

       const iPropuesta = await Propuesta.findByPk(codigoPropuesta);
       
       if(!iPropuesta) throw { status : 400 , message : 'propuesta no encontrada'}
       
       const iServiciosPropuesta = new ServiciosPropuesta();
       const SInstitucion = new ServiciosInstitucion();
       const SIntegrante = new ServiciosIntegrantes();

       iServiciosPropuesta.editarDatos(iPropuesta,restData);

      
       if(integrantes.length){
            const lIntegrantes = integrantes.map( (integ : any) =>SIntegrante.crearIntegrante(integ) );
          
           iServiciosPropuesta.cargarIntegrantes(iPropuesta,lIntegrantes);
       
        }
        if(instituciones.length) {
            const lInstituciones = instituciones.map( (inst : any) =>SInstitucion.crearInstitucion(inst) );
            iServiciosPropuesta.cargarInstituciones(iPropuesta,lInstituciones);
        }
       


       await iServiciosPropuesta.guardarDatos(iPropuesta);



       res.status(200).json({
        ok : true,
        data : iServiciosPropuesta.verDatos(iPropuesta),
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

