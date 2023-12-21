import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface EvaluacionAttributes {
  idTipoEvaluacion: number;
  idEvaluacion: number;
  codigoPropuesta: string;
  observFinal?: string;
  valoracionFinal?: number;
  puntaje?: number;
}

export type EvaluacionPk = "idEvaluacion";
export type EvaluacionId = Evaluacion[EvaluacionPk];
export type EvaluacionOptionalAttributes = "observFinal" | "valoracionFinal" | "puntaje"
export type EvaluacionCreationAttributes = Optional<EvaluacionAttributes, EvaluacionOptionalAttributes>;

export class Evaluacion extends Model<EvaluacionAttributes, EvaluacionCreationAttributes> implements EvaluacionAttributes {
  idTipoEvaluacion!: number;
  idEvaluacion!: number;
  codigoPropuesta!: string;
  observFinal?: string;
  valoracionFinal?: number;
  puntaje?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Evaluacion {
    return Evaluacion.init({
    idTipoEvaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idEvaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false
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
          { name: "idEvaluacion" },
        ]
      },
      {
        name: "fkEvaluacionPropuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
      {
        name: "fkEvaluacionTipoEvaluacion1_idx",
        using: "BTREE",
        fields: [
          { name: "idTipoEvaluacion" },
        ]
      },
    ]
  });
  }
}
