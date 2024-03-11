import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { Programa, ProgramaId } from './Programa';

export interface AreaAttributes {
  idArea: number;
  nom: string;
}

export type AreaPk = "idArea";
export type AreaId = Area[AreaPk];
export type AreaOptionalAttributes = "idArea";
export type AreaCreationAttributes = Optional<AreaAttributes, AreaOptionalAttributes>;

const AREA_ATTRIBUTES = {
  idArea: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(150),
    allowNull: false
  }
}

export class Area extends Model<AreaAttributes, AreaCreationAttributes> implements AreaAttributes {
  idArea!: number;
  nom!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Area {
    return Area.init(AREA_ATTRIBUTES, {
    sequelize,
    tableName: 'Area',
    timestamps: false
  });
  }
}
