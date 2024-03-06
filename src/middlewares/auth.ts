import { request, response, NextFunction } from "express";


export const extraerToken = (req : any, resp : typeof response, next : NextFunction) =>{
    const  token  = req.header('Authorization')?.split(' ')[1] ;
    
        if(!token) {

            resp.status(403).json({
                ok : false,
                error : 'token inválido',
                data : null
            });
            
        } else {

            req.token = token;
    
            next();
        }

}