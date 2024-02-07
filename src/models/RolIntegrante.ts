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

  // RolIntegrante belongsTo Integrante via nroDoc
  nroDocIntegrante!: Integrante;
  getNroDocIntegrante!: Sequelize.BelongsToGetAssociationMixin<Integrante>;
  setNroDocIntegrante!: Sequelize.BelongsToSetAssociationMixin<Integrante, IntegranteId>;
  createNroDocIntegrante!: Sequelize.BelongsToCreateAssociationMixin<Integrante>;
  // RolIntegrante belongsTo Integrante via codigoPropuesta
  codigoPropuestaIntegrante!: Integrante;
  getCodigoPropuestaIntegrante!: Sequelize.BelongsToGetAssociationMixin<Integrante>;
  setCodigoPropuestaIntegrante!: Sequelize.BelongsToSetAssociationMixin<Integrante, IntegranteId>;
  createCodigoPropuestaIntegrante!: Sequelize.BelongsToCreateAssociationMixin<Integrante>;
  // RolIntegrante belongsTo Rol via idRolIntegrante
  idRolIntegranteRol!: Rol;
  getIdRolIntegranteRol!: Sequelize.BelongsToGetAssociationMixin<Rol>;
  setIdRolIntegranteRol!: Sequelize.BelongsToSetAssociationMixin<Rol, RolId>;
  createIdRolIntegranteRol!: Sequelize.BelongsToCreateAssociationMixin<Rol>;

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
