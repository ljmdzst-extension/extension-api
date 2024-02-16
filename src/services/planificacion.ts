import { Transaction } from "sequelize";
import { ObjetivoEspecifico } from "../models/ObjetivoEspecifico";


export default class ServiciosPlanificacion {
    
    static async leerDatos(iObjetivoEsp : ObjetivoEspecifico, transaction ?: Transaction){

        iObjetivoEsp.actividadObjetivoEspecificos = await iObjetivoEsp.getActividadObjetivoEspecificos({transaction});
        
        await Promise.all(
            iObjetivoEsp.actividadObjetivoEspecificos.map( act => act.getCronogramaActividads({transaction}).then( cronog => act.cronogramaActividads.push( ...cronog ) ))
        )
    
    }

    static verDatos( iObjetivoEsp : ObjetivoEspecifico){
        return {
            ...iObjetivoEsp.datavalues,
            acti
        }
    }

} 