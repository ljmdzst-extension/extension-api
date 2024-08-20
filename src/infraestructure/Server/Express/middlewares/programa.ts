
import { INVALIDO } from "../logs/validaciones";
import { AreaPrograma } from "../../../models/AreaPrograma";
import { response, NextFunction } from "express";



export const validarAnio =  async(req : any, resp : typeof response , next : NextFunction)=>{
   const data = req.params;
   
   
   
   if( Number(data.idAnio) > 2021 && await AreaPrograma.findOne({where : {anio : data.idAnio}})  ){
       next();
   } else {
     resp.status(INVALIDO.ANIO_PROG.status).json({ 
        ok : false, 
        error : INVALIDO.ANIO_PROG.message, 
        data : null
    });
   }
}
