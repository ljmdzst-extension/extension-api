import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Permiso, PermisoId } from './Permiso';
import type { PermisoCategoria, PermisoCategoriaId } from './PermisoCategoria';
import type { Usuario, UsuarioId } from './Usuario';

export interface CategoriaAttributes {
  idCategoria: number;
  nombre: string;
}

export type CategoriaPk = "idCategoria";
export type CategoriaId = Categoria[CategoriaPk];
export type CategoriaOptionalAttributes = "idCategoria";
export type CategoriaCreationAttributes = Optional<CategoriaAttributes, CategoriaOptionalAttributes>;
const CATEGORIA_ATTRIBUTES = {
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
}
export class Categoria extends Model<CategoriaAttributes, CategoriaCreationAttributes> implements CategoriaAttributes {
  idCategoria!: number;
  nombre!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Categoria {
    return Categoria.init(CATEGORIA_ATTRIBUTES, {
    sequelize,
    tableName: 'Categoria',
    timestamps: false
  });
  }
}
