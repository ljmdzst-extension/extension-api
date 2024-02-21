import { Transaction } from "sequelize";
import { ObjetivoEspecifico, ObjetivoEspecificoCreationAttributes } from "../models/ObjetivoEspecifico";
import { IServiciosModelo } from "./IServiciosModelo";
import { ActividadObjetivoEspecifico, ActividadObjetivoEspecificoCreationAttributes } from "../models/ActividadObjetivoEspecifico";
import { CronogramaActividad, CronogramaActividadCreationAttributes } from "../models/CronogramaActividad";

export interface iServiciosObjetivoEspecifico extends IServiciosModelo {
    crearObjetivoEspecifico(data : ObjetivoEspecificoCreationAttributes & {
        actividadObjetivoEspecificos : (ActividadObjetivoEspecificoCreationAttributes & {
            cronogramas : CronogramaActividadCreationAttributes[]
        })[]}
    ) : ObjetivoEspecifico;
    guardarDatosActividad( iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction  ) : Promise<void>;
    guardarCronogramasActividades( iObjetivoEsp : ObjetivoEspecifico) : Promise<void>;
}

export  class ServiciosObjetivoEspecifico implements IServiciosModelo {

    private iServiciosActividadObjetivoEsp !: ServiciosActividadObjetivoEspecifico;
    
    constructor(){
        this.iServiciosActividadObjetivoEsp = new ServiciosActividadObjetivoEspecifico();
    }
    
    async leerDatos(iObjetivoEsp : ObjetivoEspecifico, transaction ?: Transaction){
        iObjetivoEsp.actividadObjetivoEspecificos = [];
       await iObjetivoEsp.getActividadObjetivoEspecificos({transaction})
        .then(resp => iObjetivoEsp.actividadObjetivoEspecificos.push(...resp));
    
    }
  
    async guardarDatos( iObjetivoEsp : ObjetivoEspecifico, transaction ?: Transaction ){
        await iObjetivoEsp.save({transaction});

    }

    async guardarDatosActividad( iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction  ){
       await this.iServiciosActividadObjetivoEsp.guardarDatos(iActObjEsp,transaction);
    }
    async guardarCronogramasActividades( iObjetivoEsp : ObjetivoEspecifico){
        if(iObjetivoEsp.actividadObjetivoEspecificos ) {
            await iObjetivoEsp.sequelize.transaction( async transaction => {
                await Promise.all(
                    iObjetivoEsp.actividadObjetivoEspecificos
                        .map(actObjEsp => this.iServiciosActividadObjetivoEsp.guardarCronogramas(actObjEsp,transaction))
                        .reduce( (salida , iguardarCronogramas)=> ([...salida,...iguardarCronogramas]),[] )
                    
                )
            })
        }
    }

    verDatos( iObjetivoEsp : ObjetivoEspecifico){

        let salida = {
            ...iObjetivoEsp.dataValues,
            actividadObjetivoEspecificos : <any>[]
        }
        if(iObjetivoEsp.actividadObjetivoEspecificos.length){
         
            salida = {
                ...salida,
                actividadObjetivoEspecificos : iObjetivoEsp.actividadObjetivoEspecificos.map( act => this.iServiciosActividadObjetivoEsp.verDatos(act) )
            }
        }
        return salida;
    }

  

    crearObjetivoEspecifico(data : ObjetivoEspecificoCreationAttributes & {
        actividadObjetivoEspecificos : (ActividadObjetivoEspecificoCreationAttributes & {
            cronogramas : CronogramaActividadCreationAttributes[]
        })[]}
    ){
        const objEsp = ObjetivoEspecifico.build(data);

        const actividadesObjEsp = data.actividadObjetivoEspecificos.map( dataAct => this.iServiciosActividadObjetivoEsp.crearActObjEsp(dataAct));

        objEsp.actividadObjetivoEspecificos = [];

        objEsp.actividadObjetivoEspecificos.push(...actividadesObjEsp);
    }
} 

export interface iServiciosActividadObjetivoEspecifico extends IServiciosModelo {
    crearActObjEsp ( data : ActividadObjetivoEspecificoCreationAttributes & {
        cronogramas : CronogramaActividadCreationAttributes[]
    }) : ActividadObjetivoEspecifico;
}

export  class ServiciosActividadObjetivoEspecifico implements IServiciosModelo {


    
    async leerDatos(iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction){
        iActObjEsp.cronogramaActividads = [];
        await iActObjEsp.getCronogramaActividads({transaction})
            .then(resp => iActObjEsp.cronogramaActividads.push(...resp));
    
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

    crearActObjEsp ( data : ActividadObjetivoEspecificoCreationAttributes & {
        cronogramas : CronogramaActividadCreationAttributes[]
    }) {
        const cronogramas = CronogramaActividad.bulkBuild(data.cronogramas);
        const actividad = ActividadObjetivoEspecifico.build(data);
        actividad.cronogramaActividads = [];
        actividad.cronogramaActividads.push( ...cronogramas );
        return actividad;
    }

} 