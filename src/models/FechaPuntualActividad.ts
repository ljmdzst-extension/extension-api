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
  idActividad_Actividad!: Actividad;
  getIdActividad_Actividad!: Sequelize.BelongsToGetAssociationMixin<Actividad>;
  setIdActividad_Actividad!: Sequelize.BelongsToSetAssociationMixin<Actividad, ActividadId>;
  createIdActividad_Actividad!: Sequelize.BelongsToCreateAssociationMixin<Actividad>;
  // FechaPuntualActividad belongsTo FechaPuntual via idFecha
  idFecha_FechaPuntual!: FechaPuntual;
  getIdFecha_FechaPuntual!: Sequelize.BelongsToGetAssociationMixin<FechaPuntual>;
  setIdFecha_FechaPuntual!: Sequelize.BelongsToSetAssociationMixin<FechaPuntual, FechaPuntualId>;
  createIdFecha_FechaPuntual!: Sequelize.BelongsToCreateAssociationMixin<FechaPuntual>;

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
