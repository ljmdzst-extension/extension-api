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

const CONSTRAINT_ATTRIBUTES = {
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
}

const CONSTRAINT_OPTIONS = ()
export class UbicacionActividad extends Model<UbicacionActividadAttributes, UbicacionActividadCreationAttributes> implements UbicacionActividadAttributes {
  idActividad!: number;
  idUbicacion!: number;

 
  static initModel(sequelize: Sequelize.Sequelize): typeof UbicacionActividad {
    return UbicacionActividad.init(, {
    sequelize,
    tableName: 'UbicacionActividad',
    timestamps: true,
    paranoid: true
  });
  }
}
