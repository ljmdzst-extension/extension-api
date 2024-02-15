import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { Ubicacion, UbicacionId } from './Ubicacion';

export interface UbicacionActividadAttributes {
  idActividad: number;
  idUbicacion: number;
}

export type UbicacionActividadPk = "idActividad" | "idUbicacion";
export type UbicacionActividadId = UbicacionActividad[UbicacionActividadPk];
export type UbicacionActividadCreationAttributes = UbicacionActividadAttributes;

export class UbicacionActividad extends Model<UbicacionActividadAttributes, UbicacionActividadCreationAttributes> implements UbicacionActividadAttributes {
  idActividad!: number;
  idUbicacion!: number;

  // UbicacionActividad belongsTo Actividad via idActividad
  idActividadActividad!: Actividad;
  getIdActividadActividad!: Sequelize.BelongsToGetAssociationMixin<Actividad>;
  setIdActividadActividad!: Sequelize.BelongsToSetAssociationMixin<Actividad, ActividadId>;
  createIdActividadActividad!: Sequelize.BelongsToCreateAssociationMixin<Actividad>;
  // UbicacionActividad belongsTo Ubicacion via idUbicacion
  idUbicacionUbicacion!: Ubicacion;
  getIdUbicacionUbicacion!: Sequelize.BelongsToGetAssociationMixin<Ubicacion>;
  setIdUbicacionUbicacion!: Sequelize.BelongsToSetAssociationMixin<Ubicacion, UbicacionId>;
  createIdUbicacionUbicacion!: Sequelize.BelongsToCreateAssociationMixin<Ubicacion>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UbicacionActividad {
    return UbicacionActividad.init({
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Actividad',
        key: 'idActividad'
      }
    },
    idUbicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Ubicacion',
        key: 'idUbicacion'
      }
    }
  }, {
    sequelize,
    tableName: 'UbicacionActividad',
    timestamps: true,
    paranoid: true
  });
  }
}
