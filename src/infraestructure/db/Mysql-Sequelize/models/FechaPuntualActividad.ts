import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { domain } from '../../../../domain';
import { FechaPuntual } from './FechaPuntual';

export interface FechaPuntualActividadAttributes {
  idFecha: number;
  idActividad: number;
}

export type FechaPuntualActividadPk = "idFecha" | "idActividad";
export type FechaPuntualActividadId = FechaPuntualActividad[FechaPuntualActividadPk];
export type FechaPuntualActividadCreationAttributes = FechaPuntualActividadAttributes;

export class FechaPuntualActividad extends Model<FechaPuntualActividadAttributes, FechaPuntualActividadCreationAttributes> implements FechaPuntualActividadAttributes {
  idFecha!: number;
  idActividad!: number;

  public static async buscarPorActividad( actividad : domain.Actividad, transaction ?: Sequelize.Transaction) : Promise<domain.TDataFechaPuntual[]> {
    let salida : domain.TDataFechaPuntual[] = [];

    const fechasAsociadas = await FechaPuntualActividad.findAll({where : { idActividad : actividad.verDatos().idActividad}, transaction});

    if(fechasAsociadas.length > 0) {
        salida = await FechaPuntual.buscarPorListaIds( fechasAsociadas.map( fa => fa.dataValues.idFecha), transaction);
    }

    return salida;
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof FechaPuntualActividad {
    return FechaPuntualActividad.init({
    idFecha: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'FechaPuntual',
        key: 'idFecha'
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
  }, {
    sequelize,
    tableName: 'FechaPuntualActividad',
    timestamps: true,
    paranoid: true
  });
  }
}
