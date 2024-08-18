import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional, Transaction } from 'sequelize';
import {domain} from '../../../domain'
import Actividad, { ID_ACT, TDataActividad } from '../../../domain/classes/Actividad';
import ITransaction from '../../../domain/models/transaction';
import { Meta } from './Meta';

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

  async buscarPorId(idActividad: ID_ACT, transaction?: ITransaction): Promise<domain.Actividad | null> {
    let salida : domain.Actividad | null = null;

    const dbAct = await Actividad.findByPk(idActividad, {transaction});

    if(dbAct) {
      let data : domain.TDataActividad = {...dbAct.dataValues};

      salida = new domain.Actividad( dbAct );

      await Meta.initModel(this.sequelize)
                .findAll({where : { idActividad : dbAct.idActividad }, transaction})
                .then( resp => resp.forEach( meta => data.listaMetas = {...data.listaMetas, ...meta.dataValues} ))
    }

    return salida;
  }
  async buscarPor(parametros: TDataActividad, transaction?: ITransaction): Promise<domain.Actividad | null> {
    throw new Error('Method not implemented.');
  }
  async verLista(params: TDataActividad, transaction?: ITransaction): Promise<domain.Actividad[]> {
    throw new Error('Method not implemented.');
  }
  async guardarDatos(transaction?: ITransaction): Promise<domain.Actividad> {
    throw new Error('Method not implemented.');
  }
  async leerDatos(transaction?: ITransaction): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async darDeBaja(idActividad: ID_ACT, transaction?: ITransaction): Promise<boolean> {
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
