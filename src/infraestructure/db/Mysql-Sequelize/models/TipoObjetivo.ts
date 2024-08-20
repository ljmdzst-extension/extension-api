import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Objetivo, ObjetivoId } from './Objetivo';
import { INVALIDO } from '../infraestructure/Express/logs/validaciones';
import { ERROR } from '../infraestructure/Express/logs/errores';

export interface TipoObjetivoAttributes {
  idTipoObj: number;
  nom: string;
}

export type TipoObjetivoPk = "idTipoObj";
export type TipoObjetivoId = TipoObjetivo[TipoObjetivoPk];
export type TipoObjetivoOptionalAttributes = "idTipoObj";
export type TipoObjetivoCreationAttributes = Optional<TipoObjetivoAttributes, TipoObjetivoOptionalAttributes>;
export type TTipoObjetivo = TipoObjetivoAttributes;
const CONSTRAINT_OPTIONS = (sequelize : Sequelize.Sequelize) => ({
  sequelize,
  tableName: 'TipoObjetivo',
  timestamps: false
});

const CONSTRAINT_ATTRIBUTES = {
  idTipoObj: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
};

export class TipoObjetivo extends Model<TipoObjetivoAttributes, TipoObjetivoCreationAttributes> implements TipoObjetivoAttributes {
  idTipoObj!: number;
  nom!: string;

  public verDatos () : TTipoObjetivo {
      return {
        idTipoObj : this.idTipoObj,
        nom : this.nom
      };
  }

  public static async validar(data : TipoObjetivoAttributes, transaction ?: Sequelize.Transaction) : Promise<void> {
      if(data.idTipoObj < 1 ) throw INVALIDO.ID_TIPO_OBJ; 
      if(! await this.findByPk(data.idTipoObj,{transaction}) ) throw INVALIDO.ID_TIPO_OBJ;
    }

  public static async verListaBD(transaction?: Sequelize.Transaction | undefined): Promise<TTipoObjetivo[]> { 
      let salida : TTipoObjetivo[] = [];

      salida = await this.findAll({transaction});

      return salida;
  } ;
  public static async buscarPorIDBD(id: TipoObjetivoId, transaction?: Sequelize.Transaction | undefined): Promise<TipoObjetivo> {
      const bdTipoObjetivo = await this.findByPk(id,{transaction}) ;

      if(!bdTipoObjetivo ) throw ERROR.TIPO_OBJ_INEXISTENTE;

      return TipoObjetivo.build(bdTipoObjetivo.dataValues) ;   
  }
  
  static initModel(sequelize: Sequelize.Sequelize): typeof TipoObjetivo {
    return TipoObjetivo.init(CONSTRAINT_ATTRIBUTES,CONSTRAINT_OPTIONS(sequelize) );
  }
}
