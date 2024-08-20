import { BD } from "../../../db/Mysql-Sequelize/config/dbConfig";
import { INVALIDO } from "../logs/validaciones";
import { request, response, NextFunction } from "express";

export const validarIdArea =  async(req : typeof request, resp : typeof response , next : NextFunction)=>{
    
    const data = req.params;
  
    if( await BD.Area.findByPk(data.idArea) ){
       next();
    } else {
        resp.status(INVALIDO.ID_AREA_ACT.status).json({
            ok : false,
            data : null,
            error : INVALIDO.ID_AREA_ACT.message
        })
    }
}

