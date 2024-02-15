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
  idActividadActividads!: Actividad[];
  getIdActividadActividads!: Sequelize.BelongsToManyGetAssociationsMixin<Actividad>;
  setIdActividadActividads!: Sequelize.BelongsToManySetAssociationsMixin<Actividad, ActividadId>;
  addIdActividadActividad!: Sequelize.BelongsToManyAddAssociationMixin<Actividad, ActividadId>;
  addIdActividadActividads!: Sequelize.BelongsToManyAddAssociationsMixin<Actividad, ActividadId>;
  createIdActividadActividad!: Sequelize.BelongsToManyCreateAssociationMixin<Actividad>;
  removeIdActividadActividad!: Sequelize.BelongsToManyRemoveAssociationMixin<Actividad, ActividadId>;
  removeIdActividadActividads!: Sequelize.BelongsToManyRemoveAssociationsMixin<Actividad, ActividadId>;
  hasIdActividadActividad!: Sequelize.BelongsToManyHasAssociationMixin<Actividad, ActividadId>;
  hasIdActividadActividads!: Sequelize.BelongsToManyHasAssociationsMixin<Actividad, ActividadId>;
  countIdActividadActividads!: Sequelize.BelongsToManyCountAssociationsMixin;
  // FechaPuntual hasMany FechaPuntualActividad via idFecha
  fechaPuntualActividads!: FechaPuntualActividad[];
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
