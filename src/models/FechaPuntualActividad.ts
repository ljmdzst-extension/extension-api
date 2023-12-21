import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface FechaPuntualActividadAttributes {
  idFecha: number;
  idActividad: number;
}
export type FechaPuntualActividadPk = "idFecha" | "idActividad";
export type FechaPuntualActividadId = FechaPuntualActividad[FechaPuntualActividadPk];

export class FechaPuntualActividad extends Model<FechaPuntualActividadAttributes> implements FechaPuntualActividadAttributes {
  idFecha!: number;
  idActividad!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof FechaPuntualActividad {
    return FechaPuntualActividad.init({
    idFecha: {
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
    tableName: 'FechaPuntualActividad',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idFecha" },
          { name: "idActividad" },
        ]
      },
      {
        name: "FechaPuntualActividad_idFecha_idActividad_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idFecha" },
          { name: "idActividad" },
        ]
      },
      {
        name: "fkFechaPuntualActividadActividad1_idx",
        using: "BTREE",
        fields: [
          { name: "idActividad" },
        ]
      },
      {
        name: "fkFechaPuntualActividadFechaPuntual1_idx",
        using: "BTREE",
        fields: [
          { name: "idFecha" },
        ]
      },
    ]
  });
  }
}
