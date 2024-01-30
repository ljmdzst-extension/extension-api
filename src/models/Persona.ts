import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Institucion, InstitucionId } from './Institucion';
import type { Integrante, IntegranteId } from './Integrante';
import type { Propuesta, PropuestaId } from './Propuesta';
import type { Responsable, ResponsableId } from './Responsable';
import type { Usuario, UsuarioId } from './Usuario';

export interface PersonaAttributes {
  nroDoc: string;
  tipoDoc: number;
  ape: string;
  nom: string;
  tel?: string;
  dom?: string;
  email?: string;
  ciudad?: string;
  provincia?: string;
  pais?: string;
}

export type PersonaPk = "nroDoc";
export type PersonaId = Persona[PersonaPk];
export type PersonaOptionalAttributes = "tel" | "dom" | "email" | "ciudad" | "provincia" | "pais";
export type PersonaCreationAttributes = Optional<PersonaAttributes, PersonaOptionalAttributes>;

export class Persona extends Model<PersonaAttributes, PersonaCreationAttributes> implements PersonaAttributes {
  nroDoc!: string;
  tipoDoc!: number;
  ape!: string;
  nom!: string;
  tel?: string;
  dom?: string;
  email?: string;
  ciudad?: string;
  provincia?: string;
  pais?: string;

  // Persona belongsToMany Institucion via nroDoc and idInstitucion
  idInstitucion_Institucion_Responsables!: Institucion[];
  getIdInstitucion_Institucion_Responsables!: Sequelize.BelongsToManyGetAssociationsMixin<Institucion>;
  setIdInstitucion_Institucion_Responsables!: Sequelize.BelongsToManySetAssociationsMixin<Institucion, InstitucionId>;
  addIdInstitucion_Institucion_Responsable!: Sequelize.BelongsToManyAddAssociationMixin<Institucion, InstitucionId>;
  addIdInstitucion_Institucion_Responsables!: Sequelize.BelongsToManyAddAssociationsMixin<Institucion, InstitucionId>;
  createIdInstitucion_Institucion_Responsable!: Sequelize.BelongsToManyCreateAssociationMixin<Institucion>;
  removeIdInstitucion_Institucion_Responsable!: Sequelize.BelongsToManyRemoveAssociationMixin<Institucion, InstitucionId>;
  removeIdInstitucion_Institucion_Responsables!: Sequelize.BelongsToManyRemoveAssociationsMixin<Institucion, InstitucionId>;
  hasIdInstitucion_Institucion_Responsable!: Sequelize.BelongsToManyHasAssociationMixin<Institucion, InstitucionId>;
  hasIdInstitucion_Institucion_Responsables!: Sequelize.BelongsToManyHasAssociationsMixin<Institucion, InstitucionId>;
  countIdInstitucion_Institucion_Responsables!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Persona hasMany Integrante via nroDoc
  Integrantes!: Integrante[];
  getIntegrantes!: Sequelize.HasManyGetAssociationsMixin<Integrante>;
  setIntegrantes!: Sequelize.HasManySetAssociationsMixin<Integrante, IntegranteId>;
  addIntegrante!: Sequelize.HasManyAddAssociationMixin<Integrante, IntegranteId>;
  addIntegrantes!: Sequelize.HasManyAddAssociationsMixin<Integrante, IntegranteId>;
  createIntegrante!: Sequelize.HasManyCreateAssociationMixin<Integrante>;
  removeIntegrante!: Sequelize.HasManyRemoveAssociationMixin<Integrante, IntegranteId>;
  removeIntegrantes!: Sequelize.HasManyRemoveAssociationsMixin<Integrante, IntegranteId>;
  hasIntegrante!: Sequelize.HasManyHasAssociationMixin<Integrante, IntegranteId>;
  hasIntegrantes!: Sequelize.HasManyHasAssociationsMixin<Integrante, IntegranteId>;
  countIntegrantes!: Sequelize.HasManyCountAssociationsMixin;
  // Persona belongsToMany Propuesta via nroDoc and codigoPropuesta
  codigoPropuesta_Propuesta!: Propuesta[];
  getCodigoPropuesta_Propuesta!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuesta_Propuesta!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuestum!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuestum!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuesta_Propuestum!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuesta_Propuesta!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuestum!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuesta_Propuesta!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Persona hasMany Responsable via nroDoc
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
  // Persona hasMany Usuario via nroDoc
  Usuarios!: Usuario[];
  getUsuarios!: Sequelize.HasManyGetAssociationsMixin<Usuario>;
  setUsuarios!: Sequelize.HasManySetAssociationsMixin<Usuario, UsuarioId>;
  addUsuario!: Sequelize.HasManyAddAssociationMixin<Usuario, UsuarioId>;
  addUsuarios!: Sequelize.HasManyAddAssociationsMixin<Usuario, UsuarioId>;
  createUsuario!: Sequelize.HasManyCreateAssociationMixin<Usuario>;
  removeUsuario!: Sequelize.HasManyRemoveAssociationMixin<Usuario, UsuarioId>;
  removeUsuarios!: Sequelize.HasManyRemoveAssociationsMixin<Usuario, UsuarioId>;
  hasUsuario!: Sequelize.HasManyHasAssociationMixin<Usuario, UsuarioId>;
  hasUsuarios!: Sequelize.HasManyHasAssociationsMixin<Usuario, UsuarioId>;
  countUsuarios!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Persona {
    return Persona.init({
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
    tipoDoc: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ape: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dom: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ciudad: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    provincia: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Santa Fe"
    },
    pais: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Argentina"
    }
  }, {
    sequelize,
    tableName: 'Persona',
    timestamps: true,
    paranoid: true
  });
  }
}
