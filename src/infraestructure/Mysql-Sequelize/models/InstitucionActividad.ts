import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { Institucion, InstitucionId } from './Institucion';

export interface InstitucionActividadAttributes {
  idActividad: number;
  idInstitucion: number;
}

export type InstitucionActividadPk = "idActividad" | "idInstitucion";
export type InstitucionActividadId = InstitucionActividad[InstitucionActividadPk];
export type InstitucionActividadCreationAttributes = InstitucionActividadAttributes;

export class InstitucionActividad extends Model<InstitucionActividadAttributes, InstitucionActividadCreationAttributes> implements InstitucionActividadAttributes {
  idActividad!: number;
  idInstitucion!: number;

 
  static initModel(sequelize: Sequelize.Sequelize): typeof InstitucionActividad {
    return InstitucionActividad.init({
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Actividad',
        key: 'idActividad'
      }
    },
    idInstitucion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Institucion',
        key: 'idInstitucion'
      }
    }
  }, {
    sequelize,
    tableName: 'InstitucionActividad',
    timestamps: true,
    paranoid: true
  });
  }
}
