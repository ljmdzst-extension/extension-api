import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import {domain} from '../../../domain'
import { Meta } from './Meta';
import { Enlace } from './Enlace';
import { ObjetivoActividad } from './ObjetivoActividad';
import { ProgramaSippeActividad } from './ProgramaSippeActividad';
import { InstitucionActividad } from './InstitucionActividad';
import { UbicacionActividad } from './UbicacionActividad';
import { FechaPuntualActividad } from './FechaPuntualActividad';

export interface ActividadAttributes {
  idActividad: number;
  idArea: number;
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
  

export class Actividad extends Model<ActividadAttributes, ActividadCreationAttributes> implements ActividadAttributes , domain.IModelActividad {
  

  idActividad!: number;
  idArea!: number;
  idUsuario?: string;
  nro?: number;
  desc!: string;
  motivoCancel?: string | null;
  fechaDesde?: string;
  fechaHasta?: string;
  createdAt?: string;

  async buscarPorId(idActividad: number ): Promise<domain.Actividad | null> {
    let salida : domain.Actividad | null = null;
    const transaction = await this.sequelize.transaction({logging : process.env.NODE_ENV === 'development' ? sql => console.log(sql) : undefined});
    const dbAct = await Actividad.findByPk(idActividad );

    if(dbAct) {

      let data : domain.TDataActividad = {...dbAct.dataValues};

      salida = new domain.Actividad(data);

      data.listaMetas = await Meta.buscarPorActividad( salida,transaction );
      data.listaEnlaces = await Enlace.buscarPorActividad(salida,transaction);
      data.listaInstituciones = await InstitucionActividad.buscarPorActividad(salida,transaction);
      data.listaFechaPuntuales = await FechaPuntualActividad.buscarPorActividad(salida,transaction);
      data.listaObjetivos = await ObjetivoActividad.buscarPorActividad(salida,transaction);
      data.listaProgramaSIPPPEs = await ProgramaSippeActividad.buscarPorActividad(salida,transaction);
      data.listaUbicaciones = await UbicacionActividad.buscarPorActividad(salida,transaction);

    }

    return salida;
  }
  async buscarPor(parametros: TDataActividad ): Promise<domain.Actividad | null> {
    throw new Error('Method not implemented.');
  }
  async verLista(params: TDataActividad ): Promise<domain.Actividad[]> {
    throw new Error('Method not implemented.');
  }
  async guardarDatos( ): Promise<domain.Actividad> {
    throw new Error('Method not implemented.');
  }

  async darDeBaja(idActividad: ID_ACT ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  
  static initModel(sequelize: Sequelize.Sequelize): typeof Actividad {
    return Actividad.init(ATRIBUTOS_TABLA_ACTIVIDAD_CONFIG, {
    sequelize,
    tableName: 'Actividad',
    timestamps: true,
    paranoid: true
  });
  }
}
