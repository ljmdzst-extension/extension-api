import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ObjetivoActividadAttributes {
  idObjetivo: number;
  idActividad: number;
}

export type ObjetivoActividadPk = "idObjetivo" | "idActividad";
export type ObjetivoActividadId = ObjetivoActividad[ObjetivoActividadPk];

export class ObjetivoActividad extends Model<ObjetivoActividadAttributes> implements ObjetivoActividadAttributes {
  idObjetivo!: number;
  idActividad!: number;



  static initModel(sequelize: Sequelize.Sequelize): typeof ObjetivoActividad {
    return ObjetivoActividad.init({
    idObjetivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'ObjetivoActividad',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idObjetivo" },
          { name: "idActividad" },
        ]
      },
      {
        name: "ObjetivoActividad_idObjetivo_idActividad_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idObjetivo" },
          { name: "idActividad" },
        ]
      },
      {
        name: "fkObjetivoActividadActividad1_idx",
        using: "BTREE",
        fields: [
          { name: "idActividad" },
        ]
      },
      {
        name: "fkObjetivoActividadObjetivo1_idx",
        using: "BTREE",
        fields: [
          { name: "idObjetivo" },
        ]
      },
    ]
  });
  }
}
