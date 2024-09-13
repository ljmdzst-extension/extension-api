
import { response, NextFunction, Request, Response } from "express";
import { HttpHelpers } from "../helpers/general";
import { domain } from "../../../../domain";
import IMiddleware from "./middleware";
import { ERROR } from "../logs/errores";



export class MiddlewareDeterminarAreasHabilitadas implements IMiddleware {
    constructor(){ }
    public usar() {
        return async (req : any, resp : typeof response , next : NextFunction)=>{
            const {categorias}: {categorias : domain.TDataCategoria[]} = req.usuario;
        
            const categoriasHabilitadas = ['ADMIN','EYC','GESTION_EYC','EYC_ECO_FINAN','PROG_EXT' ];
            
            const categEncontrada = categorias.find( c => categoriasHabilitadas.some( nombre => c.nombre !== nombre) ) ;
        
            if( ! categEncontrada  ) {
        
                HttpHelpers.responderPeticionError(resp,'Usuario no habilitado para acceder a planificaciones' ,403);
            }
            else {
                req.usuario.areas = categEncontrada.nombre === 'PROG_EXT' ? 'PROG_EXT' : 'TODAS';
               
                next();
            }
        
        }   
    }
}



export class MiddlewareValidarPermisoAccesoMetas implements IMiddleware {
    constructor(){ }
    public usar() {
        return async( req : any, resp : typeof response, next : NextFunction)=>{
            const usuario : domain.Usuario | undefined = req.usuario;

            if( ! usuario ) {
                HttpHelpers.responderPeticionError(
                    resp,
                    ERROR.USUARIO_INEXISTENTE.message,
                    ERROR.USUARIO_INEXISTENTE.status
                );
                return;
            } 
            
            else if(  
                usuario.verDatos().categoria?.nombre !== 'ADMIN' && 
                usuario.verDatos().permisos?.every( permiso => permiso.nombre !== 'METAS_LECTURA') 
            )  {
        
                HttpHelpers.responderPeticionError(   resp,  'no posee permisos para acceder a planificaciones',  403  );
                return;
            } 
            else  {
               
                next();
        
            }
          
        }
    }
}



export class MiddlewareValidarPermisoEdicionMetas implements IMiddleware {
    constructor(){}
    usar(): (req: Request, res: Response, next: NextFunction) => Promise<any> {
        return async( req : any, resp : typeof response, next : NextFunction)=>{
            const {categorias,permisos}: {categorias :  domain.TDataCategoria[], permisos : domain.TDataPermiso[]} = req.usuario;
            
            if( categorias.every( c => c.nombre !== 'ADMIN') && permisos.every( permiso => permiso.nombre !== 'METAS_EDICION') )  {
                
                HttpHelpers.responderPeticionError(  resp, 'no posee permisos para realizar esta acción', 403  );
        
            } 
            
            else {
                next();
            }
        
                
        }
    }
}