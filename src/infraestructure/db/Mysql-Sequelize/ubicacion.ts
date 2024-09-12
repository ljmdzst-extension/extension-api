import * as Sequelize from 'sequelize'
import { domain } from '../../../domain';
import { BD } from './config/dbConfig';

export default class MUbicacion {

      
  public static async buscarPorActividad( actividad : domain.Actividad, transaction ?: Sequelize.Transaction) : Promise<domain.TDataUbicacion[]> {
    let salida : domain.TDataUbicacion[] = [];

    const ubicacionesAsociados = await BD.UbicacionActividad.findAll({where : { idActividad : actividad.verDatos().idActividad}, transaction});

    if(ubicacionesAsociados.length > 0) {
        const ids = ubicacionesAsociados.map( ua => ua.idUbicacion);
        salida = (await BD.Ubicacion.findAll({where : { idUbicacion : ids}, transaction})).map( u => u.dataValues);
    }

    return salida;
  }

}