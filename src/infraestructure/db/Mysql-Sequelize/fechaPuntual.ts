import * as Sequelize from 'sequelize'
import { domain } from '../../../domain';
import { BD } from './config/dbConfig';

export default class MFechaPuntual  {

    
  public static async buscarPorActividad( actividad : domain.Actividad, transaction ?: Sequelize.Transaction) : Promise<domain.TDataFechaPuntual[]> {
    let salida : domain.TDataFechaPuntual[] = [];

    const fechasAsociadas = await BD.FechaPuntualActividad.findAll({where : { idActividad : actividad.verDatos().idActividad}, transaction});

    if(fechasAsociadas.length > 0) {
        const fechas = await BD.FechaPuntual.findAll({where : { idFecha : fechasAsociadas.map( fa => fa.idFecha)}, transaction });
        salida = fechas.map( f => ({ idFecha : f.idFecha , fecha : new Date(f.fecha) }) );
    }

    return salida;
  }

}