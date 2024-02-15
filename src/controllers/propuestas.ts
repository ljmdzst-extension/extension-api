import { request, response } from "express";
import * as ServiciosPropuestas from '../services/propuestas'
import sequelizeExtension from "../config/dbConfig";


export const verPropuestas = async(req : typeof request , res : typeof response)=>{
    try {
        /**... */
        const { idUsuario } = req.params;

        const propuestas = await ServiciosPropuestas.verPropuestas( sequelizeExtension, idUsuario )
        res.status(200).json({
            ok : true,
            data : propuestas,
            error : null
        })
    } catch (error : any) {

        console.log('error',error.status,' - ',error.message);
        
        res.status(500).json({
            ok :false,
            data : null,
            error : 'Error de servidor'
        })
    }
}