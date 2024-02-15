import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Permiso, PermisoId } from './Permiso';
import type { PermisoCategoria, PermisoCategoriaId } from './PermisoCategoria';
import type { Usuario, UsuarioId } from './Usuario';
import type { UsuarioCategoria, UsuarioCategoriaId } from './UsuarioCategoria';

export interface CategoriaAttributes {
  idCategoria: number;
  nombre: string;
}

export type CategoriaPk = "idCategoria";
export type CategoriaId = Categoria[CategoriaPk];
export type CategoriaOptionalAttributes = "idCategoria";
export type CategoriaCreationAttributes = Optional<CategoriaAttributes, CategoriaOptionalAttributes>;

export class Categoria extends Model<CategoriaAttributes, CategoriaCreationAttributes> implements CategoriaAttributes {
  idCategoria!: number;
  nombre!: string;

  // Categoria belongsToMany Permiso via idCategoria and idPermiso
  idPermisoPermisos!: Permiso[];
  getIdPermisoPermisos!: Sequelize.BelongsToManyGetAssociationsMixin<Permiso>;
  setIdPermisoPermisos!: Sequelize.BelongsToManySetAssociationsMixin<Permiso, PermisoId>;
  addIdPermisoPermiso!: Sequelize.BelongsToManyAddAssociationMixin<Permiso, PermisoId>;
  addIdPermisoPermisos!: Sequelize.BelongsToManyAddAssociationsMixin<Permiso, PermisoId>;
  createIdPermisoPermiso!: Sequelize.BelongsToManyCreateAssociationMixin<Permiso>;
  removeIdPermisoPermiso!: Sequelize.BelongsToManyRemoveAssociationMixin<Permiso, PermisoId>;
  removeIdPermisoPermisos!: Sequelize.BelongsToManyRemoveAssociationsMixin<Permiso, PermisoId>;
  hasIdPermisoPermiso!: Sequelize.BelongsToManyHasAssociationMixin<Permiso, PermisoId>;
  hasIdPermisoPermisos!: Sequelize.BelongsToManyHasAssociationsMixin<Permiso, PermisoId>;
  countIdPermisoPermisos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Categoria hasMany PermisoCategoria via idCategoria
  permisoCategoria!: PermisoCategoria[];
  getPermisoCategoria!: Sequelize.HasManyGetAssociationsMixin<PermisoCategoria>;
  setPermisoCategoria!: Sequelize.HasManySetAssociationsMixin<PermisoCategoria, PermisoCategoriaId>;
  addPermisoCategorium!: Sequelize.HasManyAddAssociationMixin<PermisoCategoria, PermisoCategoriaId>;
  addPermisoCategoria!: Sequelize.HasManyAddAssociationsMixin<PermisoCategoria, PermisoCategoriaId>;
  createPermisoCategorium!: Sequelize.HasManyCreateAssociationMixin<PermisoCategoria>;
  removePermisoCategorium!: Sequelize.HasManyRemoveAssociationMixin<PermisoCategoria, PermisoCategoriaId>;
  removePermisoCategoria!: Sequelize.HasManyRemoveAssociationsMixin<PermisoCategoria, PermisoCategoriaId>;
  hasPermisoCategorium!: Sequelize.HasManyHasAssociationMixin<PermisoCategoria, PermisoCategoriaId>;
  hasPermisoCategoria!: Sequelize.HasManyHasAssociationsMixin<PermisoCategoria, PermisoCategoriaId>;
  countPermisoCategoria!: Sequelize.HasManyCountAssociationsMixin;
  // Categoria belongsToMany Usuario via idCategoria and idUsuario
  idUsuarioUsuarioUsuarioCategoria!: Usuario[];
  getIdUsuarioUsuarioUsuarioCategoria!: Sequelize.BelongsToManyGetAssociationsMixin<Usuario>;
  setIdUsuarioUsuarioUsuarioCategoria!: Sequelize.BelongsToManySetAssociationsMixin<Usuario, UsuarioId>;
  addIdUsuarioUsuarioUsuarioCategorium!: Sequelize.BelongsToManyAddAssociationMixin<Usuario, UsuarioId>;
  addIdUsuarioUsuarioUsuarioCategoria!: Sequelize.BelongsToManyAddAssociationsMixin<Usuario, UsuarioId>;
  createIdUsuarioUsuarioUsuarioCategorium!: Sequelize.BelongsToManyCreateAssociationMixin<Usuario>;
  removeIdUsuarioUsuarioUsuarioCategorium!: Sequelize.BelongsToManyRemoveAssociationMixin<Usuario, UsuarioId>;
  removeIdUsuarioUsuarioUsuarioCategoria!: Sequelize.BelongsToManyRemoveAssociationsMixin<Usuario, UsuarioId>;
  hasIdUsuarioUsuarioUsuarioCategorium!: Sequelize.BelongsToManyHasAssociationMixin<Usuario, UsuarioId>;
  hasIdUsuarioUsuarioUsuarioCategoria!: Sequelize.BelongsToManyHasAssociationsMixin<Usuario, UsuarioId>;
  countIdUsuarioUsuarioUsuarioCategoria!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Categoria hasMany UsuarioCategoria via idCategoria
  usuarioCategoria!: UsuarioCategoria[];
  getUsuarioCategoria!: Sequelize.HasManyGetAssociationsMixin<UsuarioCategoria>;
  setUsuarioCategoria!: Sequelize.HasManySetAssociationsMixin<UsuarioCategoria, UsuarioCategoriaId>;
  addUsuarioCategorium!: Sequelize.HasManyAddAssociationMixin<UsuarioCategoria, UsuarioCategoriaId>;
  addUsuarioCategoria!: Sequelize.HasManyAddAssociationsMixin<UsuarioCategoria, UsuarioCategoriaId>;
  createUsuarioCategorium!: Sequelize.HasManyCreateAssociationMixin<UsuarioCategoria>;
  removeUsuarioCategorium!: Sequelize.HasManyRemoveAssociationMixin<UsuarioCategoria, UsuarioCategoriaId>;
  removeUsuarioCategoria!: Sequelize.HasManyRemoveAssociationsMixin<UsuarioCategoria, UsuarioCategoriaId>;
  hasUsuarioCategorium!: Sequelize.HasManyHasAssociationMixin<UsuarioCategoria, UsuarioCategoriaId>;
  hasUsuarioCategoria!: Sequelize.HasManyHasAssociationsMixin<UsuarioCategoria, UsuarioCategoriaId>;
  countUsuarioCategoria!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Categoria {
    return Categoria.init({
    idCategoria: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Categoria',
    timestamps: false
  });
  }
}
