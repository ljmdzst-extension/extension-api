import { NextFunction,  request, response } from "express";
import { Propuesta } from "../../../models/Propuesta";
import sequelizeExtension from "../../../db/Mysql-Sequelize/config/dbConfig";
import { HttpHelpers } from "../helpers/general";

export const validarCodigoPropuesta =  async( req : typeof request , res : typeof response , next : NextFunction) => {

 

    const {codigoPropuesta} = req.params;
    
    if( await Propuesta.initModel(sequelizeExtension).findByPk(codigoPropuesta,{attributes : ['codigoPropuesta']})){
       
        next();
    
    } else {
        HttpHelpers.responderPeticionError( res, `Propuesta ${codigoPropuesta} inexistente`,400);
    }

   
}

