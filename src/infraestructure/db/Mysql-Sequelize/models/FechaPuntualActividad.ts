import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

export interface FechaPuntualActividadAttributes {
  idFecha: number;
  idActividad: number;
}

export type FechaPuntualActividadPk = "idFecha" | "idActividad";
export type FechaPuntualActividadId = FechaPuntualActividad[FechaPuntualActividadPk];
export type FechaPuntualActividadCreationAttributes = FechaPuntualActividadAttributes;

export class FechaPuntualActividad extends Model<FechaPuntualActividadAttributes, FechaPuntualActividadCreationAttributes> implements FechaPuntualActividadAttributes {
  idFecha!: number;
  idActividad!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof FechaPuntualActividad {
    return FechaPuntualActividad.init({
    idFecha: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'FechaPuntual',
        key: 'idFecha'
      }
    },
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Actividad',
        key: 'idActividad'
      }
    }
  }, {
    sequelize,
    tableName: 'FechaPuntualActividad',
    timestamps: true,
    paranoid: true
  });
  }
}
