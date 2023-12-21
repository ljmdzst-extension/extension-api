import { request, response } from "express";
import { Propuesta } from "../models/Propuesta";
import sequelizePropuestas from "../config/dbConfig";
import { Usuario } from "../models/Usuario";
import logger from "../config/logsConfig";


export const verPropuestas = async(req : typeof request , res : typeof response)=>{

    const transaction = await sequelizePropuestas.transaction();
    try {
        /**... */
        
        const { idUsuario } = req.params;

        const lPropuestasUsuario =  Propuesta.initModel(sequelizePropuestas).findAll({
            attributes : ['codigoPropuesta','modalidad','titulo','createdAt'],
            where : { idUsuario },
            transaction
        });

        const iUsuario = await Usuario.initModel(sequelizePropuestas).findByPk( idUsuario, {transaction})

        if(!iUsuario) throw {status : 500 , message : 'Usuario no encontrado.'}

        const dataUsuario = await iUsuario.verDatos(sequelizePropuestas,transaction)

        if(!dataUsuario)  throw {status : 500 , message : 'Usuario no encontrado.'}

        const data = (await lPropuestasUsuario).map(
            propuesta => ({
                ...propuesta.dataValues,
                director : `${dataUsuario.ape}, ${dataUsuario.nom}`
            })
        )
       
        transaction.afterCommit(()=>{
            res.status(200).json({
                ok : true,
                data : data,
                error : null
            })
        })
        await transaction.commit();

       

    } catch (error : any) {
        await transaction.rollback();
        logger.log('error',error.status,' - ',error.message);
        res.status(500).json({
            ok :false,
            data : null,
            error : 'Error de servidor'
        })
    }
}