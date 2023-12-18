import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UbicacionActividadAttributes {
  idActividad: number;
  idUbicacion: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type UbicacionActividadPk = "idActividad" | "idUbicacion";
export type UbicacionActividadId = UbicacionActividad[UbicacionActividadPk];
export type UbicacionActividadOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type UbicacionActividadCreationAttributes = Optional<UbicacionActividadAttributes, UbicacionActividadOptionalAttributes>;

export class UbicacionActividad extends Model<UbicacionActividadAttributes, UbicacionActividadCreationAttributes> implements UbicacionActividadAttributes {
  idActividad!: number;
  idUbicacion!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


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
