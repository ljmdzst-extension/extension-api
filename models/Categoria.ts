import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCategoria" },
        ]
      },
    ]
  });
  }
}
