import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTipoEvaluacion" },
        ]
      },
    ]
  });
  }
}
