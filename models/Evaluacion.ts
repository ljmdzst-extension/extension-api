import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface EvaluacionAttributes {
  idTipoEvaluacion: number;
  idEvaluacion: number;
  codigoPropuesta: string;
  observFinal?: string;
  valoracionFinal?: number;
  puntaje?: number;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt: Date;
}

export type EvaluacionPk = "idEvaluacion";
export type EvaluacionId = Evaluacion[EvaluacionPk];
export type EvaluacionOptionalAttributes = "observFinal" | "valoracionFinal" | "puntaje" | "createdAt" | "deletedAt" | "updatedAt";
export type EvaluacionCreationAttributes = Optional<EvaluacionAttributes, EvaluacionOptionalAttributes>;

export class Evaluacion extends Model<EvaluacionAttributes, EvaluacionCreationAttributes> implements EvaluacionAttributes {
  idTipoEvaluacion!: number;
  idEvaluacion!: number;
  codigoPropuesta!: string;
  observFinal?: string;
  valoracionFinal?: number;
  puntaje?: number;
  createdAt!: Date;
  deletedAt?: Date;
  updatedAt!: Date;


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
