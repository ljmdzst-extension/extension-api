
import IMiddleware from "./middleware";
import { NextFunction, Request, Response } from "express";
import { HttpHelpers } from "../helpers/general";
import { aplication } from "../../../../aplication";
import { domain } from "../../../../domain";
import { ERROR } from "../logs/errores";

export class MiddlewareChequearUsuarioNoExistente implements IMiddleware {
    constructor(private MUsuario : domain.IModelUsuario ){ }

    public usar() {
        return async(req : Request, res : Response , next : NextFunction)=>{
            try {
                
                const { email } : {email : string} = req.body;
        
                const cUsuarios = await aplication.BusquedaUsaurios.buscarPor({email : email},this.MUsuario);
        
                if( cUsuarios.length > 0 ){
        
                    if( cUsuarios[0].verDatos().pendiente ) {
                        throw  ERROR.USUARIO_PENDIENTE_EXISTENTE;
                    }
        
                    throw ERROR.USUARIO_REGISTRADO_EXISTENTE;
                }
                next();
            } catch (error : any) {
                HttpHelpers.responderPeticionError(res,error.message,error.status);
            }
        
        }
    }

}
   


export class MiddlewareObtenerDataUsuario implements IMiddleware {
    constructor(
        private MUsuario : domain.IModelUsuario , 
        private VUsuario : aplication.IVUsuario
    ){ }

    public usar() {
        return async(req : any, res : Response , next : NextFunction)=>{
            
            try {

                if((!req.idUsuario) && (!req.body))  throw { status : 400 , message : 'No se pudo obtener data de la petición'}

                else if(req.idUsuario) {
                    req.usuario = await aplication.BusquedaUsaurios.buscarPorId(req.idUsuario,this.MUsuario,this.VUsuario);
                
                }
                else if( req.body){
                    const cUsuarios = await aplication.BusquedaUsaurios.buscarPor({email : req.body.email},this.MUsuario);
                    if(cUsuarios.length > 0) {
                        req.usuario = cUsuarios[0];
                    }
                  
                }
                
                next();

            } catch (error : any) {
                HttpHelpers.responderPeticionError(res,error.message,error.status);
            }
        }
    }
}




export class MiddlewareValidarUsuarioNoPendiente implements IMiddleware {
    constructor(){ }
    usar() {
        return async( req : any , resp : Response, next : NextFunction)=>{
            const { usuario } : { usuario : domain.Usuario } = req;
            
            if( ! usuario.verDatos().pendiente ) {
                next();
            } else {
                HttpHelpers.responderPeticionError(resp, 'Usuario pendiente de confirmación de registro' ,403 );
            }
        }
    }
}

export class MiddlewareValidarCamposUsuario implements IMiddleware {
    constructor(private VUsuario : aplication.IVUsuario ){ }

    public usar() {
        return async(req : Request, resp : Response , next : NextFunction)=>{
            const data = req.body;
        
            console.log('validando campos Usuario ..');
    
            if(this.VUsuario.validar(data)){
                next();
            } else {
                HttpHelpers.responderPeticionError(resp,'Revise los campos de la Usuario',400);
            }
        }
    }
}