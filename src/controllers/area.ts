
import cli from 'cli-color'
import { request, response } from "express";

import Actividad, {  IItemActividad, IResponseActividad } from "../classes/Actividad";
import Area, { IArea } from "../classes/Area";
import Programa from "../classes/Programa";
import { HttpHelpers } from "../helpers/general";
import sequelizeExtension from '../config/dbConfig';
import { ColaDeTareas } from '../helpers/tareas';


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
                const listaActividades  = await Area.buscarPorIDConAct(Number(idArea), Number(anio) , transaction);
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
    
                const { idArea, anio} = req.params;
    
                salida = await Area.verResumen(Number(idArea),Number(anio))
                
                HttpHelpers.responderPeticionOk(resp,salida) 
    
            } catch (error : any) {
                if(!error.status) console.log(cli.red(error));
                
                HttpHelpers.responderPeticionError(resp, error.message,error.status );
           }
    
        }
