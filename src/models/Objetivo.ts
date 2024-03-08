import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { ObjetivoActividad, ObjetivoActividadId } from './ObjetivoActividad';
import type { TipoObjetivo, TipoObjetivoId } from './TipoObjetivo';

export interface ObjetivoAttributes {
  idObjetivo: number;
  nom: string;
  detalle?: string;
  tipoObjId: number;
}

export type ObjetivoPk = "idObjetivo";
export type ObjetivoId = Objetivo[ObjetivoPk];
export type ObjetivoOptionalAttributes = "idObjetivo" | "detalle";
export type ObjetivoCreationAttributes = Optional<ObjetivoAttributes, ObjetivoOptionalAttributes>;

export class Objetivo extends Model<ObjetivoAttributes, ObjetivoCreationAttributes> implements ObjetivoAttributes {
  idObjetivo!: number;
  nom!: string;
  detalle?: string;
  tipoObjId!: number;

  // Objetivo belongsToMany Actividad via idObjetivo and idActividad
  idActividadActividadObjetivoActividads!: Actividad[];
  getIdActividadActividadObjetivoActividads!: Sequelize.BelongsToManyGetAssociationsMixin<Actividad>;
  setIdActividadActividadObjetivoActividads!: Sequelize.BelongsToManySetAssociationsMixin<Actividad, ActividadId>;
  addIdActividadActividadObjetivoActividad!: Sequelize.BelongsToManyAddAssociationMixin<Actividad, ActividadId>;
  addIdActividadActividadObjetivoActividads!: Sequelize.BelongsToManyAddAssociationsMixin<Actividad, ActividadId>;
  createIdActividadActividadObjetivoActividad!: Sequelize.BelongsToManyCreateAssociationMixin<Actividad>;
  removeIdActividadActividadObjetivoActividad!: Sequelize.BelongsToManyRemoveAssociationMixin<Actividad, ActividadId>;
  removeIdActividadActividadObjetivoActividads!: Sequelize.BelongsToManyRemoveAssociationsMixin<Actividad, ActividadId>;
  hasIdActividadActividadObjetivoActividad!: Sequelize.BelongsToManyHasAssociationMixin<Actividad, ActividadId>;
  hasIdActividadActividadObjetivoActividads!: Sequelize.BelongsToManyHasAssociationsMixin<Actividad, ActividadId>;
  countIdActividadActividadObjetivoActividads!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Objetivo hasMany ObjetivoActividad via idObjetivo
  objetivoActividads!: ObjetivoActividad[];
  getObjetivoActividads!: Sequelize.HasManyGetAssociationsMixin<ObjetivoActividad>;
  setObjetivoActividads!: Sequelize.HasManySetAssociationsMixin<ObjetivoActividad, ObjetivoActividadId>;
  addObjetivoActividad!: Sequelize.HasManyAddAssociationMixin<ObjetivoActividad, ObjetivoActividadId>;
  addObjetivoActividads!: Sequelize.HasManyAddAssociationsMixin<ObjetivoActividad, ObjetivoActividadId>;
  createObjetivoActividad!: Sequelize.HasManyCreateAssociationMixin<ObjetivoActividad>;
  removeObjetivoActividad!: Sequelize.HasManyRemoveAssociationMixin<ObjetivoActividad, ObjetivoActividadId>;
  removeObjetivoActividads!: Sequelize.HasManyRemoveAssociationsMixin<ObjetivoActividad, ObjetivoActividadId>;
  hasObjetivoActividad!: Sequelize.HasManyHasAssociationMixin<ObjetivoActividad, ObjetivoActividadId>;
  hasObjetivoActividads!: Sequelize.HasManyHasAssociationsMixin<ObjetivoActividad, ObjetivoActividadId>;
  countObjetivoActividads!: Sequelize.HasManyCountAssociationsMixin;
  // Objetivo belongsTo TipoObjetivo via tipoObjId
  tipoObj!: TipoObjetivo;
  getTipoObj!: Sequelize.BelongsToGetAssociationMixin<TipoObjetivo>;
  setTipoObj!: Sequelize.BelongsToSetAssociationMixin<TipoObjetivo, TipoObjetivoId>;
  createTipoObj!: Sequelize.BelongsToCreateAssociationMixin<TipoObjetivo>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Objetivo {
    return Objetivo.init({
    idObjetivo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    detalle: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    tipoObjId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TipoObjetivo',
        key: 'idTipoObj'
      },
      field: 'tipo_obj_id'
    }
  }, {
    sequelize,
    tableName: 'Objetivo',
    timestamps: false
  });
  }
}
