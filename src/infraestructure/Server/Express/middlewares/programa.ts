
import { INVALIDO } from "../logs/validaciones";
import {  NextFunction, Request, Response } from "express";
import IMiddleware from "./middleware";
import { HttpHelpers } from "../helpers/general";



export class MiddlewareValidarAnio implements IMiddleware {
    constructor(){}
    
    public usar() {
        return async(req : Request, resp : Response , next : NextFunction)=>{
            if( Number(req.params.idAnio) <= new Date().getFullYear() ){
                next();
            } else {
                HttpHelpers.responderPeticionError(resp,INVALIDO.ANIO_PROG.message,INVALIDO.ANIO_PROG.status);
            }
         }
    }
} 



