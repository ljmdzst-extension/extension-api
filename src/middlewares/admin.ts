import { NextFunction,  response } from "express";
import { CategoriaAttributes } from "../models/init-models";



export const validarUsuarioAdmin =  async(req : any, resp : typeof response , next : NextFunction)=>{
    const { categorias }  = req.usuario;

    if( categorias.every( (c : CategoriaAttributes) => c.nombre !== 'ADMIN') ){
        resp.status(403).json({
            ok : false,
            error : 'No posee permisos de administrador'
        });
    } else {
        next();
    }
}