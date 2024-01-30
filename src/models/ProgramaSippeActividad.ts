import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { ProgramaSippe, ProgramaSippeId } from './ProgramaSippe';

export interface ProgramaSippeActividadAttributes {
  idProgramaSIPPE: number;
  idActividad: number;
}

export type ProgramaSippeActividadPk = "idProgramaSIPPE" | "idActividad";
export type ProgramaSippeActividadId = ProgramaSippeActividad[ProgramaSippeActividadPk];
export type ProgramaSippeActividadCreationAttributes = ProgramaSippeActividadAttributes;

export class ProgramaSippeActividad extends Model<ProgramaSippeActividadAttributes, ProgramaSippeActividadCreationAttributes> implements ProgramaSippeActividadAttributes {
  idProgramaSIPPE!: number;
  idActividad!: number;

  // ProgramaSippeActividad belongsTo Actividad via idActividad
  idActividad_Actividad!: Actividad;
  getIdActividad_Actividad!: Sequelize.BelongsToGetAssociationMixin<Actividad>;
  setIdActividad_Actividad!: Sequelize.BelongsToSetAssociationMixin<Actividad, ActividadId>;
  createIdActividad_Actividad!: Sequelize.BelongsToCreateAssociationMixin<Actividad>;
  // ProgramaSippeActividad belongsTo ProgramaSippe via idProgramaSIPPE
  idProgramaSIPPE_ProgramaSIPPE!: ProgramaSippe;
  getIdProgramaSIPPE_ProgramaSIPPE!: Sequelize.BelongsToGetAssociationMixin<ProgramaSippe>;
  setIdProgramaSIPPE_ProgramaSIPPE!: Sequelize.BelongsToSetAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  createIdProgramaSIPPE_ProgramaSIPPE!: Sequelize.BelongsToCreateAssociationMixin<ProgramaSippe>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProgramaSippeActividad {
    return ProgramaSippeActividad.init({
    idProgramaSIPPE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ProgramaSIPPE',
        key: 'idProgramaSIPPE'
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
    tableName: 'ProgramaSIPPEActividad',
    timestamps: true,
    paranoid: true
  });
  }
}
