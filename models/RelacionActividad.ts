import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface RelacionActividadAttributes {
  idRelacion: number;
  idActividad: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type RelacionActividadPk = "idRelacion" | "idActividad";
export type RelacionActividadId = RelacionActividad[RelacionActividadPk];
export type RelacionActividadOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type RelacionActividadCreationAttributes = Optional<RelacionActividadAttributes, RelacionActividadOptionalAttributes>;

export class RelacionActividad extends Model<RelacionActividadAttributes, RelacionActividadCreationAttributes> implements RelacionActividadAttributes {
  idRelacion!: number;
  idActividad!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof RelacionActividad {
    return RelacionActividad.init({
    idRelacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idActividad: {
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
    tableName: 'RelacionActividad',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idRelacion" },
          { name: "idActividad" },
        ]
      },
      {
        name: "RelacionActividad_idRelacion_idActividad_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idRelacion" },
          { name: "idActividad" },
        ]
      },
      {
        name: "fkRelacionActividadActividad1_idx",
        using: "BTREE",
        fields: [
          { name: "idActividad" },
        ]
      },
      {
        name: "fkRelacionActividadRelacion1_idx",
        using: "BTREE",
        fields: [
          { name: "idRelacion" },
        ]
      },
    ]
  });
  }
}
