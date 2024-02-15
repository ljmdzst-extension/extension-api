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
export type InstitucionOptionalAttributes = "idInstitucion" | "dom" | "email" | "tel" | "ubicacion" ;
export type InstitucionCreationAttributes = Optional<InstitucionAttributes, InstitucionOptionalAttributes>;

export class Institucion extends Model<InstitucionAttributes, InstitucionCreationAttributes> implements InstitucionAttributes {
  idInstitucion!: number;
  nom!: string;
  dom?: string;
  email?: string;
  tel?: string;
  ubicacion?: string;

  // Institucion belongsToMany Actividad via idInstitucion and idActividad
  idActividadActividadInstitucionActividads!: Actividad[];
  getIdActividadActividadInstitucionActividads!: Sequelize.BelongsToManyGetAssociationsMixin<Actividad>;
  setIdActividadActividadInstitucionActividads!: Sequelize.BelongsToManySetAssociationsMixin<Actividad, ActividadId>;
  addIdActividadActividadInstitucionActividad!: Sequelize.BelongsToManyAddAssociationMixin<Actividad, ActividadId>;
  addIdActividadActividadInstitucionActividads!: Sequelize.BelongsToManyAddAssociationsMixin<Actividad, ActividadId>;
  createIdActividadActividadInstitucionActividad!: Sequelize.BelongsToManyCreateAssociationMixin<Actividad>;
  removeIdActividadActividadInstitucionActividad!: Sequelize.BelongsToManyRemoveAssociationMixin<Actividad, ActividadId>;
  removeIdActividadActividadInstitucionActividads!: Sequelize.BelongsToManyRemoveAssociationsMixin<Actividad, ActividadId>;
  hasIdActividadActividadInstitucionActividad!: Sequelize.BelongsToManyHasAssociationMixin<Actividad, ActividadId>;
  hasIdActividadActividadInstitucionActividads!: Sequelize.BelongsToManyHasAssociationsMixin<Actividad, ActividadId>;
  countIdActividadActividadInstitucionActividads!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Institucion hasMany InstitucionActividad via idInstitucion
  institucionActividads!: InstitucionActividad[];
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
  nroDocPersonaResponsables!: Persona[];
  getNroDocPersonaResponsables!: Sequelize.BelongsToManyGetAssociationsMixin<Persona>;
  setNroDocPersonaResponsables!: Sequelize.BelongsToManySetAssociationsMixin<Persona, PersonaId>;
  addNroDocPersonaResponsable!: Sequelize.BelongsToManyAddAssociationMixin<Persona, PersonaId>;
  addNroDocPersonaResponsables!: Sequelize.BelongsToManyAddAssociationsMixin<Persona, PersonaId>;
  createNroDocPersonaResponsable!: Sequelize.BelongsToManyCreateAssociationMixin<Persona>;
  removeNroDocPersonaResponsable!: Sequelize.BelongsToManyRemoveAssociationMixin<Persona, PersonaId>;
  removeNroDocPersonaResponsables!: Sequelize.BelongsToManyRemoveAssociationsMixin<Persona, PersonaId>;
  hasNroDocPersonaResponsable!: Sequelize.BelongsToManyHasAssociationMixin<Persona, PersonaId>;
  hasNroDocPersonaResponsables!: Sequelize.BelongsToManyHasAssociationsMixin<Persona, PersonaId>;
  countNroDocPersonaResponsables!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Institucion belongsToMany Propuesta via idInstitucion and codigoPropuesta
  codigoPropuestaPropuestaPropuestaInstitucions!: Propuesta[];
  getCodigoPropuestaPropuestaPropuestaInstitucions!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuestaPropuestaPropuestaInstitucions!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPropuestaPropuestaInstitucion!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPropuestaPropuestaInstitucions!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestaPropuestaInstitucion!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuestaPropuestaPropuestaInstitucion!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuestaPropuestaPropuestaInstitucions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPropuestaPropuestaInstitucion!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPropuestaPropuestaInstitucions!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuestaPropuestaPropuestaInstitucions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Institucion hasMany PropuestaInstitucion via idInstitucion
  propuestaInstitucions!: PropuestaInstitucion[];
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
  responsables!: Responsable[];
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
