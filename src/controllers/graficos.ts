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

export const verInstitucionesPorAnio = async(req : any , resp : typeof response)=>{


    try {


        const {anio} = req.params;
        const instituciones = await SGraficos.verInstituciones({anio: Number(anio)});

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

export const verUbicacionesActividadPorAnio = async(req : any , resp : typeof response)=>{

     try {
        const { anio } = req.params;

        const ubicaciones = await SGraficos.verUbicacionesActividadPorAnio(anio);
        console.log('ubicaciones',ubicaciones);

        resp.status(200).json({
            ok : true,
            data : ubicaciones,
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