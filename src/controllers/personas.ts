import { request, response } from "express";
import sequelizeExtension from "../config/dbConfig";
import logger from "../config/logsConfig";
import { initModels } from "../models/init-models";


export const buscar = async(req : typeof request , res : typeof response)=>{
    
   
    try {

        const {Persona} = initModels(sequelizeExtension);

        const {nroDoc} = req.params;

        res.status(200).json({
            ok : true,
            data :  await Persona.findByPk(nroDoc),
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