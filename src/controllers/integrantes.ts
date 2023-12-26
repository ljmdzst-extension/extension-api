import { request, response } from "express";
import logger from "../config/logsConfig";
import sequelizeExtension from "../config/dbConfig";
import { Propuesta } from "../models/Propuesta";
import { Integrante, IntegranteCreationAttributes } from "../models/Integrante";
import { Persona, PersonaCreationAttributes } from "../models/Persona";


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
    
    const transaction = await sequelizeExtension.transaction();
    
    try {
        
        const data : IntegranteCreationAttributes & PersonaCreationAttributes = req.body;

        await Persona.initModel(sequelizeExtension).findOrCreate({
            defaults : data,
            where: {nroDoc : data.nroDoc, tipoDoc : data.tipoDoc},
            transaction
        })

        const [integrante,creado] = await Integrante.initModel(sequelizeExtension).findOrCreate({
            defaults : data,
            where : {codigoPropuesta : data.codigoPropuesta, nroDoc : data.nroDoc},
            transaction
        });

        if(!creado) {
            await Integrante.initModel(sequelizeExtension).update(data,{ where : {nroDoc : data.nroDoc, codigoPropuesta : data.codigoPropuesta}, transaction});
        }

        transaction.afterCommit(()=>{
            res.status(200).json({
                ok : true,
                data : integrante,
                error : null
            })
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

export const editarIntegrante = async (req : typeof request , res : typeof response)=>{
    
    const transaction = await sequelizeExtension.transaction({logging : (sql)=>console.log(sql)})
    try {
        
        const data : IntegranteCreationAttributes & PersonaCreationAttributes = req.body;

        await Persona.initModel(sequelizeExtension).update(data,{where : {nroDoc : data.nroDoc}, transaction});

        const integrante = await Integrante.initModel(sequelizeExtension).findOne({
            where : {
                codigoPropuesta : data.codigoPropuesta,
                nroDoc : data.nroDoc
            },
            transaction
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