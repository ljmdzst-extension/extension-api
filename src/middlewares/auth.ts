import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { request, response, NextFunction } from "express";

import { BD } from "../config/dbConfig";

export const extraerToken = (req : any, resp : typeof response, next : NextFunction) =>{
    const  token  = req.header('Authorization')?.split(' ')[1] ;    
    if(token) {
        req.token = token;  
    } 
    next();

}
export const validarTokenYObtenerDataUsuario = async(req : any, resp : typeof response, next : NextFunction) =>{
    try {
        const { idUsuario }= jwt.verify(req.token,process.env.HASH_KEY || '' ) as jwt.JwtPayload;
        
        const iUsuario = await BD.Usuario.findByPk(idUsuario);
        
        if(!iUsuario) throw {status : 400 , message: 'no existe un usuario con ese id'}
        
        const categoria = await BD.Categoria.findByPk(iUsuario.idCategoria);
        
        if(!categoria) throw { status : 500 , message : 'usuario sin categoría'}

        console.log(` USR : ${idUsuario}`)

        req.usuario = {
            idUsuario : idUsuario,
            idCategoria : categoria.idCategoria,
            categoria : categoria.nombre
        }

    

        next();
    
    } catch (error : any) {
        let status = 500;
        let message = '';
        if(error.status) {
            status = error.status
        }
        if(error.message){
            message = error.message
        }
        if(error instanceof JsonWebTokenError){
            status  = 403;
            message = error.message;
        }
        if(status === 500) {
            console.log(`ERROR : ${req.method}-${req.path}-${message}`)
        }
        resp.status(status).json({
            ok : false,
            data : null,
            error : status === 500 ? 'error de servidor' : message
        })
    }
}