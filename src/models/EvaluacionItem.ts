import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Evaluacion, EvaluacionId } from './Evaluacion';
import type { Usuario, UsuarioId } from './Usuario';

export interface EvaluacionItemAttributes {
  idUsuario: string;
  idEvaluacion: number;
  indice: string;
  observ?: string;
  valoracion?: number;
}

export type EvaluacionItemPk = "idUsuario" | "idEvaluacion";
export type EvaluacionItemId = EvaluacionItem[EvaluacionItemPk];
export type EvaluacionItemOptionalAttributes = "observ" | "valoracion" ;
export type EvaluacionItemCreationAttributes = Optional<EvaluacionItemAttributes, EvaluacionItemOptionalAttributes>;

export class EvaluacionItem extends Model<EvaluacionItemAttributes, EvaluacionItemCreationAttributes> implements EvaluacionItemAttributes {
  idUsuario!: string;
  idEvaluacion!: number;
  indice!: string;
  observ?: string;
  valoracion?: number;

  // EvaluacionItem belongsTo Evaluacion via idEvaluacion
  idEvaluacion_Evaluacion!: Evaluacion;
  getIdEvaluacion_Evaluacion!: Sequelize.BelongsToGetAssociationMixin<Evaluacion>;
  setIdEvaluacion_Evaluacion!: Sequelize.BelongsToSetAssociationMixin<Evaluacion, EvaluacionId>;
  createIdEvaluacion_Evaluacion!: Sequelize.BelongsToCreateAssociationMixin<Evaluacion>;
  // EvaluacionItem belongsTo Usuario via idUsuario
  idUsuario_Usuario!: Usuario;
  getIdUsuario_Usuario!: Sequelize.BelongsToGetAssociationMixin<Usuario>;
  setIdUsuario_Usuario!: Sequelize.BelongsToSetAssociationMixin<Usuario, UsuarioId>;
  createIdUsuario_Usuario!: Sequelize.BelongsToCreateAssociationMixin<Usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof EvaluacionItem {
    return EvaluacionItem.init({
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Usuario',
        key: 'idUsuario'
      }
    },
    idEvaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Evaluacion',
        key: 'idEvaluacion'
      }
    },
    indice: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    observ: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    valoracion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'EvaluacionItem',
    timestamps: true,
    paranoid: true
  });
  }
}
