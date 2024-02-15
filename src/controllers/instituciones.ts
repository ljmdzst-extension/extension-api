import { request, response } from "express";
import logger from "../config/logsConfig";
import sequelizeExtension from "../config/dbConfig";
import { Propuesta } from "../models/Propuesta";
import { Institucion } from "../models/Institucion";
import { PropuestaInstitucion } from "../models/PropuestaInstitucion";
import { TPutPropuesta } from "../types/propuesta";


export const verInstituciones = async (req : typeof request , res : typeof response)=>{
    
    const transaction = await sequelizeExtension.transaction();

    try {

       

    } catch (error : any) {
        await transaction.rollback();

        logger.log('error',error.status,' - ',error.message);

        res.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.status === 500 ? 'Error de servidor' : error.message
        })
    }

}


export const editarInstituciones = async (req : typeof request , res : typeof response)=>{
    
    const transaction = await sequelizeExtension.transaction({logging : (sql)=>console.log(sql)})
    try {
        
        


    } catch (error : any) {
        logger.log('error',error.status,' - ',error.message);
        console.log(error)
        res.status(500).json({
            ok : false,
            data : null,
            error : 'Error de servidor'
        })
    }
}

export const bajaInstitucion = async (req : typeof request , res : typeof response)=>{
    
    try {
        
     


    } catch (error : any) {
        logger.log('error',error.status,' - ',error.message);
        console.log(error)
        res.status(500).json({
            ok : false,
            data : null,
            error : 'Error de servidor'
        })
    }
}