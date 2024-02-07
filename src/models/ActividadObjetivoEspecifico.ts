import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CronogramaActividad, CronogramaActividadId } from './CronogramaActividad';
import type { ObjetivoEspecifico, ObjetivoEspecificoId } from './ObjetivoEspecifico';

export interface ActividadObjetivoEspecificoAttributes {
  idActividadObjetivoEspecifico: number;
  idObjetivoEspecifico: number;
  desc?: string;
  motivoModificacion?: string;
  motivoSuspension?: string;
}

export type ActividadObjetivoEspecificoPk = "idActividadObjetivoEspecifico";
export type ActividadObjetivoEspecificoId = ActividadObjetivoEspecifico[ActividadObjetivoEspecificoPk];
export type ActividadObjetivoEspecificoOptionalAttributes = "desc" | "motivoModificacion" | "motivoSuspension";
export type ActividadObjetivoEspecificoCreationAttributes = Optional<ActividadObjetivoEspecificoAttributes, ActividadObjetivoEspecificoOptionalAttributes>;

export class ActividadObjetivoEspecifico extends Model<ActividadObjetivoEspecificoAttributes, ActividadObjetivoEspecificoCreationAttributes> implements ActividadObjetivoEspecificoAttributes {
  idActividadObjetivoEspecifico!: number;
  idObjetivoEspecifico!: number;
  desc?: string;
  motivoModificacion?: string;
  motivoSuspension?: string;

  // ActividadObjetivoEspecifico hasMany CronogramaActividad via idActividadObjetivoEspecifico
  cronogramaActividads!: CronogramaActividad[];
  getCronogramaActividads!: Sequelize.HasManyGetAssociationsMixin<CronogramaActividad>;
  setCronogramaActividads!: Sequelize.HasManySetAssociationsMixin<CronogramaActividad, CronogramaActividadId>;
  addCronogramaActividad!: Sequelize.HasManyAddAssociationMixin<CronogramaActividad, CronogramaActividadId>;
  addCronogramaActividads!: Sequelize.HasManyAddAssociationsMixin<CronogramaActividad, CronogramaActividadId>;
  createCronogramaActividad!: Sequelize.HasManyCreateAssociationMixin<CronogramaActividad>;
  removeCronogramaActividad!: Sequelize.HasManyRemoveAssociationMixin<CronogramaActividad, CronogramaActividadId>;
  removeCronogramaActividads!: Sequelize.HasManyRemoveAssociationsMixin<CronogramaActividad, CronogramaActividadId>;
  hasCronogramaActividad!: Sequelize.HasManyHasAssociationMixin<CronogramaActividad, CronogramaActividadId>;
  hasCronogramaActividads!: Sequelize.HasManyHasAssociationsMixin<CronogramaActividad, CronogramaActividadId>;
  countCronogramaActividads!: Sequelize.HasManyCountAssociationsMixin;
  // ActividadObjetivoEspecifico belongsTo ObjetivoEspecifico via idObjetivoEspecifico
  idObjetivoEspecificoObjetivoEspecifico!: ObjetivoEspecifico;
  getIdObjetivoEspecificoObjetivoEspecifico!: Sequelize.BelongsToGetAssociationMixin<ObjetivoEspecifico>;
  setIdObjetivoEspecificoObjetivoEspecifico!: Sequelize.BelongsToSetAssociationMixin<ObjetivoEspecifico, ObjetivoEspecificoId>;
  createIdObjetivoEspecificoObjetivoEspecifico!: Sequelize.BelongsToCreateAssociationMixin<ObjetivoEspecifico>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ActividadObjetivoEspecifico {
    return ActividadObjetivoEspecifico.init({
    idActividadObjetivoEspecifico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idObjetivoEspecifico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ObjetivoEspecifico',
        key: 'idObjetivoEspecifico'
      }
    },
    desc: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    motivoModificacion: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    motivoSuspension: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ActividadObjetivoEspecifico',
    timestamps: true,
    paranoid: true
  });
  }
}
