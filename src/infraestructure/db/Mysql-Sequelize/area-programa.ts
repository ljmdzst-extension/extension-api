import { Area, AreaId } from "./models/Area";
import { Programa, ProgramaId } from "./models/Programa";
import * as Sequelize from 'sequelize';

import { BD } from './config/dbConfig';

export default class MAreaPrograma {
   constructor(){}
    
   static async buscarAreas( listaIds : AreaId[], transaction ?: Sequelize.Transaction ) : Promise<Area[]> {
    let salida : Area[] = [];

    salida = await BD.Area.findAll({where : { idArea : listaIds }, transaction });



    return salida;
  }

  static async buscarProgramas( listaIds : ProgramaId[], transaction ?: Sequelize.Transaction ) : Promise<Programa[]> {
    let salida : Programa[] = [];

    salida = await BD.Programa.findAll({where : { idPrograma : listaIds }, transaction });


    return salida;
  }

}  