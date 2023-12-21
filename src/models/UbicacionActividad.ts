import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

export interface UbicacionActividadAttributes {
  idActividad: number;
  idUbicacion: number;
}

export type UbicacionActividadPk = "idActividad" | "idUbicacion";
export type UbicacionActividadId = UbicacionActividad[UbicacionActividadPk];
export class UbicacionActividad extends Model<UbicacionActividadAttributes > implements UbicacionActividadAttributes {
  idActividad!: number;
  idUbicacion!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof UbicacionActividad {
    return UbicacionActividad.init({
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idUbicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'UbicacionActividad',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idActividad" },
          { name: "idUbicacion" },
        ]
      },
      {
        name: "fkUbicacionActividadUbicacion1_idx",
        using: "BTREE",
        fields: [
          { name: "idUbicacion" },
        ]
      },
    ]
  });
  }
}
