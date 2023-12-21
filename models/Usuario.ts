import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface UsuarioAttributes {
  idUsuario: string;
  nroDoc: string;
  email: string;
  pass: string;
  idUnidadAcademica: number;
  pendiente: number;
}

export type UsuarioPk = "idUsuario";
export type UsuarioId = Usuario[UsuarioPk];
export type UsuarioOptionalAttributes = "idUsuario" | "pendiente" | "nroDoc" | "email" | "pass" | "idUnidadAcademica";
export type UsuarioCreationAttributes = Optional<UsuarioAttributes, UsuarioOptionalAttributes>;

export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  idUsuario!: string;
  nroDoc!: string;
  email!: string;
  pass!: string;
  idUnidadAcademica!: number;
  pendiente!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Usuario {
    return Usuario.init({
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idUnidadAcademica: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pendiente: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'Usuario',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
      {
        name: "fkUsuarioPersona1_idx",
        using: "BTREE",
        fields: [
          { name: "nroDoc" },
        ]
      },
    ]
  });
  }
}
