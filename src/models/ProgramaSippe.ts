import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { ProgramaSippeActividad, ProgramaSippeActividadId } from './ProgramaSippeActividad';
import type { Propuesta, PropuestaId } from './Propuesta';
import type { PropuestaProgramaExtension, PropuestaProgramaExtensionId } from './PropuestaProgramaExtension';

export interface ProgramaSippeAttributes {
  idProgramaSIPPE: number;
  nom: string;
}

export type ProgramaSippePk = "idProgramaSIPPE";
export type ProgramaSippeId = ProgramaSippe[ProgramaSippePk];
export type ProgramaSippeOptionalAttributes = "idProgramaSIPPE";
export type ProgramaSippeCreationAttributes = Optional<ProgramaSippeAttributes, ProgramaSippeOptionalAttributes>;

export class ProgramaSippe extends Model<ProgramaSippeAttributes, ProgramaSippeCreationAttributes> implements ProgramaSippeAttributes {
  idProgramaSIPPE!: number;
  nom!: string;

  // ProgramaSippe belongsToMany Actividad via idProgramaSIPPE and idActividad
  idActividad_Actividad_ProgramaSIPPEActividads!: Actividad[];
  getIdActividad_Actividad_ProgramaSIPPEActividads!: Sequelize.BelongsToManyGetAssociationsMixin<Actividad>;
  setIdActividad_Actividad_ProgramaSIPPEActividads!: Sequelize.BelongsToManySetAssociationsMixin<Actividad, ActividadId>;
  addIdActividad_Actividad_ProgramaSIPPEActividad!: Sequelize.BelongsToManyAddAssociationMixin<Actividad, ActividadId>;
  addIdActividad_Actividad_ProgramaSIPPEActividads!: Sequelize.BelongsToManyAddAssociationsMixin<Actividad, ActividadId>;
  createIdActividad_Actividad_ProgramaSIPPEActividad!: Sequelize.BelongsToManyCreateAssociationMixin<Actividad>;
  removeIdActividad_Actividad_ProgramaSIPPEActividad!: Sequelize.BelongsToManyRemoveAssociationMixin<Actividad, ActividadId>;
  removeIdActividad_Actividad_ProgramaSIPPEActividads!: Sequelize.BelongsToManyRemoveAssociationsMixin<Actividad, ActividadId>;
  hasIdActividad_Actividad_ProgramaSIPPEActividad!: Sequelize.BelongsToManyHasAssociationMixin<Actividad, ActividadId>;
  hasIdActividad_Actividad_ProgramaSIPPEActividads!: Sequelize.BelongsToManyHasAssociationsMixin<Actividad, ActividadId>;
  countIdActividad_Actividad_ProgramaSIPPEActividads!: Sequelize.BelongsToManyCountAssociationsMixin;
  // ProgramaSippe hasMany ProgramaSippeActividad via idProgramaSIPPE
  ProgramaSIPPEActividads!: ProgramaSippeActividad[];
  getProgramaSIPPEActividads!: Sequelize.HasManyGetAssociationsMixin<ProgramaSippeActividad>;
  setProgramaSIPPEActividads!: Sequelize.HasManySetAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  addProgramaSIPPEActividad!: Sequelize.HasManyAddAssociationMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  addProgramaSIPPEActividads!: Sequelize.HasManyAddAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  createProgramaSIPPEActividad!: Sequelize.HasManyCreateAssociationMixin<ProgramaSippeActividad>;
  removeProgramaSIPPEActividad!: Sequelize.HasManyRemoveAssociationMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  removeProgramaSIPPEActividads!: Sequelize.HasManyRemoveAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  hasProgramaSIPPEActividad!: Sequelize.HasManyHasAssociationMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  hasProgramaSIPPEActividads!: Sequelize.HasManyHasAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  countProgramaSIPPEActividads!: Sequelize.HasManyCountAssociationsMixin;
  // ProgramaSippe belongsToMany Propuesta via idProgramaExtension and codigoPropuesta
  codigoPropuesta_Propuesta_PropuestaProgramaExtensions!: Propuesta[];
  getCodigoPropuesta_Propuesta_PropuestaProgramaExtensions!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuesta_Propuesta_PropuestaProgramaExtensions!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaProgramaExtension!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaProgramaExtensions!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuesta_PropuestaProgramaExtension!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuesta_Propuesta_PropuestaProgramaExtension!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuesta_Propuesta_PropuestaProgramaExtensions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaProgramaExtension!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaProgramaExtensions!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuesta_Propuesta_PropuestaProgramaExtensions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // ProgramaSippe hasMany PropuestaProgramaExtension via idProgramaExtension
  PropuestaProgramaExtensions!: PropuestaProgramaExtension[];
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
    idProgramaSIPPE: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
