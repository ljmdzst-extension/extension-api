import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Integrante, IntegranteId } from './Integrante';
import type { Rol, RolId } from './Rol';

export interface RolIntegranteAttributes {
  nroDoc: string;
  codigoPropuesta: string;
  idRolIntegrante: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type RolIntegrantePk = "nroDoc" | "codigoPropuesta" | "idRolIntegrante";
export type RolIntegranteId = RolIntegrante[RolIntegrantePk];
export type RolIntegranteOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type RolIntegranteCreationAttributes = Optional<RolIntegranteAttributes, RolIntegranteOptionalAttributes>;

export class RolIntegrante extends Model<RolIntegranteAttributes, RolIntegranteCreationAttributes> implements RolIntegranteAttributes {
  nroDoc!: string;
  codigoPropuesta!: string;
  idRolIntegrante!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof RolIntegrante {
    return RolIntegrante.init({
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
    },
    idRolIntegrante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Rol',
        key: 'idRolIntegrante'
      }
    },
    createdAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    updatedAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    deletedAt : {
      type : DataTypes.DATE,
      allowNull : true
    }
  }, {
    sequelize,
    tableName: 'RolIntegrante',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nroDoc" },
          { name: "codigoPropuesta" },
          { name: "idRolIntegrante" },
        ]
      },
      {
        name: "fk_PropuestaIntegranteRol_Rol1_idx",
        using: "BTREE",
        fields: [
          { name: "idRolIntegrante" },
        ]
      },
      {
        name: "fk_RolIntegrante_Integrante1_idx",
        using: "BTREE",
        fields: [
          { name: "nroDoc" },
          { name: "codigoPropuesta" },
        ]
      },
    ]
  });
  }
}
