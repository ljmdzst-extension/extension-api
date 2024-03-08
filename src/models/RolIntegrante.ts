import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Integrante, IntegranteId } from './Integrante';
import type { Rol, RolId } from './Rol';

export interface RolIntegranteAttributes {
  idRolIntegrante: number;
  nroDoc: string;
  codigoPropuesta: string;
}

export type RolIntegrantePk = "idRolIntegrante" | "nroDoc" | "codigoPropuesta";
export type RolIntegranteId = RolIntegrante[RolIntegrantePk];
export type RolIntegranteCreationAttributes = RolIntegranteAttributes;

export class RolIntegrante extends Model<RolIntegranteAttributes, RolIntegranteCreationAttributes> implements RolIntegranteAttributes {
  idRolIntegrante!: number;
  nroDoc!: string;
  codigoPropuesta!: string;

  // RolIntegrante belongsTo Integrante via codigoPropuesta
  integrante!: Integrante;
  getIntegrante!: Sequelize.BelongsToGetAssociationMixin<Integrante>;
  setIntegrante!: Sequelize.BelongsToSetAssociationMixin<Integrante, IntegranteId>;
  createIntegrante!: Sequelize.BelongsToCreateAssociationMixin<Integrante>;
  // RolIntegrante belongsTo Rol via idRolIntegrante
  rol!: Rol;
  getRol!: Sequelize.BelongsToGetAssociationMixin<Rol>;
  setRol!: Sequelize.BelongsToSetAssociationMixin<Rol, RolId>;
  createRol!: Sequelize.BelongsToCreateAssociationMixin<Rol>;

  static initModel(sequelize: Sequelize.Sequelize): typeof RolIntegrante {
    return RolIntegrante.init({
    idRolIntegrante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Rol',
        key: 'idRolIntegrante'
      }
    },
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Integrante',
        key: 'nroDoc'
      }
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Integrante',
        key: 'codigoPropuesta'
      }
    }
  }, {
    sequelize,
    tableName: 'RolIntegrante',
    timestamps: true,
    paranoid: true
  });
  }
}
