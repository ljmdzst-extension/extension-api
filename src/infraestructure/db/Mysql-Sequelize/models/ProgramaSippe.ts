import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { domain } from '../../../../domain';

export interface ProgramaSippeAttributes {
  idProgramaSippe: number;
  nom: string;
}

export type ProgramaSippePk = "idProgramaSippe";
export type ProgramaSippeId = ProgramaSippe[ProgramaSippePk];
export type ProgramaSippeOptionalAttributes = "idProgramaSippe";
export type ProgramaSippeCreationAttributes = Optional<ProgramaSippeAttributes, ProgramaSippeOptionalAttributes>;

export class ProgramaSippe extends Model<ProgramaSippeAttributes, ProgramaSippeCreationAttributes> implements ProgramaSippeAttributes {
  idProgramaSippe!: number;
  nom!: string;

  public static async buscarPorListaIds( ids : ProgramaSippeId[] , transaction ?: Sequelize.Transaction) : Promise<domain.TDataProgramaSIPPE[]> {
    return (await ProgramaSippe.findAll({where : { idProgramaSippe : ids}, transaction})).map( psippe => psippe.dataValues);
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof ProgramaSippe {
    return ProgramaSippe.init({
    idProgramaSippe: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idProgramaSIPPE'
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ProgramaSIPPE',
    timestamps: false
  });
  }
}
