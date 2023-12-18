import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProgramaSIPPEActividadAttributes {
  idProgramaSIPPE: number;
  idActividad: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type ProgramaSIPPEActividadPk = "idProgramaSIPPE" | "idActividad";
export type ProgramaSIPPEActividadId = ProgramaSIPPEActividad[ProgramaSIPPEActividadPk];
export type ProgramaSIPPEActividadOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type ProgramaSIPPEActividadCreationAttributes = Optional<ProgramaSIPPEActividadAttributes, ProgramaSIPPEActividadOptionalAttributes>;

export class ProgramaSIPPEActividad extends Model<ProgramaSIPPEActividadAttributes, ProgramaSIPPEActividadCreationAttributes> implements ProgramaSIPPEActividadAttributes {
  idProgramaSIPPE!: number;
  idActividad!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


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
    },
    createdAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    updatedAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    deletedAt : {
      type : DataTypes.DATE,
      allowNull : true
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
