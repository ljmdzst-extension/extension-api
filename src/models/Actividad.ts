import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional, Transaction } from 'sequelize';
import { Area, AreaId } from './Area';
import { Enlace, EnlaceAttributes, EnlaceCreationAttributes, EnlaceId, EnlaceOptionalAttributes } from './Enlace';
import { FechaPuntual, FechaPuntualAttributes, FechaPuntualCreationAttributes, FechaPuntualId } from './FechaPuntual';
import { FechaPuntualActividad, FechaPuntualActividadId } from './FechaPuntualActividad';
import { Institucion, InstitucionAttributes, InstitucionCreationAttributes, InstitucionId } from './Institucion';
import { InstitucionActividad, InstitucionActividadId } from './InstitucionActividad';
import { Meta, MetaAttributes, MetaCreationAttributes, MetaId } from './Meta';
import { Objetivo, ObjetivoId } from './Objetivo';
import { ObjetivoActividad, ObjetivoActividadId } from './ObjetivoActividad';
import { ProgramaSippe, ProgramaSippeId } from './ProgramaSippe';
import { ProgramaSippeActividad, ProgramaSippeActividadId } from './ProgramaSippeActividad';
import { Relacion, RelacionId } from './Relacion';
import { RelacionActividad, RelacionActividadId } from './RelacionActividad';
import { Ubicacion, UbicacionAttributes, UbicacionCreationAttributes, UbicacionId } from './Ubicacion';
import { UbicacionActividad, UbicacionActividadId } from './UbicacionActividad';
import { Usuario, UsuarioId } from './Usuario';
import { ESTADO_BD } from '../types/general';

export interface ActividadAttributes {
  idActividad: number;
  idArea: number;
  idUsuario?: string;
  nro?: number;
  desc: string;
  motivoCancel?: string | null;
  fechaDesde?: string;
  fechaHasta?: string;
}

export type ActividadPk = "idActividad";
export type ActividadId = Actividad[ActividadPk];
export type ActividadOptionalAttributes = "idActividad" | "idUsuario" | "nro" | "motivoCancel" | "fechaDesde" | "fechaHasta" ;
export type ActividadCreationAttributes = Optional<ActividadAttributes, ActividadOptionalAttributes>;

const ATRIBUTOS_TABLA_ACTIVIDAD_CONFIG = {
  idActividad: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  idArea: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Area',
      key: 'idArea'
    }
  },
  idUsuario: {
    type: DataTypes.STRING(255),
    allowNull: true,
    references: {
      model: 'Usuario',
      key: 'idUsuario'
    }
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
}


export class Actividad extends Model<ActividadAttributes, ActividadCreationAttributes> implements ActividadAttributes {
  idActividad!: number;
  idArea!: number;
  idUsuario?: string;
  nro?: number;
  desc!: string;
  motivoCancel?: string | null;
  fechaDesde?: string;
  fechaHasta?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Actividad {
    return Actividad.init(ATRIBUTOS_TABLA_ACTIVIDAD_CONFIG, {
    sequelize,
    tableName: 'Actividad',
    timestamps: true,
    paranoid: true
  });
  }
}
