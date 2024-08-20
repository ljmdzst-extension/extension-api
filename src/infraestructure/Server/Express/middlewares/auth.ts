import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import {  response, NextFunction } from "express";

export const extraerToken = (req : any, resp : typeof response, next : NextFunction) =>{
   try {
    console.log(req.body.idActividad)
        const  token  = req.header('Authorization')?.split(' ')[1] ;    
        if(token) {
            req.token = token;  
        } 
        next();
   } catch (error : any) {
        resp.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.message || 'error de servidor'
        })
    }
}

export const validarToken = async(req : any, resp : typeof response, next : NextFunction) =>{
    try {
        if(!req.token) throw {status : 400 , message : 'token inexistente o inválido'}
        
        const { idUsuario }= jwt.verify(req.token,process.env.HASH_KEY || '' ) as jwt.JwtPayload;

        if(!idUsuario) throw {status : 500, message : ' No se pudo obtener el idUsuario'}

        req.usuario = {
            idUsuario : idUsuario
        };
        
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
        
        if(error.status) status = error.status;

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
