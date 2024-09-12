import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

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


const CONSTRAINT_OPTIONS = (sequelize : Sequelize.Sequelize )=>({
  sequelize,
  tableName: 'UbicacionActividad',
  timestamps: true,
  paranoid: true
})

export class UbicacionActividad extends Model<UbicacionActividadAttributes, UbicacionActividadCreationAttributes> implements UbicacionActividadAttributes {
  idActividad!: number;
  idUbicacion!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof UbicacionActividad {
    return UbicacionActividad.init(CONSTRAINT_ATTRIBUTES, CONSTRAINT_OPTIONS(sequelize));
  }
}
