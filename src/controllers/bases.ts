import { request, response } from "express";
import { Relacion } from "../models/Relacion";
import sequelizeExtension from "../config/dbConfig";


export const verBases = async(req : typeof request , res : typeof response)=>{
    try {
        
        res.status(200).json({
            ok : true,
            data : {
                lAreas : await Relacion.initModel(sequelizeExtension).findAll()
            }
        })

    } catch (error : any) {
        res.status(500).json({
            ok : false,
            error
        })   
    }
}