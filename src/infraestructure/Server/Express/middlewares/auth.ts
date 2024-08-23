import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import {  response, NextFunction, Request, Response } from "express";
import { aplication } from '../../../../aplication';
import IMiddleware from './middleware';
import { HttpHelpers } from '../helpers/general';
import { ERROR } from '../logs/errores';

export class MiddlewareExtraerToken implements IMiddleware {
    constructor( ){ }

    public usar() {
        return async (req : any, resp : typeof response, next : NextFunction) =>{
            const  token  = req.header('Authorization')?.split(' ')[1] ;    
            if(token) {
                req.token = token;  
                next();
            } else {
                HttpHelpers.responderPeticionError(resp,ERROR.TOKEN_INVALIDO.message,ERROR.TOKEN_INVALIDO.status);
            }
         }
    }
}




export class MiddlewareValidarToken implements IMiddleware {
    constructor(){}

    public usar() {
        return async(req : any, resp : typeof response, next : NextFunction) =>{
            try {
                if(!req.token) throw ERROR.TOKEN_INVALIDO;
                
                const { idUsuario }= jwt.verify(req.token,`${process.env.HASH_KEY }`) as jwt.JwtPayload;
        
                if(!idUsuario) throw {status : 400, message : ' No se pudo obtener el id del usuario'}
        
                req.usuario = {
                    idUsuario : idUsuario
                };
                
                next();
        
            } catch (error : any) {
                if(error instanceof JsonWebTokenError && error.name === 'TokenExpiredError'){
                    HttpHelpers.responderPeticionError(resp,'Sesión de usuario expirada.',401);
                } else {
                    console.log(error);
                    HttpHelpers.responderPeticionError(resp,error.message,error.status);
                }
               
            }
        }
    }
} 



