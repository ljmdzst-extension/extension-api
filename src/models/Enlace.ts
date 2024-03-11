import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';

export interface EnlaceAttributes {
  idEnlace: number;
  desc: string;
  link: string;
  idActividad: number;
}

export type EnlacePk = "idEnlace";
export type EnlaceId = Enlace[EnlacePk];
export type EnlaceOptionalAttributes = "idEnlace" ;
export type EnlaceCreationAttributes = Optional<EnlaceAttributes, EnlaceOptionalAttributes>;

const ENLACE_ATTRIBUTES = {
  idEnlace: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  desc: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  link: {
    type: DataTypes.STRING(2083),
    allowNull: false
  },
  idActividad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Actividad',
      key: 'idActividad'
    }
  }
}

export class Enlace extends Model<EnlaceAttributes, EnlaceCreationAttributes> implements EnlaceAttributes {
  idEnlace!: number;
  desc!: string;
  link!: string;
  idActividad!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Enlace {
    return Enlace.init(ENLACE_ATTRIBUTES, {
    sequelize,
    tableName: 'Enlace',
    timestamps: true,
    paranoid: true
  });
  }
}
