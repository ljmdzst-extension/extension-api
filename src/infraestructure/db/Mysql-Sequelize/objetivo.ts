import * as Sequelize from 'sequelize'
import { domain } from '../../../domain';
import { BD } from './config/dbConfig';
import { ObjetivoId } from './models/Objetivo';

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

  
  public static async buscarPorListaIds( ids : ObjetivoId[] , transaction ?: Sequelize.Transaction) : Promise<domain.TDataObjetivo[]> {
    let salida: domain.TDataObjetivo[] = [];
    const objetivos = await BD.Objetivo.findAll({where : { idObjetivo : ids}, transaction});
    if(objetivos.length > 0){
      const cTiposObjetivos = await BD.TipoObjetivo.findAll({transaction});

      salida = objetivos.map( o => ({ ...o.dataValues, tipoObjetivo : cTiposObjetivos.find( to => to.idTipoObj === o.tipoObjId )?.dataValues }));
    }

    return salida ;
  }

  public static async buscarTodos(  transaction ?: Sequelize.Transaction ): Promise<domain.Objetivo[]>  {
    let salida: domain.Objetivo[] = [];
    const cTiposObjetivos = await BD.TipoObjetivo.findAll({transaction});
    const objetivos = await BD.Objetivo.findAll({ transaction});
    if(objetivos.length > 0){
      objetivos.forEach( o => {
        const to = cTiposObjetivos.find( to => to.idTipoObj === o.tipoObjId );
        if(to) {
          salida.push(new domain.Objetivo( o.dataValues,new domain.TipoObjetivo(to.dataValues) ) )
        }
      })
    }

    return salida ;
  }

}