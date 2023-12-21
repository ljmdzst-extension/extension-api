import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UsuarioCategoriaAttributes {
  idCategoria: number;
  idPermiso: number;
  idUsuario: string;
}

export type UsuarioCategoriaPk = "idCategoria" | "idPermiso" | "idUsuario";
export type UsuarioCategoriaId = UsuarioCategoria[UsuarioCategoriaPk];
export type UsuarioCategoriaCreationAttributes = UsuarioCategoriaAttributes;

export class UsuarioCategoria extends Model<UsuarioCategoriaAttributes, UsuarioCategoriaCreationAttributes> implements UsuarioCategoriaAttributes {
  idCategoria!: number;
  idPermiso!: number;
  idUsuario!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof UsuarioCategoria {
    return UsuarioCategoria.init({
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idPermiso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'UsuarioCategoria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCategoria" },
          { name: "idPermiso" },
          { name: "idUsuario" },
        ]
      },
      {
        name: "fkUsuarioCategoriaCategoria1_idx",
        using: "BTREE",
        fields: [
          { name: "idCategoria" },
        ]
      },
      {
        name: "fkUsuarioCategoriaPermiso1_idx",
        using: "BTREE",
        fields: [
          { name: "idPermiso" },
        ]
      },
      {
        name: "fkUsuarioCategoriaUsuario1_idx",
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
    ]
  });
  }
}
