import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { Evaluacion, EvaluacionId } from './Evaluacion';
import type { EvaluacionItem, EvaluacionItemId } from './EvaluacionItem';
import type { Persona, PersonaId } from './Persona';
import type { Propuesta, PropuestaId } from './Propuesta';
import type { UsuarioCategoria, UsuarioCategoriaId } from './UsuarioCategoria';

export interface UsuarioAttributes {
  idUsuario: string;
  nroDoc: string;
  email: string;
  pass: string;
  idUnidadAcademica: number;
  pendiente: number;
}

export type UsuarioPk = "idUsuario";
export type UsuarioId = Usuario[UsuarioPk];
export type UsuarioOptionalAttributes = "pendiente" ;
export type UsuarioCreationAttributes = Optional<UsuarioAttributes, UsuarioOptionalAttributes>;

export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  idUsuario!: string;
  nroDoc!: string;
  email!: string;
  pass!: string;
  idUnidadAcademica!: number;
  pendiente!: number;

  // Usuario belongsTo Persona via nroDoc
  nroDoc_Persona!: Persona;
  getNroDoc_Persona!: Sequelize.BelongsToGetAssociationMixin<Persona>;
  setNroDoc_Persona!: Sequelize.BelongsToSetAssociationMixin<Persona, PersonaId>;
  createNroDoc_Persona!: Sequelize.BelongsToCreateAssociationMixin<Persona>;
  // Usuario hasMany Actividad via idUsuario
  Actividads!: Actividad[];
  getActividads!: Sequelize.HasManyGetAssociationsMixin<Actividad>;
  setActividads!: Sequelize.HasManySetAssociationsMixin<Actividad, ActividadId>;
  addActividad!: Sequelize.HasManyAddAssociationMixin<Actividad, ActividadId>;
  addActividads!: Sequelize.HasManyAddAssociationsMixin<Actividad, ActividadId>;
  createActividad!: Sequelize.HasManyCreateAssociationMixin<Actividad>;
  removeActividad!: Sequelize.HasManyRemoveAssociationMixin<Actividad, ActividadId>;
  removeActividads!: Sequelize.HasManyRemoveAssociationsMixin<Actividad, ActividadId>;
  hasActividad!: Sequelize.HasManyHasAssociationMixin<Actividad, ActividadId>;
  hasActividads!: Sequelize.HasManyHasAssociationsMixin<Actividad, ActividadId>;
  countActividads!: Sequelize.HasManyCountAssociationsMixin;
  // Usuario belongsToMany Evaluacion via idUsuario and idEvaluacion
  idEvaluacion_Evaluacions!: Evaluacion[];
  getIdEvaluacion_Evaluacions!: Sequelize.BelongsToManyGetAssociationsMixin<Evaluacion>;
  setIdEvaluacion_Evaluacions!: Sequelize.BelongsToManySetAssociationsMixin<Evaluacion, EvaluacionId>;
  addIdEvaluacion_Evaluacion!: Sequelize.BelongsToManyAddAssociationMixin<Evaluacion, EvaluacionId>;
  addIdEvaluacion_Evaluacions!: Sequelize.BelongsToManyAddAssociationsMixin<Evaluacion, EvaluacionId>;
  createIdEvaluacion_Evaluacion!: Sequelize.BelongsToManyCreateAssociationMixin<Evaluacion>;
  removeIdEvaluacion_Evaluacion!: Sequelize.BelongsToManyRemoveAssociationMixin<Evaluacion, EvaluacionId>;
  removeIdEvaluacion_Evaluacions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Evaluacion, EvaluacionId>;
  hasIdEvaluacion_Evaluacion!: Sequelize.BelongsToManyHasAssociationMixin<Evaluacion, EvaluacionId>;
  hasIdEvaluacion_Evaluacions!: Sequelize.BelongsToManyHasAssociationsMixin<Evaluacion, EvaluacionId>;
  countIdEvaluacion_Evaluacions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Usuario hasMany EvaluacionItem via idUsuario
  EvaluacionItems!: EvaluacionItem[];
  getEvaluacionItems!: Sequelize.HasManyGetAssociationsMixin<EvaluacionItem>;
  setEvaluacionItems!: Sequelize.HasManySetAssociationsMixin<EvaluacionItem, EvaluacionItemId>;
  addEvaluacionItem!: Sequelize.HasManyAddAssociationMixin<EvaluacionItem, EvaluacionItemId>;
  addEvaluacionItems!: Sequelize.HasManyAddAssociationsMixin<EvaluacionItem, EvaluacionItemId>;
  createEvaluacionItem!: Sequelize.HasManyCreateAssociationMixin<EvaluacionItem>;
  removeEvaluacionItem!: Sequelize.HasManyRemoveAssociationMixin<EvaluacionItem, EvaluacionItemId>;
  removeEvaluacionItems!: Sequelize.HasManyRemoveAssociationsMixin<EvaluacionItem, EvaluacionItemId>;
  hasEvaluacionItem!: Sequelize.HasManyHasAssociationMixin<EvaluacionItem, EvaluacionItemId>;
  hasEvaluacionItems!: Sequelize.HasManyHasAssociationsMixin<EvaluacionItem, EvaluacionItemId>;
  countEvaluacionItems!: Sequelize.HasManyCountAssociationsMixin;
  // Usuario hasMany Propuesta via idUsuario
  Propuesta!: Propuesta[];
  getPropuesta!: Sequelize.HasManyGetAssociationsMixin<Propuesta>;
  setPropuesta!: Sequelize.HasManySetAssociationsMixin<Propuesta, PropuestaId>;
  addPropuestum!: Sequelize.HasManyAddAssociationMixin<Propuesta, PropuestaId>;
  addPropuesta!: Sequelize.HasManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createPropuestum!: Sequelize.HasManyCreateAssociationMixin<Propuesta>;
  removePropuestum!: Sequelize.HasManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removePropuesta!: Sequelize.HasManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasPropuestum!: Sequelize.HasManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasPropuesta!: Sequelize.HasManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countPropuesta!: Sequelize.HasManyCountAssociationsMixin;
  // Usuario hasMany UsuarioCategoria via idUsuario
  UsuarioCategoria!: UsuarioCategoria[];
  getUsuarioCategoria!: Sequelize.HasManyGetAssociationsMixin<UsuarioCategoria>;
  setUsuarioCategoria!: Sequelize.HasManySetAssociationsMixin<UsuarioCategoria, UsuarioCategoriaId>;
  addUsuarioCategorium!: Sequelize.HasManyAddAssociationMixin<UsuarioCategoria, UsuarioCategoriaId>;
  addUsuarioCategoria!: Sequelize.HasManyAddAssociationsMixin<UsuarioCategoria, UsuarioCategoriaId>;
  createUsuarioCategorium!: Sequelize.HasManyCreateAssociationMixin<UsuarioCategoria>;
  removeUsuarioCategorium!: Sequelize.HasManyRemoveAssociationMixin<UsuarioCategoria, UsuarioCategoriaId>;
  removeUsuarioCategoria!: Sequelize.HasManyRemoveAssociationsMixin<UsuarioCategoria, UsuarioCategoriaId>;
  hasUsuarioCategorium!: Sequelize.HasManyHasAssociationMixin<UsuarioCategoria, UsuarioCategoriaId>;
  hasUsuarioCategoria!: Sequelize.HasManyHasAssociationsMixin<UsuarioCategoria, UsuarioCategoriaId>;
  countUsuarioCategoria!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Usuario {
    return Usuario.init({
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false,
      references: {
        model: 'Persona',
        key: 'nroDoc'
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idUnidadAcademica: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pendiente: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'Usuario',
    timestamps: true,
    paranoid: true
  });
  }
}
