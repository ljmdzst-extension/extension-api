
import { initModels } from "../models/init-models";
import { request, response } from "express";
import logger from '../config/logsConfig';
import ServiciosPropuesta from '../services/propuesta';
import sequelizeExtension from "../config/dbConfig";
import { PROPUESTA_VACIA, TPropuesta } from "../types/propuesta";
import ServiciosIntegrantes from "../services/integrante";

export const verPropuesta = async(req : typeof request , res : typeof response)=>{
    
    
    try {
        const {codigoPropuesta} = req.params;
        let salida : TPropuesta = PROPUESTA_VACIA;

        const {Propuesta} = initModels(sequelizeExtension);
        
        const iServiciosPropuesta = new ServiciosPropuesta(Propuesta, new ServiciosIntegrantes());

        const iPropuesta = await iServiciosPropuesta.verPropuesta(codigoPropuesta);
        
        if(!iPropuesta) throw { status : 400 , message : 'propuesta no encontrada'}

        salida = {...salida , ...iPropuesta.dataValues}
    
        salida = { ...salida , ...await iServiciosPropuesta.verDatosGrales(iPropuesta)}
        
        salida = { ...salida , ...await iServiciosPropuesta.verInstituciones(iPropuesta)}
        
        salida = { ...salida , equipoExtension : await iServiciosPropuesta.verEquipoExtension(iPropuesta)}
    
        salida = { ...salida , planificacion : await iServiciosPropuesta.verPlanificacion(iPropuesta)}

        res.status(200).json({
            ok : true,
            data : salida,
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

export const crearPropuesta = async(req : typeof request , res : typeof response)=>{
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
export const editarPropuesta = async(req : typeof request , res : typeof response)=>{
    const transaction = await sequelizeExtension.transaction({logging : msg => console.log(msg)});
    try {
        /**... */

      


    } catch (error : any) {
        await transaction.rollback();
        logger.log('error',error.status,' - ',error.message);
        res.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.message
        })
    }
}
export const bajaPropuesta = async(req : typeof request , res : typeof response)=>{
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

