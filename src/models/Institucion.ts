import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { InstitucionActividad, InstitucionActividadId } from './InstitucionActividad';
import type { Persona, PersonaId } from './Persona';
import type { Propuesta, PropuestaId } from './Propuesta';
import type { PropuestaInstitucion, PropuestaInstitucionId } from './PropuestaInstitucion';
import type { Responsable, ResponsableId } from './Responsable';

export interface InstitucionAttributes {
  idInstitucion: number;
  nom: string;
  dom?: string;
  email?: string;
  tel?: string;
  ubicacion?: string;
}

export type InstitucionPk = "idInstitucion";
export type InstitucionId = Institucion[InstitucionPk];
export type InstitucionOptionalAttributes = "idInstitucion" | "dom" | "email" | "tel" | "ubicacion";
export type InstitucionCreationAttributes = Optional<InstitucionAttributes, InstitucionOptionalAttributes>;

export class Institucion extends Model<InstitucionAttributes, InstitucionCreationAttributes> implements InstitucionAttributes {
  idInstitucion!: number;
  nom!: string;
  dom?: string;
  email?: string;
  tel?: string;
  ubicacion?: string;

  // Institucion belongsToMany Actividad via idInstitucion and idActividad
  idActividad_Actividad_InstitucionActividads!: Actividad[];
  getIdActividad_Actividad_InstitucionActividads!: Sequelize.BelongsToManyGetAssociationsMixin<Actividad>;
  setIdActividad_Actividad_InstitucionActividads!: Sequelize.BelongsToManySetAssociationsMixin<Actividad, ActividadId>;
  addIdActividad_Actividad_InstitucionActividad!: Sequelize.BelongsToManyAddAssociationMixin<Actividad, ActividadId>;
  addIdActividad_Actividad_InstitucionActividads!: Sequelize.BelongsToManyAddAssociationsMixin<Actividad, ActividadId>;
  createIdActividad_Actividad_InstitucionActividad!: Sequelize.BelongsToManyCreateAssociationMixin<Actividad>;
  removeIdActividad_Actividad_InstitucionActividad!: Sequelize.BelongsToManyRemoveAssociationMixin<Actividad, ActividadId>;
  removeIdActividad_Actividad_InstitucionActividads!: Sequelize.BelongsToManyRemoveAssociationsMixin<Actividad, ActividadId>;
  hasIdActividad_Actividad_InstitucionActividad!: Sequelize.BelongsToManyHasAssociationMixin<Actividad, ActividadId>;
  hasIdActividad_Actividad_InstitucionActividads!: Sequelize.BelongsToManyHasAssociationsMixin<Actividad, ActividadId>;
  countIdActividad_Actividad_InstitucionActividads!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Institucion hasMany InstitucionActividad via idInstitucion
  InstitucionActividads!: InstitucionActividad[];
  getInstitucionActividads!: Sequelize.HasManyGetAssociationsMixin<InstitucionActividad>;
  setInstitucionActividads!: Sequelize.HasManySetAssociationsMixin<InstitucionActividad, InstitucionActividadId>;
  addInstitucionActividad!: Sequelize.HasManyAddAssociationMixin<InstitucionActividad, InstitucionActividadId>;
  addInstitucionActividads!: Sequelize.HasManyAddAssociationsMixin<InstitucionActividad, InstitucionActividadId>;
  createInstitucionActividad!: Sequelize.HasManyCreateAssociationMixin<InstitucionActividad>;
  removeInstitucionActividad!: Sequelize.HasManyRemoveAssociationMixin<InstitucionActividad, InstitucionActividadId>;
  removeInstitucionActividads!: Sequelize.HasManyRemoveAssociationsMixin<InstitucionActividad, InstitucionActividadId>;
  hasInstitucionActividad!: Sequelize.HasManyHasAssociationMixin<InstitucionActividad, InstitucionActividadId>;
  hasInstitucionActividads!: Sequelize.HasManyHasAssociationsMixin<InstitucionActividad, InstitucionActividadId>;
  countInstitucionActividads!: Sequelize.HasManyCountAssociationsMixin;
  // Institucion belongsToMany Persona via idInstitucion and nroDoc
  nroDoc_Persona_Responsables!: Persona[];
  getNroDoc_Persona_Responsables!: Sequelize.BelongsToManyGetAssociationsMixin<Persona>;
  setNroDoc_Persona_Responsables!: Sequelize.BelongsToManySetAssociationsMixin<Persona, PersonaId>;
  addNroDoc_Persona_Responsable!: Sequelize.BelongsToManyAddAssociationMixin<Persona, PersonaId>;
  addNroDoc_Persona_Responsables!: Sequelize.BelongsToManyAddAssociationsMixin<Persona, PersonaId>;
  createNroDoc_Persona_Responsable!: Sequelize.BelongsToManyCreateAssociationMixin<Persona>;
  removeNroDoc_Persona_Responsable!: Sequelize.BelongsToManyRemoveAssociationMixin<Persona, PersonaId>;
  removeNroDoc_Persona_Responsables!: Sequelize.BelongsToManyRemoveAssociationsMixin<Persona, PersonaId>;
  hasNroDoc_Persona_Responsable!: Sequelize.BelongsToManyHasAssociationMixin<Persona, PersonaId>;
  hasNroDoc_Persona_Responsables!: Sequelize.BelongsToManyHasAssociationsMixin<Persona, PersonaId>;
  countNroDoc_Persona_Responsables!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Institucion belongsToMany Propuesta via idInstitucion and codigoPropuesta
  codigoPropuesta_Propuesta_PropuestaInstitucions!: Propuesta[];
  getCodigoPropuesta_Propuesta_PropuestaInstitucions!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuesta_Propuesta_PropuestaInstitucions!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaInstitucion!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaInstitucions!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuesta_PropuestaInstitucion!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuesta_Propuesta_PropuestaInstitucion!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuesta_Propuesta_PropuestaInstitucions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaInstitucion!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaInstitucions!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuesta_Propuesta_PropuestaInstitucions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Institucion hasMany PropuestaInstitucion via idInstitucion
  PropuestaInstitucions!: PropuestaInstitucion[];
  getPropuestaInstitucions!: Sequelize.HasManyGetAssociationsMixin<PropuestaInstitucion>;
  setPropuestaInstitucions!: Sequelize.HasManySetAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  addPropuestaInstitucion!: Sequelize.HasManyAddAssociationMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  addPropuestaInstitucions!: Sequelize.HasManyAddAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  createPropuestaInstitucion!: Sequelize.HasManyCreateAssociationMixin<PropuestaInstitucion>;
  removePropuestaInstitucion!: Sequelize.HasManyRemoveAssociationMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  removePropuestaInstitucions!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  hasPropuestaInstitucion!: Sequelize.HasManyHasAssociationMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  hasPropuestaInstitucions!: Sequelize.HasManyHasAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  countPropuestaInstitucions!: Sequelize.HasManyCountAssociationsMixin;
  // Institucion hasMany Responsable via idInstitucion
  Responsables!: Responsable[];
  getResponsables!: Sequelize.HasManyGetAssociationsMixin<Responsable>;
  setResponsables!: Sequelize.HasManySetAssociationsMixin<Responsable, ResponsableId>;
  addResponsable!: Sequelize.HasManyAddAssociationMixin<Responsable, ResponsableId>;
  addResponsables!: Sequelize.HasManyAddAssociationsMixin<Responsable, ResponsableId>;
  createResponsable!: Sequelize.HasManyCreateAssociationMixin<Responsable>;
  removeResponsable!: Sequelize.HasManyRemoveAssociationMixin<Responsable, ResponsableId>;
  removeResponsables!: Sequelize.HasManyRemoveAssociationsMixin<Responsable, ResponsableId>;
  hasResponsable!: Sequelize.HasManyHasAssociationMixin<Responsable, ResponsableId>;
  hasResponsables!: Sequelize.HasManyHasAssociationsMixin<Responsable, ResponsableId>;
  countResponsables!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Institucion {
    return Institucion.init({
    idInstitucion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dom: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ubicacion: {
      type: DataTypes.STRING(2083),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Institucion',
    timestamps: true,
    paranoid: true
  });
  }
}
