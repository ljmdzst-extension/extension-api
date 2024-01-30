import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Categoria, CategoriaId } from './Categoria';
import type { Permiso, PermisoId } from './Permiso';
import type { Usuario, UsuarioId } from './Usuario';

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

  // UsuarioCategoria belongsTo Categoria via idCategoria
  idCategoria_Categorium!: Categoria;
  getIdCategoria_Categorium!: Sequelize.BelongsToGetAssociationMixin<Categoria>;
  setIdCategoria_Categorium!: Sequelize.BelongsToSetAssociationMixin<Categoria, CategoriaId>;
  createIdCategoria_Categorium!: Sequelize.BelongsToCreateAssociationMixin<Categoria>;
  // UsuarioCategoria belongsTo Permiso via idPermiso
  idPermiso_Permiso!: Permiso;
  getIdPermiso_Permiso!: Sequelize.BelongsToGetAssociationMixin<Permiso>;
  setIdPermiso_Permiso!: Sequelize.BelongsToSetAssociationMixin<Permiso, PermisoId>;
  createIdPermiso_Permiso!: Sequelize.BelongsToCreateAssociationMixin<Permiso>;
  // UsuarioCategoria belongsTo Usuario via idUsuario
  idUsuario_Usuario!: Usuario;
  getIdUsuario_Usuario!: Sequelize.BelongsToGetAssociationMixin<Usuario>;
  setIdUsuario_Usuario!: Sequelize.BelongsToSetAssociationMixin<Usuario, UsuarioId>;
  createIdUsuario_Usuario!: Sequelize.BelongsToCreateAssociationMixin<Usuario>;

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
    idPermiso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Permiso',
        key: 'idPermiso'
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
