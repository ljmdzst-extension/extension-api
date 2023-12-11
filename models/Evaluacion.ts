import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { EvaluacionItem, EvaluacionItemId } from './EvaluacionItem';
import type { Propuesta, PropuestaId } from './Propuesta';
import type { TipoEvaluacion, TipoEvaluacionId } from './TipoEvaluacion';

export interface EvaluacionAttributes {
  codigoPropuesta: string;
  idTipoEvaluacion: number;
  observFinal?: string;
  valoracionFinal?: number;
  puntaje?: number;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt: Date;
}

export type EvaluacionPk = "codigoPropuesta" | "idTipoEvaluacion";
export type EvaluacionId = Evaluacion[EvaluacionPk];
export type EvaluacionOptionalAttributes = "observFinal" | "valoracionFinal" | "puntaje" | "createdAt" | "deletedAt" | "updatedAt";
export type EvaluacionCreationAttributes = Optional<EvaluacionAttributes, EvaluacionOptionalAttributes>;

export class Evaluacion extends Model<EvaluacionAttributes, EvaluacionCreationAttributes> implements EvaluacionAttributes {
  codigoPropuesta!: string;
  idTipoEvaluacion!: number;
  observFinal?: string;
  valoracionFinal?: number;
  puntaje?: number;
  createdAt!: Date;
  deletedAt?: Date;
  updatedAt!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Evaluacion {
    return Evaluacion.init({
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
    },
    idTipoEvaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'TipoEvaluacion',
        key: 'idTipoEvaluacion'
      }
    },
    observFinal: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    valoracionFinal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    puntaje: {
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
    tableName: 'Evaluacion',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
          { name: "idTipoEvaluacion" },
        ]
      },
      {
        name: "fk_Evaluacion_EvaluacionInstancia1_idx",
        using: "BTREE",
        fields: [
          { name: "idTipoEvaluacion" },
        ]
      },
      {
        name: "fkEvaluacionPropuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
    ]
  });
  }
}
