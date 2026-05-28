import { request, response } from "express";
import { BD } from "../config/dbConfig";


export const buscar = async(req : typeof request , res : typeof response)=>{
    
   
    try {

        const {nroDoc} = req.params;

        res.status(200).json({
            ok : true,
            data :  await BD.Persona.findByPk(nroDoc),
            error : null
        });

    } catch (error : any) {
        console.log('error',error.status,' - ',error.message);
        res.status(500).json({
            ok : true,
            data : null,
            error : 'Error interno de servidor'
        })
    }
}