import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { ProgramaSippe, ProgramaSippeId } from './ProgramaSippe';

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

  // ProgramaSippeActividad belongsTo Actividad via idActividad
  idActividadActividad!: Actividad;
  getIdActividadActividad!: Sequelize.BelongsToGetAssociationMixin<Actividad>;
  setIdActividadActividad!: Sequelize.BelongsToSetAssociationMixin<Actividad, ActividadId>;
  createIdActividadActividad!: Sequelize.BelongsToCreateAssociationMixin<Actividad>;
  // ProgramaSippeActividad belongsTo ProgramaSippe via idProgramaSippe
  idProgramaSippeProgramaSippe!: ProgramaSippe;
  getIdProgramaSippeProgramaSippe!: Sequelize.BelongsToGetAssociationMixin<ProgramaSippe>;
  setIdProgramaSippeProgramaSippe!: Sequelize.BelongsToSetAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  createIdProgramaSippeProgramaSippe!: Sequelize.BelongsToCreateAssociationMixin<ProgramaSippe>;

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
