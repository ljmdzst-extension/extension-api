import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { RolIntegrante, RolIntegranteId } from './RolIntegrante';

export interface RolAttributes {
  idRolIntegrante: number;
  nom: string;
}

export type RolPk = "idRolIntegrante";
export type RolId = Rol[RolPk];
export type RolCreationAttributes = RolAttributes;

const CONSTRAINTS_ATTRIBUTES = {
  idRolIntegrante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}
const CONSTRAINTS_OPTIONS = (sequelize : Sequelize.Sequelize) => ({
  sequelize : sequelize,
  tableName: 'Rol',
  timestamps: false
})
export class Rol extends Model<RolAttributes, RolCreationAttributes> implements RolAttributes {
  idRolIntegrante!: number;
  nom!: string;

  
  
  static initModel(sequelize: Sequelize.Sequelize): typeof Rol {
    return Rol.init(CONSTRAINTS_ATTRIBUTES, CONSTRAINTS_OPTIONS(sequelize) );
  }
}
