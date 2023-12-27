import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface RolIntegranteAttributes {
  idRolIntegrante: number;
  nroDoc: string;
  codigoPropuesta: string;
  updatedAt ?: Date;
  deletedAt ?: Date;
}

export type RolIntegrantePk = "idRolIntegrante" | "nroDoc" | "codigoPropuesta" |"updatedAt" |"deletedAt";
export type RolIntegranteId = RolIntegrante[RolIntegrantePk];

export class RolIntegrante extends Model<RolIntegranteAttributes> implements RolIntegranteAttributes {
  idRolIntegrante!: number;
  nroDoc!: string;
  codigoPropuesta!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  


  static initModel(sequelize: Sequelize.Sequelize): typeof RolIntegrante {
    return RolIntegrante.init({
    idRolIntegrante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
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
          { name: "idRolIntegrante" },
          { name: "nroDoc" },
          { name: "codigoPropuesta" },
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
        name: "fkRolIntegranteIntegrante1_idx",
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
