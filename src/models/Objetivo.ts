import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { ObjetivoActividad, ObjetivoActividadId } from './ObjetivoActividad';
import type { TipoObjetivo, TipoObjetivoId } from './TipoObjetivo';

export interface ObjetivoAttributes {
  idObjetivo: number;
  nom: string;
  detalle?: string;
  tipo_obj_id: number;
}

export type ObjetivoPk = "idObjetivo";
export type ObjetivoId = Objetivo[ObjetivoPk];
export type ObjetivoOptionalAttributes = "idObjetivo" | "detalle";
export type ObjetivoCreationAttributes = Optional<ObjetivoAttributes, ObjetivoOptionalAttributes>;

export class Objetivo extends Model<ObjetivoAttributes, ObjetivoCreationAttributes> implements ObjetivoAttributes {
  idObjetivo!: number;
  nom!: string;
  detalle?: string;
  tipo_obj_id!: number;

  // Objetivo belongsToMany Actividad via idObjetivo and idActividad
  idActividad_Actividad_ObjetivoActividads!: Actividad[];
  getIdActividad_Actividad_ObjetivoActividads!: Sequelize.BelongsToManyGetAssociationsMixin<Actividad>;
  setIdActividad_Actividad_ObjetivoActividads!: Sequelize.BelongsToManySetAssociationsMixin<Actividad, ActividadId>;
  addIdActividad_Actividad_ObjetivoActividad!: Sequelize.BelongsToManyAddAssociationMixin<Actividad, ActividadId>;
  addIdActividad_Actividad_ObjetivoActividads!: Sequelize.BelongsToManyAddAssociationsMixin<Actividad, ActividadId>;
  createIdActividad_Actividad_ObjetivoActividad!: Sequelize.BelongsToManyCreateAssociationMixin<Actividad>;
  removeIdActividad_Actividad_ObjetivoActividad!: Sequelize.BelongsToManyRemoveAssociationMixin<Actividad, ActividadId>;
  removeIdActividad_Actividad_ObjetivoActividads!: Sequelize.BelongsToManyRemoveAssociationsMixin<Actividad, ActividadId>;
  hasIdActividad_Actividad_ObjetivoActividad!: Sequelize.BelongsToManyHasAssociationMixin<Actividad, ActividadId>;
  hasIdActividad_Actividad_ObjetivoActividads!: Sequelize.BelongsToManyHasAssociationsMixin<Actividad, ActividadId>;
  countIdActividad_Actividad_ObjetivoActividads!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Objetivo hasMany ObjetivoActividad via idObjetivo
  ObjetivoActividads!: ObjetivoActividad[];
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
  // Objetivo belongsTo TipoObjetivo via tipo_obj_id
  tipo_obj!: TipoObjetivo;
  getTipo_obj!: Sequelize.BelongsToGetAssociationMixin<TipoObjetivo>;
  setTipo_obj!: Sequelize.BelongsToSetAssociationMixin<TipoObjetivo, TipoObjetivoId>;
  createTipo_obj!: Sequelize.BelongsToCreateAssociationMixin<TipoObjetivo>;

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
    tipo_obj_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TipoObjetivo',
        key: 'idTipoObj'
      }
    }
  }, {
    sequelize,
    tableName: 'Objetivo',
    timestamps: false
  });
  }
}
