import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
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

  // Categoria hasMany UsuarioCategoria via idCategoria
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
