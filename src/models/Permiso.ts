import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Categoria, CategoriaId } from './Categoria';
import type { PermisoCategoria, PermisoCategoriaId } from './PermisoCategoria';

export interface PermisoAttributes {
  idPermiso: number;
  nombre: string;
}

export type PermisoPk = "idPermiso";
export type PermisoId = Permiso[PermisoPk];
export type PermisoOptionalAttributes = "idPermiso";
export type PermisoCreationAttributes = Optional<PermisoAttributes, PermisoOptionalAttributes>;

export class Permiso extends Model<PermisoAttributes, PermisoCreationAttributes> implements PermisoAttributes {
  idPermiso!: number;
  nombre!: string;

  // Permiso belongsToMany Categoria via idPermiso and idCategoria
  idCategoriaCategoria!: Categoria[];
  getIdCategoriaCategoria!: Sequelize.BelongsToManyGetAssociationsMixin<Categoria>;
  setIdCategoriaCategoria!: Sequelize.BelongsToManySetAssociationsMixin<Categoria, CategoriaId>;
  addIdCategoriaCategorium!: Sequelize.BelongsToManyAddAssociationMixin<Categoria, CategoriaId>;
  addIdCategoriaCategoria!: Sequelize.BelongsToManyAddAssociationsMixin<Categoria, CategoriaId>;
  createIdCategoriaCategorium!: Sequelize.BelongsToManyCreateAssociationMixin<Categoria>;
  removeIdCategoriaCategorium!: Sequelize.BelongsToManyRemoveAssociationMixin<Categoria, CategoriaId>;
  removeIdCategoriaCategoria!: Sequelize.BelongsToManyRemoveAssociationsMixin<Categoria, CategoriaId>;
  hasIdCategoriaCategorium!: Sequelize.BelongsToManyHasAssociationMixin<Categoria, CategoriaId>;
  hasIdCategoriaCategoria!: Sequelize.BelongsToManyHasAssociationsMixin<Categoria, CategoriaId>;
  countIdCategoriaCategoria!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Permiso hasMany PermisoCategoria via idPermiso
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Permiso {
    return Permiso.init({
    idPermiso: {
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
    tableName: 'Permiso',
    timestamps: false
  });
  }
}
