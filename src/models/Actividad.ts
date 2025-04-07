import * as Sequelize from 'sequelize';
import cli from 'cli-color';
import { DataTypes, Model, Optional, Transaction } from 'sequelize';
// import { AreaId } from './Area';
// import { Enlace, TEnlace } from './Enlace';
// import { FechaPuntual, TFecha } from './FechaPuntual';
// import { Institucion } from './Institucion';
// import { Meta } from './Meta';
// import { Objetivo, ObjetivoId } from './Objetivo';
// import { ProgramaSippeId } from './ProgramaSippe';
// import { Relacion, RelacionId } from './Relacion';
// import { Ubicacion } from './Ubicacion';
// import { ESTADO_BD } from '../types/general';
// import { BD } from '../config/dbConfig';
// import { ERROR } from '../logs/errores';

export interface ActividadAttributes {
  idActividad: number;
  idArea: number;
  anio : number;
  idUsuario?: string;

  nro?: number;
  desc: string;
  motivoCancel?: string | null;
  fechaDesde?: string;
  fechaHasta?: string;
  createdAt ?: string;
}

export type ActividadPk = "idActividad";
export type ActividadId = Actividad[ActividadPk];
export type ActividadOptionalAttributes = "idActividad" | "idUsuario" | "nro" | "motivoCancel" | "fechaDesde" | "fechaHasta" ;
export type ActividadCreationAttributes = Optional<ActividadAttributes, ActividadOptionalAttributes>;

// type TRequestActividad = ActividadAttributes & {
//   listaRelaciones      ?: Array<RelacionId>,
//   listaObjetivos       ?: Array<ObjetivoId>,
//   listaProgramasSIPPE  ?: Array<ProgramaSippeId>,
//   listaMetas           ?: Array<TMeta>,
//   listaUbicaciones     ?: Array<TUbicacion>,
//   listaInstituciones   ?: Array<TInstitucion>,
//   listaFechasPuntuales ?: Array<TFecha>,
//   listaEnlaces         ?: Array<TEnlace>
// }

// type TResponseActividad = TRequestActividad;

export type TItemActividad = {
  idActividad : ActividadId,
  desc : string
} 

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
  
  anio: {
    type: DataTypes.INTEGER,
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
  },
  createdAt : {
    type : DataTypes.DATEONLY,
    allowNull : false
  }
}

const ACTIVIDAD_NULA = {idActividad : 0, idArea : 0, nro : 0 , desc : ''};
  

export class Actividad extends Model<ActividadAttributes, ActividadCreationAttributes> implements ActividadAttributes {
  idActividad!: number;
  idArea!: number;
  anio !: number;
  idUsuario?: string;
  nro?: number;
  desc!: string;
  motivoCancel?: string | null;
  fechaDesde?: string;
  fechaHasta?: string;
  createdAt?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Actividad {
    return Actividad.init(ATRIBUTOS_TABLA_ACTIVIDAD_CONFIG, {
    sequelize,
    tableName: 'Actividad',
    timestamps: true,
    paranoid: true
  });
  }
}
