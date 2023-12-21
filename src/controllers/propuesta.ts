import { request, response } from "express";
import { Propuesta } from "../models/Propuesta";
import sequelizePropuestas from "../config/dbConfig";
import logger from '../config/logsConfig';
import { TPropuesta, TPutPropuesta } from "../types/propuesta";

export const verPropuesta = async(req : typeof request , res : typeof response)=>{
    
    const transaction = await sequelizePropuestas.transaction({logging : msg => console.log(msg)});
    
    try {

        /**... */

        let salida : TPropuesta = {
            codigoPropuesta : '',
            idUsuario : '',
            titulo : '',
            modalidad : '',
            lInstituciones : [],
            lIntegrantes : [],
            planificacion : {lObjetivosEspecificos : []},
            lPropuestasPrevias : [],
            lPropuestasRelacionadas : [],
            lGeolocalizaciones : [],
            lProgramasExtension : [],
            lCapacitaciones : [],
            lLineasTematicas : [],
            lPalabrasClave : []
        }
        
        const { codigoPropuesta } = req.params;

        const iPropuesta = await Propuesta.initModel(sequelizePropuestas).findByPk(codigoPropuesta,{transaction});
        
        if( ! iPropuesta ) throw {status : 400 , message : 'Proyecto no encontrado.'}

        salida = {...salida , ...iPropuesta.dataValues}

        const lPropuestasPrevias =  iPropuesta.verPropuestasPrevias(sequelizePropuestas,transaction);
        const lPropuestasRelacionadas =  iPropuesta.verPropuestasRelacionadas(sequelizePropuestas,transaction);
        const lGeolocalizaciones =  iPropuesta.verGeolocalizaciones(sequelizePropuestas,transaction);
        const lProgramasExtension =  iPropuesta.verProgramasExtension(sequelizePropuestas,transaction);
        const lCapacitaciones =  iPropuesta.verCapacitaciones(sequelizePropuestas,transaction);
        const lLineasTematicas =  iPropuesta.verLineasTematicas(sequelizePropuestas,transaction);
        const lPalabrasClave =  iPropuesta.verPalabrasClave(sequelizePropuestas,transaction);

        salida = {
            ...salida,
            lPropuestasPrevias : await lPropuestasPrevias,
            lPropuestasRelacionadas : await lPropuestasRelacionadas,
            lProgramasExtension : (await lProgramasExtension).map( item => item.idProgramaExtension),
            lCapacitaciones : (await lCapacitaciones).map(item => item.idCapacitacion),
            lLineasTematicas : (await lLineasTematicas).map(item => item.idLineaTematica),
            lGeolocalizaciones : await lGeolocalizaciones,
            lPalabrasClave : await lPalabrasClave
        }
        
        transaction.afterCommit(()=>{
            res.status(200).json({
                ok : true,
                data : salida,
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
export const crearPropuesta = async(req : typeof request , res : typeof response)=>{
    try {
        /**... */
        const data = req.body;



    } catch (error) {
        throw error;
    }
}
export const editarPropuesta = async(req : typeof request , res : typeof response)=>{
    const transaction = await sequelizePropuestas.transaction({logging : msg => console.log(msg)});
    try {
        /**... */

        const {codigoPropuesta } = req.params;
        const {
            idUsuario,
            lCapacitaciones,
            lGeolocalizaciones,
            lInstituciones,
            lIntegrantes,
            lLineasTematicas,
            lPalabrasClave,
            lProgramasExtension,
            lPropuestasPrevias,
            lPropuestasRelacionadas,
            planificacion,
            ...datosActualizar
        } : TPutPropuesta = req.body;

        const iPropuesta = await Propuesta.initModel(sequelizePropuestas).findByPk(codigoPropuesta,{transaction});

        if(!iPropuesta) throw { status : 500 , message : 'Propuesta no encontrada'}

        await iPropuesta.update(datosActualizar,{transaction});

        // if(!await iPropuesta.editarPalabrasClave(lPalabrasClave,sequelizePropuestas,transaction))
        //     throw { status : 500 , message : 'Error al editar palabras clave'}

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
export const bajaPropuesta = async(req : typeof request , res : typeof response)=>{
    try {
        /**... */

    } catch (error) {
        throw error;
    }
}

