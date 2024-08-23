import { INVALIDO } from "../logs/validaciones";
import { ERROR } from "../logs/errores";
import { NextFunction, Request, Response } from "express";
import {checkSchema,body, validationResult} from 'express-validator'
import { domain } from "../../../../domain";
import { aplication } from "../../../../aplication";
import { HttpHelpers } from "../helpers/general";
import IMiddleware from "./middleware";


export class MiddlewareValidarCamposActividad implements IMiddleware {
    constructor(private VActividad : aplication.IVActividad ){ }

    public usar() {
        return async(req : Request, resp : Response , next : NextFunction)=>{
            const data = req.body;
        
            console.log('validando campos actividad ..');
    
            if(this.VActividad.validar(data)){
                next();
            } else {
                HttpHelpers.responderPeticionError(resp,'Revise los campos de la actividad',400);
            }
        }
    }
}



export class MiddlewareValidarActividadExistente implements IMiddleware {
    constructor(
        private MActividad : domain.IModelActividad, private VActividad : aplication.IVActividad
    ){ } 

    public usar() {
        return async(req : Request, resp : Response , next : NextFunction)=>{
            const data = req.body;
        
            if(await this.MActividad.buscarPorId(Number(data.idActivdad))){
                next();
            } else {

                HttpHelpers.responderPeticionError(resp, ERROR.ACTIVIDAD_INEXISTENTE.message,ERROR.ACTIVIDAD_INEXISTENTE.status);
              
            }
        }
    }
}

export class MiddlewareValidarActividadSuspendida  implements IMiddleware {
    constructor(
        private MActividad : domain.IModelActividad, private VActividad : aplication.IVActividad
    ){ } 
    public usar(): (req: Request, res: Response, next: NextFunction) => Promise<any> {
        return async(req : Request, resp : Response , next : NextFunction)=>{
    
            const {idActividad} = req.body;
    
            if(!this.VActividad.validarIdActividad(Number(idActividad))) {
                HttpHelpers.responderPeticionError(resp,'idActividad inválido',400);
            }
            else if(! await this.MActividad.buscarPorId(Number(idActividad)) ){
                HttpHelpers.responderPeticionError(resp,ERROR.ACTIVIDAD_INEXISTENTE.message,ERROR.ACTIVIDAD_INEXISTENTE.status)
            }
            else {
                next();
            }
        
        }
    }
}

export class MiddlewareValidarMotivoSuspension implements IMiddleware {
    constructor(
        private VActividad : aplication.IVActividad
    ){}

    public usar(): (req: Request, res: Response, next: NextFunction) => Promise<any> {
        return  async(req : Request, resp : Response , next : NextFunction)=>{
        
            const data = req.body;
        
            if( this.VActividad.validarMotivoCancel(data.motivoCancel)  ) {
                next();
        
            } else {
                HttpHelpers.responderPeticionError(resp,INVALIDO.MOT_CANCEL_ACT.message,INVALIDO.MOT_CANCEL_ACT.status)
            }
        
        }
    }
}


