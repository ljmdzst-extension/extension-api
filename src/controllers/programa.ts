


import Programa, { IPrograma } from "../classes/Programa";


import cli from 'cli-color'
import {  response } from "express";
import { HttpHelpers } from "../helpers/general";
import * as SProgramas from '../services/programas'

export const verListaProgramasConAreas = async( req : any, resp : typeof response) => {
    try {
        let salida : IPrograma[] = [];

    
        salida = await SProgramas.verListaProgramasConAreas(req.usuario,req.params.anio);
        
        HttpHelpers.responderPeticionOk(resp, salida);

    } catch (error : any) {
            if(!error.status || error.status === 500) console.log(cli.red(error));
            
            HttpHelpers.responderPeticionError(resp, error.message,error.status );
        }

}
