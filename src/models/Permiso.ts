import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { UsuarioCategoria, UsuarioCategoriaId } from './UsuarioCategoria';

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

  // Permiso hasMany UsuarioCategoria via idPermiso
  UsuarioCategoria!: UsuarioCategoria[];
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
