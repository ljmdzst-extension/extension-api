import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { TipoObjetivo, TipoObjetivoAttributes } from './TipoObjetivo';
import { domain } from '../../../../domain';

export interface ObjetivoAttributes {
  idObjetivo: number;
  nom: string;
  detalle?: string;
  tipoObjId: number;
}

export type ObjetivoPk = "idObjetivo";
export type ObjetivoId = Objetivo[ObjetivoPk];
export type ObjetivoOptionalAttributes = "idObjetivo" | "detalle";
export type ObjetivoCreationAttributes = Optional<ObjetivoAttributes, ObjetivoOptionalAttributes>;

export type TObjetivo = {
  idObjetivo : ObjetivoId,
  nom : string,
  tipoObjetivo : TipoObjetivoAttributes
}

const CONSTRAINT_ATTRIBUTES = {
  idObjetivo: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  detalle: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  tipoObjId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'TipoObjetivo',
      key: 'idTipoObj'
    },
    field: 'tipo_obj_id'
  }
}

const CONSTRAINT_OPTIONS = (sequelize : Sequelize.Sequelize)=>({
  sequelize,
  tableName: 'Objetivo',
  timestamps: false
})
export class Objetivo extends Model<ObjetivoAttributes, ObjetivoCreationAttributes> implements ObjetivoAttributes {
  idObjetivo!: number;
  nom!: string;
  detalle?: string;
  tipoObjId!: number;

  public static async buscarPorListaIds( ids : ObjetivoId[] , transaction ?: Sequelize.Transaction) : Promise<domain.TDataObjetivo[]> {
    let salida: domain.TDataObjetivo[] = [];
    const objetivos = await Objetivo.findAll({where : { idObjetivo : ids}, transaction});
    if(objetivos.length > 0){
      const cTiposObjetivos = await TipoObjetivo.findAll({transaction});

      salida = objetivos.map( o => ({ ...o.dataValues, tipoObjetivo : cTiposObjetivos.find( to => to.idTipoObj === o.tipoObjId )?.dataValues }));
    }

    return salida ;
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof Objetivo {
    return Objetivo.init(CONSTRAINT_ATTRIBUTES,CONSTRAINT_OPTIONS(sequelize) );
  }
}
