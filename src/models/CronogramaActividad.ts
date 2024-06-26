import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ActividadObjetivoEspecifico, ActividadObjetivoEspecificoId } from './ActividadObjetivoEspecifico';

export interface CronogramaActividadAttributes {
  idCronograma : number;
  idActividadObjetivoEspecifico: number;
  mes: number;
  anio: number;
}

export type CronogramaActividadPk = "idActividadObjetivoEspecifico" | "mes" | "anio";
export type CronogramaActividadId = CronogramaActividad[CronogramaActividadPk];
export type CronogramaActividadOptionalAttributes = "anio";
export type CronogramaActividadCreationAttributes = Optional<CronogramaActividadAttributes, CronogramaActividadOptionalAttributes>;

export class CronogramaActividad extends Model<CronogramaActividadAttributes, CronogramaActividadCreationAttributes> implements CronogramaActividadAttributes {
  idCronograma !: number;
  idActividadObjetivoEspecifico!: number;
  mes!: number;
  anio!: number;

  // CronogramaActividad belongsTo ActividadObjetivoEspecifico via idActividadObjetivoEspecifico
  actividadObjetivoEspecifico!: ActividadObjetivoEspecifico;
  getActividadObjetivoEspecifico!: Sequelize.BelongsToGetAssociationMixin<ActividadObjetivoEspecifico>;
  setActividadObjetivoEspecifico!: Sequelize.BelongsToSetAssociationMixin<ActividadObjetivoEspecifico, ActividadObjetivoEspecificoId>;
  createActividadObjetivoEspecifico!: Sequelize.BelongsToCreateAssociationMixin<ActividadObjetivoEspecifico>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CronogramaActividad {
    return CronogramaActividad.init({
    idCronograma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement : true
    },
    idActividadObjetivoEspecifico: {
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
    tableName: 'Cronograma',
    timestamps: true,
    paranoid : true
  });
  }
}
