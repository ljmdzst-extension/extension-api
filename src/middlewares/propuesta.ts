import { NextFunction, Request, Response } from "express";
import { Propuesta } from "../models/Propuesta";
import sequelizeExtension from "../config/dbConfig";

export const validarCodigoPropuesta =  async( req : Request , res : Response , next : NextFunction) => {

    /* validar body, probar con los modelos de sequelize */

    const {codigoPropuesta} = req.params;
    
    if( ! await Propuesta.initModel(sequelizeExtension).findByPk(codigoPropuesta,{attributes : ['codigoPropuesta']})){
        res.status(400).json({
            ok : false,
            data : null,
            error : `Propuesta ${codigoPropuesta} inexistente`
        })
    }
    next();
    

}

