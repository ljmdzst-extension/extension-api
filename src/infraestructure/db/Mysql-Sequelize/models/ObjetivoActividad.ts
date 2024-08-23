import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { domain } from '../../../../domain';
import { Objetivo } from './Objetivo';

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
  
  public static async buscarPorActividad( actividad : domain.Actividad, transaction ?: Sequelize.Transaction) : Promise<domain.TDataObjetivo[]> {
    let salida : domain.TDataObjetivo[] = [];

    const objetivosAsociados = await ObjetivoActividad.findAll({where : { idActividad : actividad.verDatos().idActividad}, transaction});

    if(objetivosAsociados.length > 0) {
        salida = await Objetivo.buscarPorListaIds( objetivosAsociados.map( oasoc => oasoc.dataValues.idObjetivo), transaction);
    }

    return salida;
  }


  static initModel(sequelize: Sequelize.Sequelize): typeof ObjetivoActividad {
    return ObjetivoActividad.init(CONSTRAINT_ATTRIBUTES,CONSTRAINT_OPTIONS(sequelize) );
  }
}
