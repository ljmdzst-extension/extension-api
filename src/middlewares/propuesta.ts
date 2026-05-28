import { NextFunction,  request, response } from "express";
import { BD } from "../config/dbConfig";
import { HttpHelpers } from "../helpers/general";

export const validarCodigoPropuesta =  async( req : typeof request , res : typeof response , next : NextFunction) => {

 

    const {codigoPropuesta} = req.params;
    
    if( await BD.Propuesta.findByPk(codigoPropuesta,{attributes : ['codigoPropuesta']})){
       
        next();
    
    } else {
        HttpHelpers.responderPeticionError( res, `Propuesta ${codigoPropuesta} inexistente`,400);
    }

   
}

