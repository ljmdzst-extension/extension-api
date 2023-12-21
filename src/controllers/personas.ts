import { request, response } from "express";
import { Persona } from "../models/Persona";
import sequelizeExtension from "../config/dbConfig";
import logger from "../config/logsConfig";


export const buscar = async(req : typeof request , res : typeof response)=>{
    
   
    try {

        const {nroDoc} = req.params;
       
        const iPersona = await Persona.initModel(sequelizeExtension).findByPk(nroDoc);

        res.status(200).json({
            ok : true,
            data : iPersona,
            error : null
        });

    } catch (error : any) {
        logger.log('error',error.status,' - ',error.message);
        res.status(500).json({
            ok : true,
            data : null,
            error : 'Error interno de servidor'
        })
    }
}