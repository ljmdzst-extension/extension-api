import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Usuario, UsuarioId } from './Usuario';
import type { Categoria, CategoriaId } from './Categoria';

export interface CategoriaUsuarioAttributes {
  idUsuario: string;
  idCategoria: number;

}

export type CategoriaUsuarioPk = "idUsuario" | "idCategoria" ;
export type CategoriaUsuarioId = CategoriaUsuario[CategoriaUsuarioPk];
export type CategoriaUsuarioCreationAttributes = CategoriaUsuarioAttributes;

export class CategoriaUsuario extends Model<CategoriaUsuarioAttributes, CategoriaUsuarioCreationAttributes> implements CategoriaUsuarioAttributes {
  idUsuario!: string;
  idCategoria!: number;

  // CategoriaUsuario belongsTo Usuario via idUsuario
  usuario!: Usuario;
  getUsuario!: Sequelize.BelongsToGetAssociationMixin<Usuario>;
  setUsuario!: Sequelize.BelongsToSetAssociationMixin<Usuario, UsuarioId>;
  createUsuario!: Sequelize.BelongsToCreateAssociationMixin<Usuario>;

  // CategoriaUsuario belongsTo Categoria via idCategoria
  categoria!: Categoria;
  getCategoria!: Sequelize.BelongsToGetAssociationMixin<Categoria>;
  setCategoria!: Sequelize.BelongsToSetAssociationMixin<Categoria, CategoriaId>;
  createCategoria!: Sequelize.BelongsToCreateAssociationMixin<Categoria>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CategoriaUsuario {
    return CategoriaUsuario.init({
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Usuario',
        key: 'idUsuario'
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
    tableName: 'CategoriaUsuario',
    timestamps: true,
    paranoid : true
  });
  }
}
