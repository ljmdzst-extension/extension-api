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
  idCategoriaCategoria!: Categoria;
  getIdCategoriaCategoria!: Sequelize.BelongsToGetAssociationMixin<Categoria>;
  setIdCategoriaCategoria!: Sequelize.BelongsToSetAssociationMixin<Categoria, CategoriaId>;
  createIdCategoriaCategoria!: Sequelize.BelongsToCreateAssociationMixin<Categoria>;
  // PermisoCategoria belongsTo Permiso via idPermiso
  permiso!: Permiso;
  getPermiso!: Sequelize.BelongsToGetAssociationMixin<Permiso>;
  setPermiso!: Sequelize.BelongsToSetAssociationMixin<Permiso, PermisoId>;
  createPermiso!: Sequelize.BelongsToCreateAssociationMixin<Permiso>;

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
