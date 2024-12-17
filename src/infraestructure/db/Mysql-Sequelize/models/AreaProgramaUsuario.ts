import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

export interface AreaProgramaUsuarioAttributes {
  idArea: number;
  idPrograma: number;
  anio : number;
  idUsuario : string;
}

export type AreaProgramaUsuarioPk = "idArea" | "idPrograma" | "anio" ;
export type AreaProgramaUsuarioId = AreaProgramaUsuario[AreaProgramaUsuarioPk];
export type AreaProgramaUsuarioCreationAttributes = AreaProgramaUsuarioAttributes;



export class AreaProgramaUsuario extends Model<AreaProgramaUsuarioAttributes, AreaProgramaUsuarioCreationAttributes> implements AreaProgramaUsuarioAttributes {
  idArea!: number;
  idPrograma!: number;
  anio !: number;
  idUsuario !: string;

 

  static initModel(sequelize: Sequelize.Sequelize): typeof AreaProgramaUsuario {
    return AreaProgramaUsuario.init({
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
    tableName: 'AreaProgramaUsuario',
    timestamps: true,
    paranoid : true
  });
  }
}
