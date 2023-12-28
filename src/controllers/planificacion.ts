import { request, response } from "express";
import sequelizeExtension from "../config/dbConfig";
import logger from "../config/logsConfig";
import { TPutPropuesta } from "../types/propuesta";
import { Propuesta } from "../models/Propuesta";


export const editarPlanificacion = async( req : typeof request, res : typeof response )=>{

    const transaction = await sequelizeExtension.transaction({logging : sql =>  console.log(sql) });

    try {

        const { 
            planificacionFinalidad, 
            planificacionObjetivoGeneral, 
            lObjetivosEspecificos , 
            codigoPropuesta
        } : TPutPropuesta = req.body;

        const iPropuesta = await Propuesta.initModel(sequelizeExtension).findByPk(codigoPropuesta,{transaction});

        if(!iPropuesta) throw { status : 500 , message : 'Propuesta inexistente'}

        await iPropuesta.editarPlanificacion(
            {
                finalidad : planificacionFinalidad || '',
                objetivoGeneral : planificacionObjetivoGeneral || '',
                lObjetivosEspecificos : lObjetivosEspecificos
            },
            sequelizeExtension,
            transaction
        );


        transaction.afterCommit(()=>{
            res.status(200).json({
                ok : true,
                data : null,
                error : null
            })
        })
        await transaction.commit();
        
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