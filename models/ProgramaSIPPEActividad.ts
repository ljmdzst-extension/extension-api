import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProgramaSIPPEActividadAttributes {
  idProgramaSIPPE: number;
  idActividad: number;
}

export type ProgramaSIPPEActividadPk = "idProgramaSIPPE" | "idActividad";
export type ProgramaSIPPEActividadId = ProgramaSIPPEActividad[ProgramaSIPPEActividadPk];

export class ProgramaSIPPEActividad extends Model<ProgramaSIPPEActividadAttributes> implements ProgramaSIPPEActividadAttributes {
  idProgramaSIPPE!: number;
  idActividad!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof ProgramaSIPPEActividad {
    return ProgramaSIPPEActividad.init({
    idProgramaSIPPE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'ProgramaSIPPEActividad',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProgramaSIPPE" },
          { name: "idActividad" },
        ]
      },
      {
        name: "fkProgramaSIPPEActividadActividad1_idx",
        using: "BTREE",
        fields: [
          { name: "idActividad" },
        ]
      },
      {
        name: "fkProgramaSIPPEActividadProgramaSIPPE1_idx",
        using: "BTREE",
        fields: [
          { name: "idProgramaSIPPE" },
        ]
      },
    ]
  });
  }
}
