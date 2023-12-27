import { request, response } from "express";
import logger from "../config/logsConfig";
import sequelizeExtension from "../config/dbConfig";
import { Propuesta } from "../models/Propuesta";
import { Integrante, IntegranteCreationAttributes } from "../models/Integrante";
import { Persona, PersonaCreationAttributes } from "../models/Persona";
import { TPutPropuesta } from "../types/propuesta";


export const verIntegrates = async (req : typeof request , res : typeof response)=>{
    
    const transaction = await sequelizeExtension.transaction();

    try {

        const {codigoPropuesta} = req.params;

        const iPropuesta = await Propuesta.initModel(sequelizeExtension).findByPk(codigoPropuesta);

        if(!iPropuesta) throw {status : 500, message : 'Código de propuesta inexistente'}

        const lIntegrantes = await iPropuesta.verIntegrantes(sequelizeExtension,transaction);

        res.status(200).json({
            ok : true,
            data : lIntegrantes,
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

export const editarIntegrantes = async (req : typeof request , res : typeof response)=>{
    
    const transaction = await sequelizeExtension.transaction({logging : (sql)=>console.log(sql)})
    try {

        const {lIntegrantes, codigoPropuesta} : TPutPropuesta = req.body;

        const iPropuesta = await Propuesta.initModel(sequelizeExtension).findByPk(codigoPropuesta,{transaction});

        if(!iPropuesta) throw { status : 500 , message : 'Propuesta no encontrada'}

        if(lIntegrantes.length) {
            const guardarPersonas = Persona.initModel(sequelizeExtension).bulkCreate(
                lIntegrantes,
                {
                    updateOnDuplicate : ['ape','nom','dom','tel','email'],
                    transaction
                }
            );

            const editarIntegrantes  = iPropuesta.editarIntegrantes(lIntegrantes,sequelizeExtension,transaction);

          await guardarPersonas;
          await editarIntegrantes;
        }

        transaction.afterCommit(()=>{
            res.status(200).json({
                ok : true,
                data : null,
                error : null
            });
        })

        await transaction.commit();



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

export const bajaIntegrante = async (req : typeof request , res : typeof response)=>{
    
    try {
        
        const {nroDoc, codigoPropuesta} = req.params;


        const cant = await Integrante.initModel(sequelizeExtension).destroy({
            where : {
                codigoPropuesta : codigoPropuesta,
                nroDoc : nroDoc
            }
        });

        res.status(200).json({
            ok : cant > 0,
            data : null,
            error : null
        });


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