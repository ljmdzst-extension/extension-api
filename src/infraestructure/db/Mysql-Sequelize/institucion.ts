import * as Sequelize from 'sequelize';
import { domain } from '../../../domain';
import { BD } from './config/dbConfig';

export default class MInstitucion {

    public static async buscarPorActividad(a : domain.Actividad,transaction ?: Sequelize.Transaction) : Promise<domain.TDataInstitucion[]> {
        let salida : domain.TDataInstitucion[] = [];
        const instAsociadas = await BD.InstitucionActividad.findAll({where : {idActividad : a.verDatos().idActividad},transaction});
        if(instAsociadas.length > 0) {
           salida = await BD.Institucion.findAll({where : { idInstitucion : instAsociadas.map( inst => inst.idInstitucion ) }, transaction})
        }
        return salida;
    
      }
}