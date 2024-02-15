import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Evaluacion, EvaluacionId } from './Evaluacion';

export interface TipoEvaluacionAttributes {
  idTipoEvaluacion: number;
  nom: string;
}

export type TipoEvaluacionPk = "idTipoEvaluacion";
export type TipoEvaluacionId = TipoEvaluacion[TipoEvaluacionPk];
export type TipoEvaluacionCreationAttributes = TipoEvaluacionAttributes;

export class TipoEvaluacion extends Model<TipoEvaluacionAttributes, TipoEvaluacionCreationAttributes> implements TipoEvaluacionAttributes {
  idTipoEvaluacion!: number;
  nom!: string;

  // TipoEvaluacion hasMany Evaluacion via idTipoEvaluacion
  evaluacions!: Evaluacion[];
  getEvaluacions!: Sequelize.HasManyGetAssociationsMixin<Evaluacion>;
  setEvaluacions!: Sequelize.HasManySetAssociationsMixin<Evaluacion, EvaluacionId>;
  addEvaluacion!: Sequelize.HasManyAddAssociationMixin<Evaluacion, EvaluacionId>;
  addEvaluacions!: Sequelize.HasManyAddAssociationsMixin<Evaluacion, EvaluacionId>;
  createEvaluacion!: Sequelize.HasManyCreateAssociationMixin<Evaluacion>;
  removeEvaluacion!: Sequelize.HasManyRemoveAssociationMixin<Evaluacion, EvaluacionId>;
  removeEvaluacions!: Sequelize.HasManyRemoveAssociationsMixin<Evaluacion, EvaluacionId>;
  hasEvaluacion!: Sequelize.HasManyHasAssociationMixin<Evaluacion, EvaluacionId>;
  hasEvaluacions!: Sequelize.HasManyHasAssociationsMixin<Evaluacion, EvaluacionId>;
  countEvaluacions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof TipoEvaluacion {
    return TipoEvaluacion.init({
    idTipoEvaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TipoEvaluacion',
    timestamps: false
  });
  }
}
