import cli from 'cli-color'
import { request, response } from "express";
import { Error as SequelizeError } from "sequelize";

import { servicio } from "../types/general";
import sequelizeExtension from '../config/dbConfig';






export const endpoint = <ENTRADA,SALIDA >( _servicio : servicio<ENTRADA,SALIDA>)=>{
    
    return async( req : typeof request, resp : typeof response)=>{
        console.log(cli.yellow(`[${req.method}] - ${_servicio.name} iniciando...`));
        const transaction  = await sequelizeExtension.transaction();
        try {
            
            let data : any = undefined;
            if(req.header('Authorization')){
                data = { token : req.header('Authorization')?.split(' ')[1] }
                if(req.method === 'GET'){
                    data = {...data,...req.params};
                }
                else if(req.method !== 'GET'){
                    data = {...data,...req.body};
                }

            }
            else if(req.method === 'GET'){
                data = req.params;
            }
            else if(req.method !== 'GET'){
                data = req.body;
            }
            const salida = await _servicio(data,transaction);
            
            await transaction.commit();
            

            console.log(cli.green(`[${req.method}] - ${_servicio.name} OK`));
            console.log('---------------------------------------------')
            
            resp.status(200).json({
                ok : true,
                data : salida,
                error : null
            })

           
            
        } catch (error : any) {
            let logError = '';
            await transaction.rollback();
            if(error instanceof SequelizeError){
                logError = ` ${error.name} : ${error.message}`;
            }
            if(error instanceof Error){
                logError = error.message;
            }
            else {
                logError = JSON.stringify(error.msg);
            }
    
            console.log(cli.red(`[${req.method}] - ${_servicio.name} Error : ${logError}`));
            

            
            resp.status(error.status ? error.status : 500).json({
                ok :false,
                data : null,
                error : error.status === 500 ? 'Error de servidor' : logError
            })
    
        }   
    }
   
}