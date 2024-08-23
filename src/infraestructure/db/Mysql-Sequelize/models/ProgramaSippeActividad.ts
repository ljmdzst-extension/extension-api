import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { ProgramaSippe } from './ProgramaSippe';
import { domain } from '../../../../domain';

export interface ProgramaSippeActividadAttributes {
  idProgramaSippe: number;
  idActividad: number;
}

export type ProgramaSippeActividadPk = "idProgramaSippe" | "idActividad";
export type ProgramaSippeActividadId = ProgramaSippeActividad[ProgramaSippeActividadPk];
export type ProgramaSippeActividadCreationAttributes = ProgramaSippeActividadAttributes;

export class ProgramaSippeActividad extends Model<ProgramaSippeActividadAttributes, ProgramaSippeActividadCreationAttributes> implements ProgramaSippeActividadAttributes {
  idProgramaSippe!: number;
  idActividad!: number;

  public static async buscarPorActividad( actividad : domain.Actividad, transaction ?: Sequelize.Transaction) : Promise<domain.TDataProgramaSIPPE[]> {
    let salida : domain.TDataProgramaSIPPE[] = [];

    const programasSippesAsociados = await ProgramaSippeActividad.findAll({where : { idActividad : actividad.verDatos().idActividad}, transaction});

    if(programasSippesAsociados.length > 0) {
        salida = await ProgramaSippe.buscarPorListaIds( programasSippesAsociados.map( pasoc => pasoc.dataValues.idProgramaSippe), transaction);
    }

    return salida;
  }

  
  static initModel(sequelize: Sequelize.Sequelize): typeof ProgramaSippeActividad {
    return ProgramaSippeActividad.init({
    idProgramaSippe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ProgramaSIPPE',
        key: 'idProgramaSIPPE'
      },
      field: 'idProgramaSIPPE'
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
    tableName: 'ProgramaSIPPEActividad',
    timestamps: true,
    paranoid: true
  });
  }
}
