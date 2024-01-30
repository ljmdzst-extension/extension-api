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
  idActividad_Actividad!: Actividad;
  getIdActividad_Actividad!: Sequelize.BelongsToGetAssociationMixin<Actividad>;
  setIdActividad_Actividad!: Sequelize.BelongsToSetAssociationMixin<Actividad, ActividadId>;
  createIdActividad_Actividad!: Sequelize.BelongsToCreateAssociationMixin<Actividad>;
  // UbicacionActividad belongsTo Ubicacion via idUbicacion
  idUbicacion_Ubicacion!: Ubicacion;
  getIdUbicacion_Ubicacion!: Sequelize.BelongsToGetAssociationMixin<Ubicacion>;
  setIdUbicacion_Ubicacion!: Sequelize.BelongsToSetAssociationMixin<Ubicacion, UbicacionId>;
  createIdUbicacion_Ubicacion!: Sequelize.BelongsToCreateAssociationMixin<Ubicacion>;

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
