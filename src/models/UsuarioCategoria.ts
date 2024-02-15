import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Categoria, CategoriaId } from './Categoria';
import type { Usuario, UsuarioId } from './Usuario';

export interface UsuarioCategoriaAttributes {
  idCategoria: number;
  idUsuario: string;
}

export type UsuarioCategoriaPk = "idCategoria" | "idUsuario";
export type UsuarioCategoriaId = UsuarioCategoria[UsuarioCategoriaPk];
export type UsuarioCategoriaCreationAttributes = UsuarioCategoriaAttributes;

export class UsuarioCategoria extends Model<UsuarioCategoriaAttributes, UsuarioCategoriaCreationAttributes> implements UsuarioCategoriaAttributes {
  idCategoria!: number;
  idUsuario!: string;

  // UsuarioCategoria belongsTo Categoria via idCategoria
  idCategoriaCategorium!: Categoria;
  getIdCategoriaCategorium!: Sequelize.BelongsToGetAssociationMixin<Categoria>;
  setIdCategoriaCategorium!: Sequelize.BelongsToSetAssociationMixin<Categoria, CategoriaId>;
  createIdCategoriaCategorium!: Sequelize.BelongsToCreateAssociationMixin<Categoria>;
  // UsuarioCategoria belongsTo Usuario via idUsuario
  idUsuarioUsuario!: Usuario;
  getIdUsuarioUsuario!: Sequelize.BelongsToGetAssociationMixin<Usuario>;
  setIdUsuarioUsuario!: Sequelize.BelongsToSetAssociationMixin<Usuario, UsuarioId>;
  createIdUsuarioUsuario!: Sequelize.BelongsToCreateAssociationMixin<Usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UsuarioCategoria {
    return UsuarioCategoria.init({
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Categoria',
        key: 'idCategoria'
      }
    },
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Usuario',
        key: 'idUsuario'
      }
    }
  }, {
    sequelize,
    tableName: 'UsuarioCategoria',
    timestamps: false
  });
  }
}
