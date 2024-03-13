
import { initModels } from "../models/init-models";
import { request, response } from "express";
import sequelizeExtension from "../config/dbConfig";
import ServiciosProyecto from "../services/proyecto";

export const getProyecto = async(req : typeof request , res : typeof response)=>{
    
    try {
        const {codigoPropuesta} = req.params;


        const {Propuesta} = initModels(sequelizeExtension);

        const iProyecto = await Propuesta.findByPk(codigoPropuesta);
        
        if(!iProyecto) throw { status : 400 , message : 'proyecto no encontrada'}
        
        const iServiciosProyecto = new ServiciosProyecto();
        
        await iServiciosProyecto.leerDatos(iProyecto);
        
        // salida = { ...salida , ...await iServiciosPropuesta.verDatosGrales(iProyecto)}
        
        // salida = { ...salida , ...await iServiciosPropuesta.verInstituciones(iProyecto)}
        
        // salida = { ...salida , equipoExtension : await iServiciosPropuesta.verEquipoExtension(iProyecto)}
    
        // salida = { ...salida , planificacion : await iServiciosPropuesta.verPlanificacion(iProyecto)}

        res.status(200).json({
            ok : true,
            data :  iServiciosProyecto.verDatos(iProyecto),
            error : null
        })
        

    } catch (error : any) {
       console.log('error',error.status,' - ',error.message);
        res.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.message
        })
    }
}

export const postProyecto = async(req : typeof request , res : typeof response)=>{
    const transaction = await sequelizeExtension.transaction();
    try {
      

    } catch (error : any) {
        await transaction.rollback();
       console.log('error',error.status,' - ',error.message);
        res.status(500).json({
            ok : false,
            data : null,
            error : 'Error de servidor'
        })
    }
}
export const putProyecto = async(req : typeof request , res : typeof response)=>{
    const transaction = await sequelizeExtension.transaction({logging : msg => console.log(msg)});
    try {
        /**... */

      


    } catch (error : any) {
        await transaction.rollback();
       console.log('error',error.status,' - ',error.message);
        res.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.message
        })
    }
}
export const deleteProyecto = async(req : typeof request , res : typeof response)=>{
    try {
        /**... */
        

    } catch (error : any) {
       console.log('error',error.status,' - ',error.message);
        res.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.message
        })
    }
}

