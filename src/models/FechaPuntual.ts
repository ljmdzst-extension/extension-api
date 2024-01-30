import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { FechaPuntualActividad, FechaPuntualActividadId } from './FechaPuntualActividad';

export interface FechaPuntualAttributes {
  idFecha: number;
  fecha: string;
}

export type FechaPuntualPk = "idFecha";
export type FechaPuntualId = FechaPuntual[FechaPuntualPk];
export type FechaPuntualOptionalAttributes = "idFecha";
export type FechaPuntualCreationAttributes = Optional<FechaPuntualAttributes, FechaPuntualOptionalAttributes>;

export class FechaPuntual extends Model<FechaPuntualAttributes, FechaPuntualCreationAttributes> implements FechaPuntualAttributes {
  idFecha!: number;
  fecha!: string;

  // FechaPuntual belongsToMany Actividad via idFecha and idActividad
  idActividad_Actividads!: Actividad[];
  getIdActividad_Actividads!: Sequelize.BelongsToManyGetAssociationsMixin<Actividad>;
  setIdActividad_Actividads!: Sequelize.BelongsToManySetAssociationsMixin<Actividad, ActividadId>;
  addIdActividad_Actividad!: Sequelize.BelongsToManyAddAssociationMixin<Actividad, ActividadId>;
  addIdActividad_Actividads!: Sequelize.BelongsToManyAddAssociationsMixin<Actividad, ActividadId>;
  createIdActividad_Actividad!: Sequelize.BelongsToManyCreateAssociationMixin<Actividad>;
  removeIdActividad_Actividad!: Sequelize.BelongsToManyRemoveAssociationMixin<Actividad, ActividadId>;
  removeIdActividad_Actividads!: Sequelize.BelongsToManyRemoveAssociationsMixin<Actividad, ActividadId>;
  hasIdActividad_Actividad!: Sequelize.BelongsToManyHasAssociationMixin<Actividad, ActividadId>;
  hasIdActividad_Actividads!: Sequelize.BelongsToManyHasAssociationsMixin<Actividad, ActividadId>;
  countIdActividad_Actividads!: Sequelize.BelongsToManyCountAssociationsMixin;
  // FechaPuntual hasMany FechaPuntualActividad via idFecha
  FechaPuntualActividads!: FechaPuntualActividad[];
  getFechaPuntualActividads!: Sequelize.HasManyGetAssociationsMixin<FechaPuntualActividad>;
  setFechaPuntualActividads!: Sequelize.HasManySetAssociationsMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  addFechaPuntualActividad!: Sequelize.HasManyAddAssociationMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  addFechaPuntualActividads!: Sequelize.HasManyAddAssociationsMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  createFechaPuntualActividad!: Sequelize.HasManyCreateAssociationMixin<FechaPuntualActividad>;
  removeFechaPuntualActividad!: Sequelize.HasManyRemoveAssociationMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  removeFechaPuntualActividads!: Sequelize.HasManyRemoveAssociationsMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  hasFechaPuntualActividad!: Sequelize.HasManyHasAssociationMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  hasFechaPuntualActividads!: Sequelize.HasManyHasAssociationsMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  countFechaPuntualActividads!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof FechaPuntual {
    return FechaPuntual.init({
    idFecha: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'FechaPuntual',
    timestamps: false
  });
  }
}
