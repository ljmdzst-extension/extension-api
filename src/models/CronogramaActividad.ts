import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ActividadObjetivoEspecifico, ActividadObjetivoEspecificoId } from './ActividadObjetivoEspecifico';

export interface CronogramaActividadAttributes {
  idActividadObjetivoEspecifico: number;
  mes: number;
  anio: number;
}

export type CronogramaActividadPk = "idActividadObjetivoEspecifico" | "mes" | "anio";
export type CronogramaActividadId = CronogramaActividad[CronogramaActividadPk];
export type CronogramaActividadOptionalAttributes = "idActividadObjetivoEspecifico" | "anio";
export type CronogramaActividadCreationAttributes = Optional<CronogramaActividadAttributes, CronogramaActividadOptionalAttributes>;

export class CronogramaActividad extends Model<CronogramaActividadAttributes, CronogramaActividadCreationAttributes> implements CronogramaActividadAttributes {
  idActividadObjetivoEspecifico!: number;
  mes!: number;
  anio!: number;

  // CronogramaActividad belongsTo ActividadObjetivoEspecifico via idActividadObjetivoEspecifico
  idActividadObjetivoEspecifico_ActividadObjetivoEspecifico!: ActividadObjetivoEspecifico;
  getIdActividadObjetivoEspecifico_ActividadObjetivoEspecifico!: Sequelize.BelongsToGetAssociationMixin<ActividadObjetivoEspecifico>;
  setIdActividadObjetivoEspecifico_ActividadObjetivoEspecifico!: Sequelize.BelongsToSetAssociationMixin<ActividadObjetivoEspecifico, ActividadObjetivoEspecificoId>;
  createIdActividadObjetivoEspecifico_ActividadObjetivoEspecifico!: Sequelize.BelongsToCreateAssociationMixin<ActividadObjetivoEspecifico>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CronogramaActividad {
    return CronogramaActividad.init({
    idActividadObjetivoEspecifico: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ActividadObjetivoEspecifico',
        key: 'idActividadObjetivoEspecifico'
      }
    },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'CronogramaActividad',
    timestamps: false
  });
  }
}
