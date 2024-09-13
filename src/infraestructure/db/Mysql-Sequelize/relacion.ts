import * as Sequelize from 'sequelize'
import { domain } from '../../../domain';
import { BD } from './config/dbConfig';
import { RelacionId } from './models/Relacion';

export default class MRelacion {

      
  public static async buscarPorActividad( actividad : domain.Actividad, transaction ?: Sequelize.Transaction) : Promise<domain.TDataRelacion[]> {
    let salida : domain.TDataRelacion[] = [];

    const RelacionsAsociados = await BD.RelacionActividad.findAll({where : { idActividad : actividad.verDatos().idActividad}, transaction});

    if(RelacionsAsociados.length > 0) {
        const ids = RelacionsAsociados.map( oa => oa.idRelacion);
        salida = (await BD.Relacion.findAll({where : { idRelacion : ids}, transaction})).map( u => u.dataValues);
    }

    return salida;
  }

  
  public static async buscarPorListaIds( ids : RelacionId[] , transaction ?: Sequelize.Transaction) : Promise<domain.TDataRelacion[]> {
    let salida: domain.TDataRelacion[] = [];
    const Relacions = await BD.Relacion.findAll({where : { idRelacion : ids}, transaction});
    if(Relacions.length > 0){
      const cTiposRelacions = await BD.TipoRelacion.findAll({transaction});

      salida = Relacions.map( r => ({ ...r.dataValues, tipoRelacion : cTiposRelacions.find( tr => tr.idTipoRelacion === r.idTipoRelacion )?.dataValues }));
    }

    return salida ;
  }

  public static async buscarTodos(  transaction ?: Sequelize.Transaction ): Promise<domain.Relacion[]>  {
    let salida: domain.Relacion[] = [];
    const cTiposRelacions = await BD.TipoRelacion.findAll({transaction});
    const Relacions = await BD.Relacion.findAll({ transaction});
    if(Relacions.length > 0){
      Relacions.forEach( r => {
        const to = cTiposRelacions.find( tr => tr.idTipoRelacion === r.idTipoRelacion );
        if(to) {
          salida.push(new domain.Relacion( r.dataValues,new domain.TipoRelacion(to.dataValues) ) )
        }
      })
    }

    return salida ;
  }

}