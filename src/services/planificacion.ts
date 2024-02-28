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
    definirPersistenciaAct(iObjetivo: ObjetivoEspecifico, transaction?: Transaction | undefined): Promise<void>[];
}

export interface iServiciosActividadObjetivoEspecifico extends IServiciosModelo {
    crearActObjEsp ( data : ActividadObjetivoEspecificoCreationAttributes & {
        cronogramas : CronogramaActividadCreationAttributes[]
    }) : ActividadObjetivoEspecifico;
}

type TActObjIn = ActividadObjetivoEspecificoCreationAttributes & {
    cronogramas : CronogramaActividadCreationAttributes[]
}

type TObjEspIn = ObjetivoEspecificoCreationAttributes & {
    actividadObjetivoEspecificos : TActObjIn[] 
}

export  class ServiciosObjetivoEspecifico implements IServiciosModelo {

    private iServiciosActividadObjetivoEsp !: ServiciosActividadObjetivoEspecifico;
    
    constructor(){
        this.iServiciosActividadObjetivoEsp = new ServiciosActividadObjetivoEspecifico();
    }

   async definirPersistencia(iObjetivo: ObjetivoEspecifico, transaction?: Transaction | undefined): Promise<void> {
        if(process.env.NODE_ENV === 'development') console.log('ObjEsp - ',this.definirPersistencia.name)
        const opciones = {attributes : ['idObjetivoEspecifico'],transaction};
        await ObjetivoEspecifico.findByPk(iObjetivo.idObjetivoEspecifico,opciones).then( resp => iObjetivo.isNewRecord = resp === null );

    }
    definirPersistenciaAct(iObjetivo: ObjetivoEspecifico, transaction?: Transaction | undefined):Promise<void>[] {
        if(process.env.NODE_ENV === 'development') console.log('ObjEsp - ',this.definirPersistenciaAct.name)
        const opciones = {attributes : ['idObjetivoEspecifico'],transaction};
        return iObjetivo.actividadObjetivoEspecificos.map( act => this.iServiciosActividadObjetivoEsp.definirPersistencia(act,transaction) )

    }
    crearObjetivoEspecifico(data : TObjEspIn)
    {
        const objEsp = ObjetivoEspecifico.build(data);

        const actividadesObjEsp = data.actividadObjetivoEspecificos.map( dataAct => 
            this.iServiciosActividadObjetivoEsp.crearActObjEsp(dataAct));

        objEsp.actividadObjetivoEspecificos = [];

        objEsp.actividadObjetivoEspecificos.push(...actividadesObjEsp);
        return objEsp;
    }
    editarDatos(iObjetivo: ObjetivoEspecifico, data : TObjEspIn ) {
        
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
    
    async leerDatosDeBD(iObjetivoEsp : ObjetivoEspecifico, transaction ?: Transaction){
        iObjetivoEsp.actividadObjetivoEspecificos = [];
       await iObjetivoEsp.getActividadObjetivoEspecificos({transaction})
        .then(resp => iObjetivoEsp.actividadObjetivoEspecificos.push(...resp));
    
    }
  
    async guardarDatosEnBD( iObjetivoEsp : ObjetivoEspecifico, transaction ?: Transaction ){
    
        await iObjetivoEsp.save({transaction});

    }

    async guardarDatosActividades( iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction  ){
       await  this.iServiciosActividadObjetivoEsp.guardarDatosEnBD(iActObjEsp,transaction)
     
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
   
    async definirPersistencia(iActObjEsp: ActividadObjetivoEspecifico, transaction?: Transaction | undefined): Promise<void> {
        if(process.env.NODE_ENV === 'development') console.log('ActObjEsp - ',this.definirPersistencia.name)
        await ActividadObjetivoEspecifico.findByPk(iActObjEsp.idActividadObjetivoEspecifico,{transaction}).then( resp => iActObjEsp.isNewRecord = resp === null);
    }
    editarDatos(iActObjEsp: ActividadObjetivoEspecifico, data : TActObjIn) {
        iActObjEsp.set(data);
        if(data.cronogramas) {
            iActObjEsp.cronogramaActividads = CronogramaActividad.bulkBuild(data.cronogramas);
        }
    }


    
    async leerDatosDeBD(iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction){
        iActObjEsp.cronogramaActividads = [];
        await iActObjEsp.getCronogramaActividads({transaction})
            .then(resp => iActObjEsp.cronogramaActividads.push(...resp));
    
    }
  
    async guardarDatosEnBD( iActObjEsp : ActividadObjetivoEspecifico, transaction ?: Transaction ){
        
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

    crearActObjEsp ( data :TActObjIn ) {
        const cronogramas = CronogramaActividad.bulkBuild(data.cronogramas);
        const actividad = ActividadObjetivoEspecifico.build(data);
        actividad.cronogramaActividads = [];
        actividad.cronogramaActividads.push( ...cronogramas );
        return actividad;
    }

} 