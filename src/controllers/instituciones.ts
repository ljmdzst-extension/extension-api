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


export const editarInstituciones = async (req : typeof request , res : typeof response)=>{
    
    const transaction = await sequelizeExtension.transaction({logging : (sql)=>console.log(sql)})
    try {
        
        const {lInstituciones,codigoPropuesta} : TPutPropuesta  = req.body;

        const iPropuesta = await Propuesta.initModel(sequelizeExtension).findByPk(codigoPropuesta,{transaction});
        if(!iPropuesta) throw { status : 500 , message : 'Propuesta no encontrada'}

        if(lInstituciones.length) {
            const guardarInstituciones = Institucion.initModel(sequelizeExtension).bulkCreate(
                lInstituciones,
                {
                    updateOnDuplicate : ['dom','email','tel','ubicacion'],
                    transaction
                }
            );

            const editarInsttiucionesAsociadas  = iPropuesta.editarInstituciones(lInstituciones,sequelizeExtension,transaction);

           await guardarInstituciones;
           await editarInsttiucionesAsociadas;

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