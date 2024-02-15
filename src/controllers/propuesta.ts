
import { initModels } from "../models/init-models";
import { request, response } from "express";
import logger from '../config/logsConfig';
import * as ServiciosPropuesta from '../services/propuesta';
import sequelizeExtension from "../config/dbConfig";

export const verPropuesta = async(req : typeof request , res : typeof response)=>{
    
    
    try {
        const {codigoPropuesta} = req.params;
        const propuesta = await ServiciosPropuesta.verPropuesta(codigoPropuesta,sequelizeExtension);
        res.status(200).json({
            ok : true,
            data : propuesta,
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

