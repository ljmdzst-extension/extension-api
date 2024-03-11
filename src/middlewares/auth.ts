import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import {  response, NextFunction } from "express";

import { BD } from "../config/dbConfig";

export const extraerToken = (req : any, resp : typeof response, next : NextFunction) =>{
    const  token  = req.header('Authorization')?.split(' ')[1] ;    
    if(token) {
        req.token = token;  
    } 
    next();

}
export const validarToken = async(req : any, resp : typeof response, next : NextFunction) =>{
    try {
        const { idUsuario }= jwt.verify(req.token,process.env.HASH_KEY || '' ) as jwt.JwtPayload;
        
        req.idUsuario= idUsuario;
        
        next();

    } catch (error : any) {
        let status = 500;
        let message = 'error de servidor';
        if(error instanceof JsonWebTokenError && error.name === 'TokenExpiredError'){
            status  = 403;
            message = 'Sesión de usuario expirada.'        
        } else {
            message = error.message;
        }
        
        if(status === 500) {
            console.log(`ERROR : ${req.method}-${req.path}-${message}`)
        }

        resp.status(status).json({
            ok : false,
            data : null,
            error : message
        })
    }
}

export const obtenerDataUsuario = async(req : any, resp : typeof response, next : NextFunction) =>{
        
        try {
            const iUsuario = await BD.Usuario.findByPk(req.idUsuario);
        
            if(!iUsuario) throw {status : 400 , message: 'no existe un usuario con ese id'}
            
            const categoria = await BD.Categoria.findByPk(iUsuario.idCategoria);
            
            if(!categoria) throw { status : 500 , message : 'usuario sin categoría'}
    
            console.log(` USR : ${iUsuario.idUsuario}`)
    
            req.usuario = {
                usuario : iUsuario,
                categoria : categoria
            }
    
            next();
            
        } catch (error : any) {
            let status = 500;
            let message = 'error de servidor';
            if(error.status && error.message) {
                status = error.status
                message = error.message
            }
            if(status === 500) {
                console.log(`ERROR : ${req.method}-${req.path}-${message}`)
            }
            resp.status(status).json({
                ok : false,
                data : null,
                error : message
            })
        }
}