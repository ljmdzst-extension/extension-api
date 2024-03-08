import { NextFunction,  request, response } from "express";
import { Propuesta } from "../models/Propuesta";
import sequelizeExtension from "../config/dbConfig";

export const validarCodigoPropuesta =  async( req : typeof request , res : typeof response , next : NextFunction) => {

    /* validar body, probar con los modelos de sequelize */

    const {codigoPropuesta} = req.params;
    
    if( await Propuesta.initModel(sequelizeExtension).findByPk(codigoPropuesta,{attributes : ['codigoPropuesta']})){
        next();
    }else{
        res.status(400).json({
            ok : false,
            data : null,
            error : `Propuesta ${codigoPropuesta} inexistente`
        })
    
    }

   
}

