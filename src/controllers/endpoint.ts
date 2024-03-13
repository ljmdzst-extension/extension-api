import cli from 'cli-color'
import { request, response } from "express";
import { Error as SequelizeError } from "sequelize";

import { servicio } from "../types/general";
import sequelizeExtension from '../config/dbConfig';






export const endpoint = <ENTRADA,SALIDA >( _servicio : servicio<ENTRADA,SALIDA>)=>{
    
    return async( req : any, resp : typeof response)=>{
     
        const transaction  = await sequelizeExtension.transaction();
        try {
            
            let data : any = undefined;

            

            if(req.usuario) {
                data = {usuario : req.usuario}
            }
            if(req.method === 'GET'){
                data = {...data, ...req.params};
            }
            else if(req.method !== 'GET'){
                data =  {...data, ...req.body};
            }


            const salida = await _servicio(data,transaction);
            
            await transaction.commit();
        


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