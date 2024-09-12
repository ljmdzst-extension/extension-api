import * as Sequelize from 'sequelize'
import { domain } from '../../../domain';
import { BD } from './config/dbConfig';

export default class MObjetivo {

      
  public static async buscarPorActividad( actividad : domain.Actividad, transaction ?: Sequelize.Transaction) : Promise<domain.TDataObjetivo[]> {
    let salida : domain.TDataObjetivo[] = [];

    const objetivosAsociados = await BD.ObjetivoActividad.findAll({where : { idActividad : actividad.verDatos().idActividad}, transaction});

    if(objetivosAsociados.length > 0) {
        const ids = objetivosAsociados.map( oa => oa.idObjetivo);
        salida = (await BD.Objetivo.findAll({where : { idObjetivo : ids}, transaction})).map( u => u.dataValues);
    }

    return salida;
  }

}