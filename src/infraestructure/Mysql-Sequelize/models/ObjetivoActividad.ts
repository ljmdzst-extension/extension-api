import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { ESTADO_BD } from '../types/general';

export interface ObjetivoActividadAttributes {
  idObjetivo: number;
  idActividad: number;
}

export type ObjetivoActividadPk = "idObjetivo" | "idActividad";
export type ObjetivoActividadId = ObjetivoActividad[ObjetivoActividadPk];
export type ObjetivoActividadCreationAttributes = ObjetivoActividadAttributes;


const CONSTRAINT_ATTRIBUTES = {
  idObjetivo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Objetivo',
      key: 'idObjetivo'
    }
  },
  idActividad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Actividad',
      key: 'idActividad'
    }
  }
}
const CONSTRAINT_OPTIONS = ( sequelize : Sequelize.Sequelize)=>({
  sequelize,
  tableName: 'ObjetivoActividad',
  timestamps: true,
  paranoid: true
})
export class ObjetivoActividad extends Model<ObjetivoActividadAttributes, ObjetivoActividadCreationAttributes> implements ObjetivoActividadAttributes {
  idObjetivo!: number;
  idActividad!: number;
  
  estadoEnBD !: ESTADO_BD;

  

  public verID() : number 
  {
      return this.idObjetivo;
  }

  public verDatos() 
  {
      return this.dataValues;
  }

  public guardarEnBD(transaction ?: Sequelize.Transaction ) : Promise<any>[] {

    if(process.env.NODE_ENV === 'development') console.log('ObjetivoActividad.guardarEnBD()');

    let salida :  Promise<any>[] = [];

    if(this.estadoEnBD === ESTADO_BD.B) {
      salida = [...salida,this.destroy({transaction})];
    }

    if(this.estadoEnBD === ESTADO_BD.A || this.estadoEnBD === ESTADO_BD.M) {
      salida = [...salida,this.save({transaction})]
    }

    return salida;
  }
  
  static initModel(sequelize: Sequelize.Sequelize): typeof ObjetivoActividad {
    return ObjetivoActividad.init(CONSTRAINT_ATTRIBUTES,CONSTRAINT_OPTIONS(sequelize) );
  }
}
