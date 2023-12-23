import { request, response } from "express";
import logger from "../config/logsConfig";
import sequelizeExtension from "../config/dbConfig";
import { Propuesta } from "../models/Propuesta";
import { Integrante, IntegranteCreationAttributes } from "../models/Integrante";


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

export const crearIntegrante = async (req : typeof request , res : typeof response)=>{
    
    
    try {
        
        const data : IntegranteCreationAttributes = req.body;

        const integrante = await Integrante.initModel(sequelizeExtension).create(data);

        res.status(200).json({
            ok : true,
            data : integrante,
            error : null
        })
        
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

export const editarIntegrante = async (req : typeof request , res : typeof response)=>{
    
    const transaction = await sequelizeExtension.transaction({logging : (sql)=>console.log(sql)})
    try {
        
        const data : IntegranteCreationAttributes = req.body;


        const integrante = await Integrante.initModel(sequelizeExtension).findOne({
            where : {
                codigoPropuesta : data.codigoPropuesta,
                nroDoc : data.nroDoc
            }
        });

        if(!integrante) throw { status: 500 , message : 'Integrante inexistente'}

        const integranteActualizado = await integrante.update(data,{transaction});

        transaction.afterCommit(()=>{
            res.status(200).json({
                ok : true,
                data : integranteActualizado.dataValues,
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