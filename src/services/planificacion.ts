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

        iObjetivoEsp.actividadObjetivoEspecificos = await iObjetivoEsp.getActividadObjetivoEspecificos({transaction});
    
    }
  
    async guardarDatos( iObjetivoEsp : ObjetivoEspecifico, transaction ?: Transaction ){
        await iObjetivoEsp.save({transaction});

    }

    verDatos( iObjetivoEsp : ObjetivoEspecifico){
        return iObjetivoEsp.dataValues;
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

        iActObjEsp.cronogramaActividads = await iActObjEsp.getCronogramaActividads({transaction});
    
    }
  
    async guardarDatos( iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction ){
        await iActObjEsp.save({transaction});

    }

    verDatos( iActObjEsp : ActividadObjetivoEspecifico){
        return iActObjEsp.dataValues;
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