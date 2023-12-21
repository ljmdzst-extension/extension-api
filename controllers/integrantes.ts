import { request, response } from "express";
import logger from "../config/logsConfig";
import sequelizeExtension from "../config/dbConfig";
import { Propuesta } from "../models/Propuesta";


export const verIntegrates = async (req : typeof request , res : typeof response)=>{
    
    const transaction = await sequelizeExtension.transaction();

    try {

        const {codigoPropuesta} = req.params;

        const iPropuesta = await Propuesta.initModel(sequelizeExtension).findByPk(codigoPropuesta);

        if(!iPropuesta) throw {status : 500, message : 'Código de propuesta inexistente'}

        res.status(200).json({
            ok : true,
            data : await iPropuesta.verIntegrantes(sequelizeExtension,transaction),
            error : null
        })

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