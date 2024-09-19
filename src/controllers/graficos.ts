import { response } from "express";

import * as SGraficos from '../services/graficos'


export const verGraficosGeneral = async(req : any , resp : typeof response)=>{

    try {
        
        const {anio } = req.params;

        const graficos = await SGraficos.verGraficosGeneral(Number(anio));
        
        resp.status(200).json({
            ok : true,
            data : graficos,
            error : null
        });
        
        

    } catch (error : any) {
        
        if( error.status && error.status === 500){
            console.log( error.message );
        }
        resp.status( error.status || 500).json({
            ok : false,
            data : null,
            error : error.message || 'Error de servidor'
        })
    }

}


export const verGraficosDeArea = async(req : any , resp : typeof response)=>{

    try {
        
        const {anio,idArea } = req.params;

        const graficos = await SGraficos.verGraficosDeArea(Number(anio),Number(idArea));
        
        resp.status(200).json({
            ok : true,
            data : graficos,
            error : null
        });
        
        

    } catch (error : any) {
        
        if( error.status && error.status === 500){
            console.log( error.message );
        }
        resp.status( error.status || 500).json({
            ok : false,
            data : null,
            error : error.message || 'Error de servidor'
        })
    }

}

