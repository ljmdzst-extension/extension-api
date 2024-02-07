import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { UbicacionActividad, UbicacionActividadId } from './UbicacionActividad';
import type { UbicacionProblematica, UbicacionProblematicaCreationAttributes, UbicacionProblematicaId } from './UbicacionProblematica';

export interface UbicacionAttributes {
  idUbicacion: number;
  enlace: string;
  desc?: string;
}

export type UbicacionPk = "idUbicacion";
export type UbicacionId = Ubicacion[UbicacionPk];
export type UbicacionOptionalAttributes = "idUbicacion" | "desc";
export type UbicacionCreationAttributes = Optional<UbicacionAttributes, UbicacionOptionalAttributes>;

export class Ubicacion extends Model<UbicacionAttributes, UbicacionCreationAttributes> implements UbicacionAttributes {
  idUbicacion!: number;
  enlace!: string;
  desc?: string;

  // Ubicacion belongsToMany Actividad via idUbicacion and idActividad
  idActividadActividadUbicacionActividads!: Actividad[];
  getIdActividadActividadUbicacionActividads!: Sequelize.BelongsToManyGetAssociationsMixin<Actividad>;
  setIdActividadActividadUbicacionActividads!: Sequelize.BelongsToManySetAssociationsMixin<Actividad, ActividadId>;
  addIdActividadActividadUbicacionActividad!: Sequelize.BelongsToManyAddAssociationMixin<Actividad, ActividadId>;
  addIdActividadActividadUbicacionActividads!: Sequelize.BelongsToManyAddAssociationsMixin<Actividad, ActividadId>;
  createIdActividadActividadUbicacionActividad!: Sequelize.BelongsToManyCreateAssociationMixin<Actividad>;
  removeIdActividadActividadUbicacionActividad!: Sequelize.BelongsToManyRemoveAssociationMixin<Actividad, ActividadId>;
  removeIdActividadActividadUbicacionActividads!: Sequelize.BelongsToManyRemoveAssociationsMixin<Actividad, ActividadId>;
  hasIdActividadActividadUbicacionActividad!: Sequelize.BelongsToManyHasAssociationMixin<Actividad, ActividadId>;
  hasIdActividadActividadUbicacionActividads!: Sequelize.BelongsToManyHasAssociationsMixin<Actividad, ActividadId>;
  countIdActividadActividadUbicacionActividads!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Ubicacion hasMany UbicacionActividad via idUbicacion
  ubicacionActividads!: UbicacionActividad[];
  getUbicacionActividads!: Sequelize.HasManyGetAssociationsMixin<UbicacionActividad>;
  setUbicacionActividads!: Sequelize.HasManySetAssociationsMixin<UbicacionActividad, UbicacionActividadId>;
  addUbicacionActividad!: Sequelize.HasManyAddAssociationMixin<UbicacionActividad, UbicacionActividadId>;
  addUbicacionActividads!: Sequelize.HasManyAddAssociationsMixin<UbicacionActividad, UbicacionActividadId>;
  createUbicacionActividad!: Sequelize.HasManyCreateAssociationMixin<UbicacionActividad>;
  removeUbicacionActividad!: Sequelize.HasManyRemoveAssociationMixin<UbicacionActividad, UbicacionActividadId>;
  removeUbicacionActividads!: Sequelize.HasManyRemoveAssociationsMixin<UbicacionActividad, UbicacionActividadId>;
  hasUbicacionActividad!: Sequelize.HasManyHasAssociationMixin<UbicacionActividad, UbicacionActividadId>;
  hasUbicacionActividads!: Sequelize.HasManyHasAssociationsMixin<UbicacionActividad, UbicacionActividadId>;
  countUbicacionActividads!: Sequelize.HasManyCountAssociationsMixin;
  // Ubicacion hasOne UbicacionProblematica via idUbicacion
  ubicacionProblematica!: UbicacionProblematica;
  getUbicacionProblematica!: Sequelize.HasOneGetAssociationMixin<UbicacionProblematica>;
  setUbicacionProblematica!: Sequelize.HasOneSetAssociationMixin<UbicacionProblematica, UbicacionProblematicaId>;
  createUbicacionProblematica!: Sequelize.HasOneCreateAssociationMixin<UbicacionProblematica>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Ubicacion {
    return Ubicacion.init({
    idUbicacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    enlace: {
      type: DataTypes.STRING(2083),
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Ubicacion',
    timestamps: false
  });
  }
}
