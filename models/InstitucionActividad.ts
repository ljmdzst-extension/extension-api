import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface InstitucionActividadAttributes {
  idActividad: number;
  idInstitucion: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type InstitucionActividadPk = "idActividad" | "idInstitucion";
export type InstitucionActividadId = InstitucionActividad[InstitucionActividadPk];
export type InstitucionActividadOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type InstitucionActividadCreationAttributes = Optional<InstitucionActividadAttributes, InstitucionActividadOptionalAttributes>;

export class InstitucionActividad extends Model<InstitucionActividadAttributes, InstitucionActividadCreationAttributes> implements InstitucionActividadAttributes {
  idActividad!: number;
  idInstitucion!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof InstitucionActividad {
    return InstitucionActividad.init({
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idInstitucion: {
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
    tableName: 'InstitucionActividad',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idActividad" },
          { name: "idInstitucion" },
        ]
      },
      {
        name: "fk_actividadHasInstitucion_actividad1_idx",
        using: "BTREE",
        fields: [
          { name: "idActividad" },
        ]
      },
      {
        name: "fkInstitucionActividadInstitucion1_idx",
        using: "BTREE",
        fields: [
          { name: "idInstitucion" },
        ]
      },
    ]
  });
  }
}
