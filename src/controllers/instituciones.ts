import { request, response } from "express";
import logger from "../config/logsConfig";
import sequelizeExtension from "../config/dbConfig";
import { Propuesta } from "../models/Propuesta";
import { Institucion, InstitucionCreationAttributes } from "../models/Institucion";
import { Persona, PersonaCreationAttributes } from "../models/Persona";
import { PropuestaInstitucion, PropuestaInstitucionCreationAttributes } from "../models/PropuestaInstitucion";


export const verInstituciones = async (req : typeof request , res : typeof response)=>{
    
    const transaction = await sequelizeExtension.transaction();

    try {

        const {codigoPropuesta} = req.params;

        const iPropuesta = await Propuesta.initModel(sequelizeExtension).findByPk(codigoPropuesta);

        if(!iPropuesta) throw {status : 500, message : 'Código de propuesta inexistente'}

        res.status(200).json({
            ok : true,
            data : await iPropuesta.verInstituciones(sequelizeExtension,transaction),
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

export const crearInstitucion = async (req : typeof request , res : typeof response)=>{
    
    const transaction = await sequelizeExtension.transaction();
    
    try {
        
        const data : InstitucionCreationAttributes & PropuestaInstitucionCreationAttributes = req.body;

        await Institucion.initModel(sequelizeExtension).findOrCreate({
            defaults : data,
            where: {idInstitucion : data.idInstitucion},
            transaction
        })

        const [institucion,creado] = await PropuestaInstitucion.initModel(sequelizeExtension).findOrCreate({
            defaults : data,
            where : {codigoPropuesta : data.codigoPropuesta, idInstitucion : data.idInstitucion},
            transaction
        });

        if(creado) {
            await institucion.update(data,{transaction});
        }

        res.status(200).json({
            ok : true,
            data : Institucion,
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

export const editarInstitucion = async (req : typeof request , res : typeof response)=>{
    
    const transaction = await sequelizeExtension.transaction({logging : (sql)=>console.log(sql)})
    try {
        
        const data : InstitucionCreationAttributes & PropuestaInstitucionCreationAttributes = req.body;

        await Institucion.initModel(sequelizeExtension).update(data,{where : {idInstitucion : data.idInstitucion}, transaction});

        const institucion = await PropuestaInstitucion.initModel(sequelizeExtension).findOne({
            where : {
                codigoPropuesta : data.codigoPropuesta,
                idInstitucion : data.idInstitucion
            }
        });

        if(!institucion) throw { status: 500 , message : 'Institucion inexistente'}


        const institucionActualizado = await institucion.update(data,{transaction});

        transaction.afterCommit(()=>{
            res.status(200).json({
                ok : true,
                data : institucionActualizado.dataValues,
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

export const bajaInstitucion = async (req : typeof request , res : typeof response)=>{
    
    try {
        
        const {idInstitucion, codigoPropuesta} = req.params;


        const cant = await PropuestaInstitucion.initModel(sequelizeExtension).destroy({
            where : {
                codigoPropuesta : codigoPropuesta,
                idInstitucion : idInstitucion
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