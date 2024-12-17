import * as Sequelize from 'sequelize';
import { DataTypes, Model,  } from 'sequelize';


export interface AreaProgramaAttributes {
  idArea: number;
  idPrograma: number;
  anio : number;
}

export type AreaProgramaPk = "idArea" | "idPrograma" | "anio";
export type AreaProgramaId = AreaPrograma[AreaProgramaPk];
export type AreaProgramaCreationAttributes = AreaProgramaAttributes;

type T_ANIO = number;

export class AreaPrograma extends Model<AreaProgramaAttributes, AreaProgramaCreationAttributes> implements AreaProgramaAttributes {
  idArea!: number;
  idPrograma!: number;
  anio !: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof AreaPrograma {
    return AreaPrograma.init({
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
    }
  }, {
    sequelize,
    tableName: 'AreaPrograma',
    timestamps: false
  });
  }
}
