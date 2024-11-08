
import cli from 'cli-color'
import fs from 'fs';
import fspromises from 'fs/promises'
import path from 'path'
import { request, response } from "express";

import {  IItemActividad, IResponseActividad } from "../classes/Actividad";
import Area, { IArea } from "../classes/Area";
import Programa from "../classes/Programa";
import { HttpHelpers } from "../helpers/general";
import sequelizeExtension from '../config/dbConfig';

type TBusBoyBodyParserFile = {
    data : Buffer,
    name : string,
    encoding :string,
    mimetype : string,
    truncated : boolean
}

export const  verListaAreas = async(  req : typeof request , resp : typeof response) => {
    try {
            let salida : IArea[] = [];

            const { idPrograma } = req.params;

            const iPrograma = await Programa.buscarPorID(Number(idPrograma));

            const areas = iPrograma.verListaAreas();

            salida = areas.map( area => area.verDatos());


            HttpHelpers.responderPeticionOk(resp,salida);
        
        } catch (error : any) {
            if(!error.status) console.log(cli.red(error));
            
            HttpHelpers.responderPeticionError(resp, error.message,error.status );
       }


        
    }
   
export const  verListaActividades = async (  req : typeof request , resp : typeof response ) => {
    
 
    try {
            let salida : IItemActividad[] = []

            const { idArea, anio} = req.params;
            const listaActividades = await sequelizeExtension.transaction({},async transaction=>{
                const listaActividades  = await Area.buscarPorIDConAct(Number(idArea), Number(anio),undefined,undefined,undefined , transaction);
                return listaActividades;
            })

            if(listaActividades.length){
                salida = listaActividades;
            }

            HttpHelpers.responderPeticionOk(resp,salida)

        } catch (error : any) {
           
            if(!error.status) console.log(cli.red(error));
            
            HttpHelpers.responderPeticionError(resp, error.message,error.status );
       }

    }

export const  verResumenArea = async (  req : typeof request , resp : typeof response ) => {
    
        try {
                let salida : IResponseActividad[] = []
    
                const { idArea, anio,offset,limit} = req.params;
                console.log(req.params.keyword)
                salida = await Area.verResumen(Number(idArea),Number(anio),Number(offset),Number(limit),req.params.keyword)
                
                HttpHelpers.responderPeticionOk(resp,salida) 
    
            } catch (error : any) {
                if(!error.status) console.log(cli.red(error));
                
                HttpHelpers.responderPeticionError(resp, error.message,error.status );
           }
    
        }

export const descargarPresupuesto = async(   req : typeof request , resp : typeof response  ) => {
    try {
        // buscar directorio del proyecto por el codigo
        const PATH_DOCS = `${process.env.PATH_DOCS}`;

        const {anio , idPrograma, idArea} = req.params;


        if(!fs.existsSync(PATH_DOCS)) throw { status : 400 , message : 'no existe presupuesto cargado'}
        const PATH_PRESUPUESTO = `${PATH_DOCS}/${anio}/${idPrograma}/${idArea}`;
        if(!fs.existsSync(PATH_PRESUPUESTO)) throw { status : 400 , message : 'no existe presupuesto cargado'}


        // descargar el archivo
        resp.status(200).download(`${PATH_PRESUPUESTO}/PRESUPUESTO.xlsx`);
        
    } catch (error : any) {
        HttpHelpers.responderPeticionError(resp,error.message,error.status);
    }
}

export const subirPrespuesto = async(   req : any , resp : typeof response  ) => {
    try {
        
        const dataFile : TBusBoyBodyParserFile = Object.values(req.files)[0] as TBusBoyBodyParserFile ;

        // buscar directorio del proyecto por el codigo
        const PATH_DOCS = `${process.env.PATH_DOCS}`;

        const {anio , idPrograma, idArea} = req.params;


        if(!fs.existsSync(PATH_DOCS)) throw { status : 400 , message : 'no existe el directorio docs'}
        if(!fs.existsSync(`${PATH_DOCS}/${anio}`)){
            await fspromises.mkdir(`${PATH_DOCS}/${anio}`);
        }
        if(!fs.existsSync(`${PATH_DOCS}/${anio}/${idPrograma}`)){
            await fspromises.mkdir(`${PATH_DOCS}/${anio}/${idPrograma}`);
        }
        if(!fs.existsSync(`${PATH_DOCS}/${anio}/${idPrograma}/${idArea}`)){
            await fspromises.mkdir(`${PATH_DOCS}/${anio}/${idPrograma}/${idArea}`);
        }
        // subir el archivo
        await fspromises.writeFile(`${PATH_DOCS}/${anio}/${idPrograma}/${idArea}/PRESUPUESTO.xlsx`,dataFile.data);
        

        HttpHelpers.responderPeticionOk(resp,dataFile.name);
        
    } catch (error : any) {
        HttpHelpers.responderPeticionError(resp,error.message,error.status);
    }
}
