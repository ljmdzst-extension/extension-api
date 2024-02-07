import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Categoria, CategoriaId } from './Categoria';
import type { Permiso, PermisoId } from './Permiso';

export interface PermisoCategoriaAttributes {
  idPermiso: number;
  idCategoria: number;
}

export type PermisoCategoriaPk = "idPermiso" | "idCategoria";
export type PermisoCategoriaId = PermisoCategoria[PermisoCategoriaPk];
export type PermisoCategoriaCreationAttributes = PermisoCategoriaAttributes;

export class PermisoCategoria extends Model<PermisoCategoriaAttributes, PermisoCategoriaCreationAttributes> implements PermisoCategoriaAttributes {
  idPermiso!: number;
  idCategoria!: number;

  // PermisoCategoria belongsTo Categoria via idCategoria
  idCategoriaCategorium!: Categoria;
  getIdCategoriaCategorium!: Sequelize.BelongsToGetAssociationMixin<Categoria>;
  setIdCategoriaCategorium!: Sequelize.BelongsToSetAssociationMixin<Categoria, CategoriaId>;
  createIdCategoriaCategorium!: Sequelize.BelongsToCreateAssociationMixin<Categoria>;
  // PermisoCategoria belongsTo Permiso via idPermiso
  idPermisoPermiso!: Permiso;
  getIdPermisoPermiso!: Sequelize.BelongsToGetAssociationMixin<Permiso>;
  setIdPermisoPermiso!: Sequelize.BelongsToSetAssociationMixin<Permiso, PermisoId>;
  createIdPermisoPermiso!: Sequelize.BelongsToCreateAssociationMixin<Permiso>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PermisoCategoria {
    return PermisoCategoria.init({
    idPermiso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Permiso',
        key: 'idPermiso'
      }
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Categoria',
        key: 'idCategoria'
      }
    }
  }, {
    sequelize,
    tableName: 'PermisoCategoria',
    timestamps: false
  });
  }
}
