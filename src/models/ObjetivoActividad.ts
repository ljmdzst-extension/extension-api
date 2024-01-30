import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { Objetivo, ObjetivoId } from './Objetivo';

export interface ObjetivoActividadAttributes {
  idObjetivo: number;
  idActividad: number;
}

export type ObjetivoActividadPk = "idObjetivo" | "idActividad";
export type ObjetivoActividadId = ObjetivoActividad[ObjetivoActividadPk];
export type ObjetivoActividadCreationAttributes = ObjetivoActividadAttributes;

export class ObjetivoActividad extends Model<ObjetivoActividadAttributes, ObjetivoActividadCreationAttributes> implements ObjetivoActividadAttributes {
  idObjetivo!: number;
  idActividad!: number;

  // ObjetivoActividad belongsTo Actividad via idActividad
  idActividad_Actividad!: Actividad;
  getIdActividad_Actividad!: Sequelize.BelongsToGetAssociationMixin<Actividad>;
  setIdActividad_Actividad!: Sequelize.BelongsToSetAssociationMixin<Actividad, ActividadId>;
  createIdActividad_Actividad!: Sequelize.BelongsToCreateAssociationMixin<Actividad>;
  // ObjetivoActividad belongsTo Objetivo via idObjetivo
  idObjetivo_Objetivo!: Objetivo;
  getIdObjetivo_Objetivo!: Sequelize.BelongsToGetAssociationMixin<Objetivo>;
  setIdObjetivo_Objetivo!: Sequelize.BelongsToSetAssociationMixin<Objetivo, ObjetivoId>;
  createIdObjetivo_Objetivo!: Sequelize.BelongsToCreateAssociationMixin<Objetivo>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ObjetivoActividad {
    return ObjetivoActividad.init({
    idObjetivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Objetivo',
        key: 'idObjetivo'
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
    tableName: 'ObjetivoActividad',
    timestamps: true,
    paranoid: true
  });
  }
}
