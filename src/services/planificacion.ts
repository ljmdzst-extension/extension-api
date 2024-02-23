import { Model, Transaction } from "sequelize";
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
    guardarDatosActividades( iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction  ) : Promise<void>[];
    guardarCronogramasActividades( iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction ) : Promise<void>;
}
export interface iServiciosActividadObjetivoEspecifico extends IServiciosModelo {
    crearActObjEsp ( data : ActividadObjetivoEspecificoCreationAttributes & {
        cronogramas : CronogramaActividadCreationAttributes[]
    }) : ActividadObjetivoEspecifico;
}

export  class ServiciosObjetivoEspecifico implements IServiciosModelo {

    private iServiciosActividadObjetivoEsp !: ServiciosActividadObjetivoEspecifico;
    
    constructor(){
        this.iServiciosActividadObjetivoEsp = new ServiciosActividadObjetivoEspecifico();
    }
    crearObjetivoEspecifico(data : ObjetivoEspecificoCreationAttributes & {
        actividadObjetivoEspecificos : (ActividadObjetivoEspecificoCreationAttributes & {
            cronogramas : CronogramaActividadCreationAttributes[]
        })[]}
    ){
        const objEsp = ObjetivoEspecifico.build(data);

        const actividadesObjEsp = data.actividadObjetivoEspecificos.map( dataAct => 
            this.iServiciosActividadObjetivoEsp.crearActObjEsp(dataAct));

        objEsp.actividadObjetivoEspecificos = [];

        objEsp.actividadObjetivoEspecificos.push(...actividadesObjEsp);
        return objEsp;
    }
    editarDatos(iObjetivo: ObjetivoEspecifico, data : ObjetivoEspecificoCreationAttributes & {
        actividadObjetivoEspecificos : (ActividadObjetivoEspecificoCreationAttributes & {
            cronogramas : CronogramaActividadCreationAttributes[]
        })[]} ) {
        
        iObjetivo.set(data);

        if(data.actividadObjetivoEspecificos.length) {
            data.actividadObjetivoEspecificos.forEach( dataAct => {
                const iActObjEsp = iObjetivo.actividadObjetivoEspecificos.find( act => act.idActividadObjetivoEspecifico === dataAct.idActividadObjetivoEspecifico);
                if( iActObjEsp ){
                    this.iServiciosActividadObjetivoEsp.editarDatos(iActObjEsp,dataAct);
                }
            })
        }
    }
    
    async leerDatos(iObjetivoEsp : ObjetivoEspecifico, transaction ?: Transaction){
        iObjetivoEsp.actividadObjetivoEspecificos = [];
       await iObjetivoEsp.getActividadObjetivoEspecificos({transaction})
        .then(resp => iObjetivoEsp.actividadObjetivoEspecificos.push(...resp));
    
    }
  
    async guardarDatos( iObjetivoEsp : ObjetivoEspecifico, transaction ?: Transaction ){
        iObjetivoEsp.isNewRecord = await ObjetivoEspecifico.findByPk(iObjetivoEsp.idObjetivoEspecifico,{attributes : ['idObjetivoEspecifico'],transaction}) === null;

        await iObjetivoEsp.save({transaction});

    }

    async guardarDatosActividades( iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction  ){
       await  this.iServiciosActividadObjetivoEsp.guardarDatos(iActObjEsp,transaction)
     
    }
    async guardarCronogramasActividades( iActObjEsp : ActividadObjetivoEspecifico,transaction ?: Transaction){
        await this.iServiciosActividadObjetivoEsp.guardarCronogramas(iActObjEsp,transaction);
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

  

    
} 



export  class ServiciosActividadObjetivoEspecifico implements IServiciosModelo {
    editarDatos(iActObjEsp: ActividadObjetivoEspecifico, data : ActividadObjetivoEspecificoCreationAttributes & {
        cronogramas : CronogramaActividadCreationAttributes[]
    }) {
        iActObjEsp.set(data);
        if(data.cronogramas) {
            iActObjEsp.cronogramaActividads = CronogramaActividad.bulkBuild(data.cronogramas);
        }
    }


    
    async leerDatos(iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction){
        iActObjEsp.cronogramaActividads = [];
        await iActObjEsp.getCronogramaActividads({transaction})
            .then(resp => iActObjEsp.cronogramaActividads.push(...resp));
    
    }
  
    async guardarDatos( iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction ){
        iActObjEsp.isNewRecord = await ActividadObjetivoEspecifico.findByPk(iActObjEsp.idActividadObjetivoEspecifico,{transaction, attributes : ['idActividadObjetivoEspecifico']}) === null;
        await iActObjEsp.save({transaction});

    }

    verDatos( iActObjEsp : ActividadObjetivoEspecifico){
        let salida = { ...iActObjEsp.dataValues , cronogramas : <any>[]};
        if(iActObjEsp.cronogramaActividads.length) {
            salida = {
                ...salida,
                cronogramas : iActObjEsp.cronogramaActividads.map( cronograma => cronograma.dataValues)
            }
        }
        return salida;
    }


    asociarCronogramas( iActObjEsp : ActividadObjetivoEspecifico, cronogramas : CronogramaActividad[] ){
        iActObjEsp.setCronogramaActividads( cronogramas );
    }
    
    async guardarCronogramas(iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction){
        if(iActObjEsp.cronogramaActividads.length) {
           await Promise.all( iActObjEsp.cronogramaActividads.map( cronograma => 
                CronogramaActividad.findOne({
                    where : {idCronograma : cronograma.idCronograma, idActividadObjetivoEspecifico : cronograma.idActividadObjetivoEspecifico}, 
                    transaction
                }).then( 
                    resp => cronograma.isNewRecord = resp === null
                    ) 
                ) );    
           await Promise.all( iActObjEsp.cronogramaActividads.map( cronograma => cronograma.save({transaction})));
        }
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