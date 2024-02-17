import { Transaction } from "sequelize";
import { ObjetivoEspecifico } from "../models/ObjetivoEspecifico";
import { ActividadObjetivoEspecifico } from "../models/ActividadObjetivoEspecifico";
import { Propuesta } from "../models/Propuesta";


export default class ServiciosPlanificacion {
    static async leerPlanificacionPorPropuesta( iPropuesta : Propuesta)  {
        await iPropuesta.sequelize.transaction(async transaction => {
            await Promise.all(iPropuesta.objetivoEspecificos.map( obj => ServiciosPlanificacion.leerDatosObjetivo(obj,transaction) ))
        });
        await iPropuesta.sequelize.transaction(async transaction => {

            await Promise.all(
                iPropuesta.objetivoEspecificos.map(obj => 
                    ServiciosPlanificacion.leerDatosActividades(obj.actividadObjetivoEspecificos,transaction)
                )
            );
        });
    }
    static async leerDatosObjetivo(iObjetivoEsp : ObjetivoEspecifico, transaction ?: Transaction){

        iObjetivoEsp.actividadObjetivoEspecificos = await iObjetivoEsp.getActividadObjetivoEspecificos({transaction});
    
    }
    static async leerDatosActividades( actividades : ActividadObjetivoEspecifico[] , transaction ?: Transaction ){
       await Promise.all(
         actividades.map(
                act => act.getCronogramaActividads({transaction})
                    .then( cronogramas => act.cronogramaActividads = cronogramas )
            )
       );
    }
     
    static verDatos( iObjetivoEsp : ObjetivoEspecifico){
        return iObjetivoEsp.dataValues;
    }

} 