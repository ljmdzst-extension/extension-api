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


  // Institucion hasMany InstitucionActividad via idInstitucion
  institucionActividades!: InstitucionActividad[];
  getInstitucionActividades!: Sequelize.HasManyGetAssociationsMixin<InstitucionActividad>;
  setInstitucionActividades!: Sequelize.HasManySetAssociationsMixin<InstitucionActividad, InstitucionActividadId>;
  addInstitucionActividad!: Sequelize.HasManyAddAssociationMixin<InstitucionActividad, InstitucionActividadId>;
  addInstitucionActividades!: Sequelize.HasManyAddAssociationsMixin<InstitucionActividad, InstitucionActividadId>;
  createInstitucionActividad!: Sequelize.HasManyCreateAssociationMixin<InstitucionActividad>;
  removeInstitucionActividad!: Sequelize.HasManyRemoveAssociationMixin<InstitucionActividad, InstitucionActividadId>;
  removeInstitucionActividades!: Sequelize.HasManyRemoveAssociationsMixin<InstitucionActividad, InstitucionActividadId>;
  hasInstitucionActividad!: Sequelize.HasManyHasAssociationMixin<InstitucionActividad, InstitucionActividadId>;
  hasInstitucionActividades!: Sequelize.HasManyHasAssociationsMixin<InstitucionActividad, InstitucionActividadId>;
  countInstitucionActividades!: Sequelize.HasManyCountAssociationsMixin;

  // Institucion hasMany PropuestaInstitucion via idInstitucion
  propuestaInstituciones!: PropuestaInstitucion[];
  getPropuestaInstituciones!: Sequelize.HasManyGetAssociationsMixin<PropuestaInstitucion>;
  setPropuestaInstituciones!: Sequelize.HasManySetAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  addPropuestaInstitucion!: Sequelize.HasManyAddAssociationMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  addPropuestaInstituciones!: Sequelize.HasManyAddAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  createPropuestaInstitucion!: Sequelize.HasManyCreateAssociationMixin<PropuestaInstitucion>;
  removePropuestaInstitucion!: Sequelize.HasManyRemoveAssociationMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  removePropuestaInstituciones!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  hasPropuestaInstitucion!: Sequelize.HasManyHasAssociationMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  hasPropuestaInstituciones!: Sequelize.HasManyHasAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  countPropuestaInstituciones!: Sequelize.HasManyCountAssociationsMixin;
  
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
