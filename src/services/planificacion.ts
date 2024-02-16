import { Transaction } from "sequelize";
import { ObjetivoEspecifico } from "../models/ObjetivoEspecifico";
import { ActividadObjetivoEspecifico } from "../models/ActividadObjetivoEspecifico";


export default class ServiciosPlanificacion {
    
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