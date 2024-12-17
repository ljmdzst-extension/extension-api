
import IMiddleware from "./middleware";
import { NextFunction,  Request,  Response,  response } from "express";
import { HttpHelpers } from "../helpers/general";
import { domain } from "../../../../domain";


export class MiddlewareValidarUsuarioAdmin implements IMiddleware {
    usar(): (req: Request, res: Response, next: NextFunction) => Promise<any> {
        return async(req : any, resp : typeof response , next : NextFunction)=>{
            const { categorias }  = req.usuario;
        
            if( categorias.every( (c : domain.TDataCategoria) => c.nombre !== 'ADMIN') ){
                resp.status(403).json({
                    ok : false,
                    error : 'No posee permisos de administrador'
                });
            } else {
                next();
            }
        }
        
    }

}

export class MiddlewareValidarUsuarioRepetidoPorNroDoc implements IMiddleware {
    constructor( private MUsuario : domain.IModelUsuario){}
    usar(): (req: Request, res: Response, next: NextFunction) => Promise<any> {
        return  async(req : any, resp : typeof response , next : NextFunction)=>{

            const {persona} = req.body;
        
            if( persona && (await this.MUsuario.buscarPor({nroDoc : persona.nroDoc})) === null ) {
                next();
            } else {
                HttpHelpers.responderPeticionError(resp,'ya existe un usuario con ese dni',400);
            }
        
        }
    }

}
