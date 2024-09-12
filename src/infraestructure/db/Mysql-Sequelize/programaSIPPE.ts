import * as Sequelize from 'sequelize'
import { domain } from '../../../domain';
import { BD } from './config/dbConfig';

export default class MProgramaSippe {

      
  public static async buscarPorActividad( actividad : domain.Actividad, transaction ?: Sequelize.Transaction) : Promise<domain.TDataProgramaSIPPE[]> {
    let salida : domain.TDataProgramaSIPPE[] = [];

    const programasSippeAsociados = await BD.ProgramaSippeActividad.findAll({where : { idActividad : actividad.verDatos().idActividad}, transaction});

    if(programasSippeAsociados.length > 0) {
        const ids = programasSippeAsociados.map( ua => ua.idProgramaSippe);
        salida = (await BD.ProgramaSippe.findAll({where : { idProgramaSippe : ids}, transaction})).map( u => u.dataValues);
    }

    return salida;
  }

}