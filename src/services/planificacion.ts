import { Transaction } from "sequelize";
import { ObjetivoEspecifico } from "../models/ObjetivoEspecifico";
import { IServiciosModelo } from "./IServiciosModelo";
import { ActividadObjetivoEspecifico } from "../models/ActividadObjetivoEspecifico";
import { CronogramaActividad } from "../models/CronogramaActividad";



export  class ServiciosObjetivoEspecifico implements IServiciosModelo {

    private iServiciosActividadObjetivoEsp !: ServiciosActividadObjetivoEspecifico;
    
    constructor(){
        this.iServiciosActividadObjetivoEsp = new ServiciosActividadObjetivoEspecifico();
    }
    
    async leerDatos(iObjetivoEsp : ObjetivoEspecifico, transaction ?: Transaction){

       await iObjetivoEsp.getActividadObjetivoEspecificos({transaction})
        .then(resp => iObjetivoEsp.actividadObjetivoEspecificos = resp);
    
    }
  
    async guardarDatos( iObjetivoEsp : ObjetivoEspecifico, transaction ?: Transaction ){
        await iObjetivoEsp.save({transaction});

    }

    verDatos( iObjetivoEsp : ObjetivoEspecifico){

        let salida = {
            ...iObjetivoEsp.dataValues,
            lActividades : <any>[]
        }
        if(iObjetivoEsp.actividadObjetivoEspecificos.length){
         
            salida = {
                ...salida,
                lActividades : iObjetivoEsp.actividadObjetivoEspecificos.map( act => this.iServiciosActividadObjetivoEsp.verDatos(act) )
            }
        }
        return salida;
    }

    async guardarCronogramasActividades( iObjetivoEsp : ObjetivoEspecifico){
        if(iObjetivoEsp.actividadObjetivoEspecificos.length ) {
            await iObjetivoEsp.sequelize.transaction( async transaction => {
                await Promise.all(
                    iObjetivoEsp.actividadObjetivoEspecificos
                        .map(actObjEsp => this.iServiciosActividadObjetivoEsp.guardarCronogramas(actObjEsp,transaction))
                        .reduce( (salida , iguardarCronogramas)=> ([...salida,...iguardarCronogramas]),[] )
                    
                )
            })
        }
    }
} 

export  class ServiciosActividadObjetivoEspecifico implements IServiciosModelo {


    
    async leerDatos(iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction){

        await iActObjEsp.getCronogramaActividads({transaction})
            .then(resp => iActObjEsp.cronogramaActividads = resp);
    
    }
  
    async guardarDatos( iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction ){
        await iActObjEsp.save({transaction});

    }

    verDatos( iActObjEsp : ActividadObjetivoEspecifico){
        let salida = { ...iActObjEsp.dataValues , cronograma : <any>[]};
        if(iActObjEsp.cronogramaActividads.length) {
            salida = {
                ...salida,
                cronograma : iActObjEsp.cronogramaActividads.map( cronograma => cronograma.dataValues)
            }
        }
        return salida;
    }


    asociarCronogramas( iActObjEsp : ActividadObjetivoEspecifico, cronogramas : CronogramaActividad[] ){
        iActObjEsp.setCronogramaActividads( cronogramas );
    }
    
    guardarCronogramas(iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction){
        if(iActObjEsp.cronogramaActividads.length) {
           return iActObjEsp.cronogramaActividads.map( cronograma => cronograma.save({transaction}));
        }
        return [];
    }

} 