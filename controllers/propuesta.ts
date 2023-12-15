import { request, response } from "express";
import { Propuesta } from "../models/Propuesta";
import sequelizePropuestas from "../config/dbConfig";
import logger from '../config/logsConfig';
import { TPropuesta } from "../types/propuesta";

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
            lPalabrasClave : [],
            createdAt : new Date(),
            updatedAt : new Date()
        }
        
        const { codigoPropuesta } = req.params;

        const iPropuesta = await Propuesta.initModel(sequelizePropuestas).findByPk(codigoPropuesta,{transaction});
        
        if( ! iPropuesta ) throw {status : 400 , message : 'Proyecto no encontrado.'}

        salida = {...salida , ...iPropuesta.dataValues}

        salida.lInstituciones = await iPropuesta.verInstituciones(sequelizePropuestas,transaction);

        salida.lIntegrantes = await iPropuesta.verIntegrantes(sequelizePropuestas,transaction);
        
        salida.planificacion = await iPropuesta.verPlanificacion(sequelizePropuestas,transaction);
        salida.lPropuestasPrevias = await iPropuesta.verPropuestasPrevias(sequelizePropuestas,transaction);
        salida.lPropuestasRelacionadas = await iPropuesta.verPropuestasRelacionadas(sequelizePropuestas,transaction);
        salida.lGeolocalizaciones = await iPropuesta.verGeolocalizaciones(sequelizePropuestas,transaction);
        salida.lProgramasExtension = await iPropuesta.verProgramasExtension(sequelizePropuestas,transaction);
        salida.lCapacitaciones = await iPropuesta.verCapacitaciones(sequelizePropuestas,transaction);
        salida.lLineasTematicas = await iPropuesta.verLineasTematicas(sequelizePropuestas,transaction);
        salida.lPalabrasClave = await iPropuesta.verPalabrasClave(sequelizePropuestas,transaction);

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
    try {
        /**... */

    } catch (error) {
        throw error;
    }
}
export const bajaPropuesta = async(req : typeof request , res : typeof response)=>{
    try {
        /**... */

    } catch (error) {
        throw error;
    }
}

