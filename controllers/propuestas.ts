import { request, response } from "express";
import { Propuesta } from "../models/Propuesta";
import sequelizePropuestas from "../config/dbConfig";


export const verPropuestas = async(req : typeof request , res : typeof response)=>{
    try {
        /**... */
        
        const { idUsuario } = req.params;
        
        res.status(200).json({
            ok : true,
            data : await Propuesta.initModel(sequelizePropuestas).findAll({where : { idUsuario }}),
            error : null
        })

    } catch (error : any) {
        res.status(error.status).json({
            ok :false,
            data : null,
            error : error.message
        })
    }
}