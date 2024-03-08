import cli from 'cli-color'
import { NextFunction, request, response } from "express";
import { ValidationError, ValidationErrorItem } from "sequelize";
import { servicio } from "../types/general";
import sequelizeExtension from '../config/dbConfig';

export const middleware = <ENTRADA,SALIDA >( _servicio : servicio<ENTRADA,SALIDA>)=>{
    
    return async( req : typeof request, resp : typeof response, next : NextFunction)=>{
        if(process.env.NODE_ENV ==='development')console.log(cli.yellow(`[MIDDLEWARE] - ${_servicio.name} iniciando...`));
        const transaction  = await sequelizeExtension.transaction();
        try {
            

            let data : any = undefined;
            
            if(req.method === 'GET'){
                data = req.params;
            }
    
            if(req.method !== 'GET'){
                data = req.body;
            }
            await _servicio(data,transaction);
            
            await transaction.commit();
            

           if(process.env.NODE_ENV ==='development') console.log(cli.green(`[MIDDLEWARE] - ${_servicio.name} OK`));
            if(process.env.NODE_ENV ==='development')console.log('---------------------------------------------')
            
           next();

           
            
        } catch (error : any) {
            let logError : string | Object | ValidationErrorItem[] = '';


            await transaction.rollback();

            
            if(error instanceof ValidationError){
                
                console.log(`${error.name} : ${error.message}`)
                logError = error.errors;
            }
            else if(error instanceof Error){
                logError = error.message;
            }
            else {
                logError = error.msg;
            }
    
            console.log(cli.red(`[${req.method}] - ${_servicio.name} Error : ${logError}`));
            

            
            resp.status(error.status ? error.status : 500).json({
                ok :false,
                data : null,
                error : logError instanceof Array ? logError.map(error => error.message) : logError
            })
    
        }   
    }
   
}