import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProgramaSIPPEAttributes {
  idProgramaSIPPE: number;
  nom: string;
}

export type ProgramaSIPPEPk = "idProgramaSIPPE";
export type ProgramaSIPPEId = ProgramaSIPPE[ProgramaSIPPEPk];
export type ProgramaSIPPEOptionalAttributes = "idProgramaSIPPE";
export type ProgramaSIPPECreationAttributes = Optional<ProgramaSIPPEAttributes, ProgramaSIPPEOptionalAttributes>;

export class ProgramaSIPPE extends Model<ProgramaSIPPEAttributes, ProgramaSIPPECreationAttributes> implements ProgramaSIPPEAttributes {
  idProgramaSIPPE!: number;
  nom!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof ProgramaSIPPE {
    return ProgramaSIPPE.init({
    idProgramaSIPPE: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ProgramaSIPPE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProgramaSIPPE" },
        ]
      },
    ]
  });
  }
}
