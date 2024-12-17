import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TipoRelacionAttributes {
  idTipoRelacion: number;
  nom: string;
}

export type TipoRelacionPk = "idTipoRelacion";
export type TipoRelacionId = TipoRelacion[TipoRelacionPk];
export type TipoRelacionOptionalAttributes = "idTipoRelacion";
export type TipoRelacionCreationAttributes = Optional<TipoRelacionAttributes, TipoRelacionOptionalAttributes>;
export type TTipoRelacion = TipoRelacionAttributes;

const CONSTRAINT_ATTRIBUTES = {
  idTipoRelacion: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}
const CONSTRAINT_OPTIONS = (sequelize : Sequelize.Sequelize) =>({
  sequelize,
  tableName: 'TipoRelacion',
  timestamps: false
})
export class TipoRelacion extends Model<TipoRelacionAttributes, TipoRelacionCreationAttributes> implements TipoRelacionAttributes {
  idTipoRelacion!: number;
  nom!: string;



  static initModel(sequelize: Sequelize.Sequelize): typeof TipoRelacion {
    return TipoRelacion.init(CONSTRAINT_ATTRIBUTES,CONSTRAINT_OPTIONS(sequelize) );
  }
}
