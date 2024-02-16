import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { Categoria, CategoriaId } from './Categoria';
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
  persona!: Persona;
  getPersona!: Sequelize.BelongsToGetAssociationMixin<Persona>;
  setPersona!: Sequelize.BelongsToSetAssociationMixin<Persona, PersonaId>;
  createNroDocPersona!: Sequelize.BelongsToCreateAssociationMixin<Persona>;
  // Usuario hasMany Actividad via idUsuario
  actividades!: Actividad[];
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
  // Usuario belongsToMany Categoria via idUsuario and idCategoria
  idCategoriaCategoriaUsuarioCategoria!: Categoria[];
  getIdCategoriaCategoriaUsuarioCategoria!: Sequelize.BelongsToManyGetAssociationsMixin<Categoria>;
  setIdCategoriaCategoriaUsuarioCategoria!: Sequelize.BelongsToManySetAssociationsMixin<Categoria, CategoriaId>;
  addIdCategoriaCategoriaUsuarioCategorium!: Sequelize.BelongsToManyAddAssociationMixin<Categoria, CategoriaId>;
  addIdCategoriaCategoriaUsuarioCategoria!: Sequelize.BelongsToManyAddAssociationsMixin<Categoria, CategoriaId>;
  createIdCategoriaCategoriaUsuarioCategorium!: Sequelize.BelongsToManyCreateAssociationMixin<Categoria>;
  removeIdCategoriaCategoriaUsuarioCategorium!: Sequelize.BelongsToManyRemoveAssociationMixin<Categoria, CategoriaId>;
  removeIdCategoriaCategoriaUsuarioCategoria!: Sequelize.BelongsToManyRemoveAssociationsMixin<Categoria, CategoriaId>;
  hasIdCategoriaCategoriaUsuarioCategorium!: Sequelize.BelongsToManyHasAssociationMixin<Categoria, CategoriaId>;
  hasIdCategoriaCategoriaUsuarioCategoria!: Sequelize.BelongsToManyHasAssociationsMixin<Categoria, CategoriaId>;
  countIdCategoriaCategoriaUsuarioCategoria!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Usuario belongsToMany Evaluacion via idUsuario and idEvaluacion
  idEvaluacionEvaluacions!: Evaluacion[];
  getIdEvaluacionEvaluacions!: Sequelize.BelongsToManyGetAssociationsMixin<Evaluacion>;
  setIdEvaluacionEvaluacions!: Sequelize.BelongsToManySetAssociationsMixin<Evaluacion, EvaluacionId>;
  addIdEvaluacionEvaluacion!: Sequelize.BelongsToManyAddAssociationMixin<Evaluacion, EvaluacionId>;
  addIdEvaluacionEvaluacions!: Sequelize.BelongsToManyAddAssociationsMixin<Evaluacion, EvaluacionId>;
  createIdEvaluacionEvaluacion!: Sequelize.BelongsToManyCreateAssociationMixin<Evaluacion>;
  removeIdEvaluacionEvaluacion!: Sequelize.BelongsToManyRemoveAssociationMixin<Evaluacion, EvaluacionId>;
  removeIdEvaluacionEvaluacions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Evaluacion, EvaluacionId>;
  hasIdEvaluacionEvaluacion!: Sequelize.BelongsToManyHasAssociationMixin<Evaluacion, EvaluacionId>;
  hasIdEvaluacionEvaluacions!: Sequelize.BelongsToManyHasAssociationsMixin<Evaluacion, EvaluacionId>;
  countIdEvaluacionEvaluacions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Usuario hasMany EvaluacionItem via idUsuario
  evaluacionItems!: EvaluacionItem[];
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
  propuestas!: Propuesta[];
  getPropuestas!: Sequelize.HasManyGetAssociationsMixin<Propuesta>;
  setPropuestas!: Sequelize.HasManySetAssociationsMixin<Propuesta, PropuestaId>;
  addPropuestas!: Sequelize.HasManyAddAssociationsMixin<Propuesta, PropuestaId>;
  removePropuestas!: Sequelize.HasManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasPropuestas!: Sequelize.HasManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countPropuestas!: Sequelize.HasManyCountAssociationsMixin;
  // Usuario hasMany UsuarioCategoria via idUsuario
  usuarioCategoria!: UsuarioCategoria[];
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
