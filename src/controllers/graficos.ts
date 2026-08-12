import { response } from "express";

import * as SGrficos from '../services/graficos'


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



export const verGraficoGantt = async(req : any , resp : typeof response)=>{

    try {

        const {anio} = req.params;
        console.log('anio',anio);
        const graficos = await SGraficos.verGraficoGantt(Number(anio));
        console.log('graficos',graficos);
        
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

export const verInstituciones = async(req : any , resp : typeof response)=>{


    try {

        const instituciones = await SGrficos.verInstituciones();
        console.log('instituciones',instituciones);

        resp.status(200).json({
            ok : true,
            data : instituciones,
            error : null
        });

    } catch (error : any) {
        resp.status( error.status || 500).json({
            ok : false,
            data : null,
            error : error.message || 'Error de servidor'
        })

    }

}