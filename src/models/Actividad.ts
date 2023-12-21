import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ActividadAttributes {
  idActividad: number;
  idArea: number;
  idUsuario?: string;
  nro?: number;
  desc: string;
  motivoCancel?: string;
  fechaDesde?: string;
  fechaHasta?: string;
}

export type ActividadPk = "idActividad";
export type ActividadId = Actividad[ActividadPk];
export type ActividadOptionalAttributes = "idActividad" | "idUsuario" | "nro" | "motivoCancel" | "fechaDesde" | "fechaHasta";
export type ActividadCreationAttributes = Optional<ActividadAttributes, ActividadOptionalAttributes>;

export class Actividad extends Model<ActividadAttributes, ActividadCreationAttributes> implements ActividadAttributes {
  idActividad!: number;
  idArea!: number;
  idUsuario?: string;
  nro?: number;
  desc!: string;
  motivoCancel?: string;
  fechaDesde?: string;
  fechaHasta?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Actividad {
    return Actividad.init({
    idActividad: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idArea: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nro: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    motivoCancel: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    fechaDesde: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fechaHasta: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Actividad',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idActividad" },
        ]
      },
      {
        name: "fkActividadArea1_idx",
        using: "BTREE",
        fields: [
          { name: "idArea" },
        ]
      },
      {
        name: "fkActividadUsuario1_idx",
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
    ]
  });
  }
}
