import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { ProgramaSippeActividad, ProgramaSippeActividadId } from './ProgramaSippeActividad';
import type { Propuesta, PropuestaId } from './Propuesta';
import type { PropuestaProgramaExtension, PropuestaProgramaExtensionId } from './PropuestaProgramaExtension';

export interface ProgramaSippeAttributes {
  idProgramaSippe: number;
  nom: string;
}

export type ProgramaSippePk = "idProgramaSippe";
export type ProgramaSippeId = ProgramaSippe[ProgramaSippePk];
export type ProgramaSippeOptionalAttributes = "idProgramaSippe";
export type ProgramaSippeCreationAttributes = Optional<ProgramaSippeAttributes, ProgramaSippeOptionalAttributes>;

export class ProgramaSippe extends Model<ProgramaSippeAttributes, ProgramaSippeCreationAttributes> implements ProgramaSippeAttributes {
  idProgramaSippe!: number;
  nom!: string;

  // ProgramaSippe belongsToMany Actividad via idProgramaSippe and idActividad
  idActividadActividadProgramaSippeActividads!: Actividad[];
  getIdActividadActividadProgramaSippeActividads!: Sequelize.BelongsToManyGetAssociationsMixin<Actividad>;
  setIdActividadActividadProgramaSippeActividads!: Sequelize.BelongsToManySetAssociationsMixin<Actividad, ActividadId>;
  addIdActividadActividadProgramaSippeActividad!: Sequelize.BelongsToManyAddAssociationMixin<Actividad, ActividadId>;
  addIdActividadActividadProgramaSippeActividads!: Sequelize.BelongsToManyAddAssociationsMixin<Actividad, ActividadId>;
  createIdActividadActividadProgramaSippeActividad!: Sequelize.BelongsToManyCreateAssociationMixin<Actividad>;
  removeIdActividadActividadProgramaSippeActividad!: Sequelize.BelongsToManyRemoveAssociationMixin<Actividad, ActividadId>;
  removeIdActividadActividadProgramaSippeActividads!: Sequelize.BelongsToManyRemoveAssociationsMixin<Actividad, ActividadId>;
  hasIdActividadActividadProgramaSippeActividad!: Sequelize.BelongsToManyHasAssociationMixin<Actividad, ActividadId>;
  hasIdActividadActividadProgramaSippeActividads!: Sequelize.BelongsToManyHasAssociationsMixin<Actividad, ActividadId>;
  countIdActividadActividadProgramaSippeActividads!: Sequelize.BelongsToManyCountAssociationsMixin;
  // ProgramaSippe hasMany ProgramaSippeActividad via idProgramaSippe
  programaSippeActividads!: ProgramaSippeActividad[];
  getProgramaSippeActividads!: Sequelize.HasManyGetAssociationsMixin<ProgramaSippeActividad>;
  setProgramaSippeActividads!: Sequelize.HasManySetAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  addProgramaSippeActividad!: Sequelize.HasManyAddAssociationMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  addProgramaSippeActividads!: Sequelize.HasManyAddAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  createProgramaSippeActividad!: Sequelize.HasManyCreateAssociationMixin<ProgramaSippeActividad>;
  removeProgramaSippeActividad!: Sequelize.HasManyRemoveAssociationMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  removeProgramaSippeActividads!: Sequelize.HasManyRemoveAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  hasProgramaSippeActividad!: Sequelize.HasManyHasAssociationMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  hasProgramaSippeActividads!: Sequelize.HasManyHasAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  countProgramaSippeActividads!: Sequelize.HasManyCountAssociationsMixin;
  // ProgramaSippe belongsToMany Propuesta via idProgramaExtension and codigoPropuesta
  codigoPropuestaPropuestaPropuestaProgramaExtensions!: Propuesta[];
  getCodigoPropuestaPropuestaPropuestaProgramaExtensions!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuestaPropuestaPropuestaProgramaExtensions!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPropuestaPropuestaProgramaExtension!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPropuestaPropuestaProgramaExtensions!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestaPropuestaProgramaExtension!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuestaPropuestaPropuestaProgramaExtension!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuestaPropuestaPropuestaProgramaExtensions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPropuestaPropuestaProgramaExtension!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPropuestaPropuestaProgramaExtensions!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuestaPropuestaPropuestaProgramaExtensions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // ProgramaSippe hasMany PropuestaProgramaExtension via idProgramaExtension
  propuestaProgramaExtensions!: PropuestaProgramaExtension[];
  getPropuestaProgramaExtensions!: Sequelize.HasManyGetAssociationsMixin<PropuestaProgramaExtension>;
  setPropuestaProgramaExtensions!: Sequelize.HasManySetAssociationsMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  addPropuestaProgramaExtension!: Sequelize.HasManyAddAssociationMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  addPropuestaProgramaExtensions!: Sequelize.HasManyAddAssociationsMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  createPropuestaProgramaExtension!: Sequelize.HasManyCreateAssociationMixin<PropuestaProgramaExtension>;
  removePropuestaProgramaExtension!: Sequelize.HasManyRemoveAssociationMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  removePropuestaProgramaExtensions!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  hasPropuestaProgramaExtension!: Sequelize.HasManyHasAssociationMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  hasPropuestaProgramaExtensions!: Sequelize.HasManyHasAssociationsMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  countPropuestaProgramaExtensions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProgramaSippe {
    return ProgramaSippe.init({
    idProgramaSippe: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idProgramaSIPPE'
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ProgramaSIPPE',
    timestamps: false
  });
  }
}
