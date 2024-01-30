import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { Carrera, CarreraId } from './Carrera';
import type { Integrante, IntegranteId } from './Integrante';
import type { RelacionActividad, RelacionActividadId } from './RelacionActividad';
import type { TipoRelacion, TipoRelacionId } from './TipoRelacion';

export interface RelacionAttributes {
  idRelacion: number;
  nom: string;
  idTipoRelacion: number;
}

export type RelacionPk = "idRelacion";
export type RelacionId = Relacion[RelacionPk];
export type RelacionOptionalAttributes = "idRelacion";
export type RelacionCreationAttributes = Optional<RelacionAttributes, RelacionOptionalAttributes>;

export class Relacion extends Model<RelacionAttributes, RelacionCreationAttributes> implements RelacionAttributes {
  idRelacion!: number;
  nom!: string;
  idTipoRelacion!: number;

  // Relacion belongsToMany Actividad via idRelacion and idActividad
  idActividad_Actividad_RelacionActividads!: Actividad[];
  getIdActividad_Actividad_RelacionActividads!: Sequelize.BelongsToManyGetAssociationsMixin<Actividad>;
  setIdActividad_Actividad_RelacionActividads!: Sequelize.BelongsToManySetAssociationsMixin<Actividad, ActividadId>;
  addIdActividad_Actividad_RelacionActividad!: Sequelize.BelongsToManyAddAssociationMixin<Actividad, ActividadId>;
  addIdActividad_Actividad_RelacionActividads!: Sequelize.BelongsToManyAddAssociationsMixin<Actividad, ActividadId>;
  createIdActividad_Actividad_RelacionActividad!: Sequelize.BelongsToManyCreateAssociationMixin<Actividad>;
  removeIdActividad_Actividad_RelacionActividad!: Sequelize.BelongsToManyRemoveAssociationMixin<Actividad, ActividadId>;
  removeIdActividad_Actividad_RelacionActividads!: Sequelize.BelongsToManyRemoveAssociationsMixin<Actividad, ActividadId>;
  hasIdActividad_Actividad_RelacionActividad!: Sequelize.BelongsToManyHasAssociationMixin<Actividad, ActividadId>;
  hasIdActividad_Actividad_RelacionActividads!: Sequelize.BelongsToManyHasAssociationsMixin<Actividad, ActividadId>;
  countIdActividad_Actividad_RelacionActividads!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Relacion hasMany Carrera via idUnidadAcademica
  Carreras!: Carrera[];
  getCarreras!: Sequelize.HasManyGetAssociationsMixin<Carrera>;
  setCarreras!: Sequelize.HasManySetAssociationsMixin<Carrera, CarreraId>;
  addCarrera!: Sequelize.HasManyAddAssociationMixin<Carrera, CarreraId>;
  addCarreras!: Sequelize.HasManyAddAssociationsMixin<Carrera, CarreraId>;
  createCarrera!: Sequelize.HasManyCreateAssociationMixin<Carrera>;
  removeCarrera!: Sequelize.HasManyRemoveAssociationMixin<Carrera, CarreraId>;
  removeCarreras!: Sequelize.HasManyRemoveAssociationsMixin<Carrera, CarreraId>;
  hasCarrera!: Sequelize.HasManyHasAssociationMixin<Carrera, CarreraId>;
  hasCarreras!: Sequelize.HasManyHasAssociationsMixin<Carrera, CarreraId>;
  countCarreras!: Sequelize.HasManyCountAssociationsMixin;
  // Relacion hasMany Integrante via idAreaUNL
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
  // Relacion hasMany RelacionActividad via idRelacion
  RelacionActividads!: RelacionActividad[];
  getRelacionActividads!: Sequelize.HasManyGetAssociationsMixin<RelacionActividad>;
  setRelacionActividads!: Sequelize.HasManySetAssociationsMixin<RelacionActividad, RelacionActividadId>;
  addRelacionActividad!: Sequelize.HasManyAddAssociationMixin<RelacionActividad, RelacionActividadId>;
  addRelacionActividads!: Sequelize.HasManyAddAssociationsMixin<RelacionActividad, RelacionActividadId>;
  createRelacionActividad!: Sequelize.HasManyCreateAssociationMixin<RelacionActividad>;
  removeRelacionActividad!: Sequelize.HasManyRemoveAssociationMixin<RelacionActividad, RelacionActividadId>;
  removeRelacionActividads!: Sequelize.HasManyRemoveAssociationsMixin<RelacionActividad, RelacionActividadId>;
  hasRelacionActividad!: Sequelize.HasManyHasAssociationMixin<RelacionActividad, RelacionActividadId>;
  hasRelacionActividads!: Sequelize.HasManyHasAssociationsMixin<RelacionActividad, RelacionActividadId>;
  countRelacionActividads!: Sequelize.HasManyCountAssociationsMixin;
  // Relacion belongsTo TipoRelacion via idTipoRelacion
  idTipoRelacion_TipoRelacion!: TipoRelacion;
  getIdTipoRelacion_TipoRelacion!: Sequelize.BelongsToGetAssociationMixin<TipoRelacion>;
  setIdTipoRelacion_TipoRelacion!: Sequelize.BelongsToSetAssociationMixin<TipoRelacion, TipoRelacionId>;
  createIdTipoRelacion_TipoRelacion!: Sequelize.BelongsToCreateAssociationMixin<TipoRelacion>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Relacion {
    return Relacion.init({
    idRelacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idTipoRelacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TipoRelacion',
        key: 'idTipoRelacion'
      }
    }
  }, {
    sequelize,
    tableName: 'Relacion',
    timestamps: false
  });
  }
}
