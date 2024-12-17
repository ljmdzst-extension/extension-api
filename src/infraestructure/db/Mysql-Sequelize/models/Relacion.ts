import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { TipoRelacionId } from './TipoRelacion';

export interface RelacionAttributes {
  idRelacion: number;
  nom: string;
  idTipoRelacion: TipoRelacionId;
}

export type RelacionPk = "idRelacion";
export type RelacionId = Relacion[RelacionPk];
export type RelacionOptionalAttributes = "idRelacion";
export type RelacionCreationAttributes = Optional<RelacionAttributes, RelacionOptionalAttributes>;



const CONSTRAINT_ATTRIBUTES = {
  idRelacion: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  idTipoRelacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'TipoRelacion',
      key: 'idTipoRelacion'
    }
  }
}
const CONSTRAINT_OPTIONS = ( sequelize : Sequelize.Sequelize)=>({
  sequelize,
  tableName: 'Relacion',
  timestamps: false
})
export class Relacion extends Model<RelacionAttributes, RelacionCreationAttributes> implements RelacionAttributes {
  idRelacion!: number;
  nom!: string;
  idTipoRelacion!: number;

 
  static initModel(sequelize: Sequelize.Sequelize): typeof Relacion {
    return Relacion.init(CONSTRAINT_ATTRIBUTES, CONSTRAINT_OPTIONS(sequelize));
  }
}
