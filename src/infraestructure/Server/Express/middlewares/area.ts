
import { INVALIDO } from "../logs/validaciones";
import { request, response, NextFunction, Request, Response } from "express";
import IMiddleware from "./middleware";
import { domain } from "../../../../domain";
import { HttpHelpers } from "../helpers/general";

export class MiddlewareValidarIdArea implements IMiddleware {
    constructor( private MArea : domain.IModelArea ){}

    usar(): (req: Request, res: Response, next: NextFunction) => Promise<any> {
       return async(req : typeof request, resp : typeof response , next : NextFunction)=>{
    
            const {idArea} = req.params;
        
            if( (await this.MArea.buscarPorId(Number(idArea))) ){
                next();
            } 
            else {
                HttpHelpers.responderPeticionError(resp,INVALIDO.ID_AREA_ACT.message,INVALIDO.ID_AREA_ACT.status)
           
            }
        }
    }

}


