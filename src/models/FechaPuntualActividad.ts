import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { FechaPuntual, FechaPuntualId } from './FechaPuntual';

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

  // FechaPuntualActividad belongsTo Actividad via idActividad
  idActividadActividad!: Actividad;
  getIdActividadActividad!: Sequelize.BelongsToGetAssociationMixin<Actividad>;
  setIdActividadActividad!: Sequelize.BelongsToSetAssociationMixin<Actividad, ActividadId>;
  createIdActividadActividad!: Sequelize.BelongsToCreateAssociationMixin<Actividad>;
  // FechaPuntualActividad belongsTo FechaPuntual via idFecha
  idFechaFechaPuntual!: FechaPuntual;
  getIdFechaFechaPuntual!: Sequelize.BelongsToGetAssociationMixin<FechaPuntual>;
  setIdFechaFechaPuntual!: Sequelize.BelongsToSetAssociationMixin<FechaPuntual, FechaPuntualId>;
  createIdFechaFechaPuntual!: Sequelize.BelongsToCreateAssociationMixin<FechaPuntual>;

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
