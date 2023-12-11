import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Evaluacion, EvaluacionId } from './Evaluacion';

export interface EvaluacionItemAttributes {
  idUsuario: string;
  codigoPropuesta: string;
  idTipoEvaluacion: number;
  indice: string;
  observ?: string;
  valoracion?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type EvaluacionItemPk = "idUsuario" | "codigoPropuesta" | "idTipoEvaluacion";
export type EvaluacionItemId = EvaluacionItem[EvaluacionItemPk];
export type EvaluacionItemOptionalAttributes = "observ" | "valoracion" | "createdAt" | "updatedAt" | "deletedAt";
export type EvaluacionItemCreationAttributes = Optional<EvaluacionItemAttributes, EvaluacionItemOptionalAttributes>;

export class EvaluacionItem extends Model<EvaluacionItemAttributes, EvaluacionItemCreationAttributes> implements EvaluacionItemAttributes {
  idUsuario!: string;
  codigoPropuesta!: string;
  idTipoEvaluacion!: number;
  indice!: string;
  observ?: string;
  valoracion?: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

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
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Evaluacion',
        key: 'codigoPropuesta'
      }
    },
    idTipoEvaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Evaluacion',
        key: 'idTipoEvaluacion'
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
    },
    createdAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    updatedAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    deletedAt : {
      type : DataTypes.DATE,
      allowNull : true
    }
  }, {
    sequelize,
    tableName: 'EvaluacionItem',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
          { name: "codigoPropuesta" },
          { name: "idTipoEvaluacion" },
        ]
      },
      {
        name: "fk_EvaluacionItem_Usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
      {
        name: "fkEvaluacionItemEvaluacion1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
          { name: "idTipoEvaluacion" },
        ]
      },
    ]
  });
  }
}
