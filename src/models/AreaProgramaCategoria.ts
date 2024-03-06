import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

export interface AreaProgramaCategoriaAttributes {
  idArea: number;
  idPrograma: number;
  anio : number;
  idCategoria: string;
}

export type AreaProgramaCategoriaPk = "idArea" | "idPrograma" | "anio" | "idCategoria";
export type AreaProgramaCategoriaId = AreaProgramaCategoria[AreaProgramaCategoriaPk];
export type AreaProgramaCategoriaCreationAttributes = AreaProgramaCategoriaAttributes;

export class AreaProgramaCategoria extends Model<AreaProgramaCategoriaAttributes, AreaProgramaCategoriaCreationAttributes> implements AreaProgramaCategoriaAttributes {
  idArea!: number;
  idPrograma!: number;
  anio !: number;
  idCategoria !: string;

  


  static initModel(sequelize: Sequelize.Sequelize): typeof AreaProgramaCategoria {
    return AreaProgramaCategoria.init({
    idArea: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Area',
        key: 'idArea'
      }
    },
    idPrograma: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Programa',
            key: 'idPrograma'
        }
    },
    anio : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Area',
          key: 'anio'
        }
    },
 
    idCategoria: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Categoria',
          key: 'idCategoria'
        }
      }
  }, {
    sequelize,
    tableName: 'AreaProgramaCategoria',
    timestamps: false
  });
  }
}
