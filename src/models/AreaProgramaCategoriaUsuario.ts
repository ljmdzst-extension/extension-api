import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

export interface AreaProgramaCategoriaUsuarioAttributes {
  idArea: number;
  idPrograma: number;
  anio : number;
  idCategoria: number;
  idUsuario : string;
}

export type AreaProgramaCategoriaUsuarioPk = "idArea" | "idPrograma" | "anio" | "idCategoria";
export type AreaProgramaCategoriaUsuarioId = AreaProgramaCategoriaUsuario[AreaProgramaCategoriaUsuarioPk];
export type AreaProgramaCategoriaUsuarioCreationAttributes = AreaProgramaCategoriaUsuarioAttributes;

export class AreaProgramaCategoriaUsuario extends Model<AreaProgramaCategoriaUsuarioAttributes, AreaProgramaCategoriaUsuarioCreationAttributes> implements AreaProgramaCategoriaUsuarioAttributes {
  idArea!: number;
  idPrograma!: number;
  anio !: number;
  idCategoria !: number;
  idUsuario !: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof AreaProgramaCategoriaUsuario {
    return AreaProgramaCategoriaUsuario.init({
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
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'CategoriaUsuario',
          key: 'idCategoria'
        }
      },
      idUsuario : {
        type : DataTypes.STRING(255),
        allowNull : false,
        primaryKey : true,
        references : {
          model : `CategoriaUsuario`,
          key : `idUsuario`
        }
      }
  }, {
    sequelize,
    tableName: 'AreaProgramaCategoriaUsuario',
    timestamps: true,
    paranoid : true
  });
  }
}
