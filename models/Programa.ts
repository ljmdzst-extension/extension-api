import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProgramaAttributes {
  idPrograma: number;
  nom: string;
  anio: number;
}

export type ProgramaPk = "idPrograma";
export type ProgramaId = Programa[ProgramaPk];
export type ProgramaOptionalAttributes = "idPrograma";
export type ProgramaCreationAttributes = Optional<ProgramaAttributes, ProgramaOptionalAttributes>;

export class Programa extends Model<ProgramaAttributes, ProgramaCreationAttributes> implements ProgramaAttributes {
  idPrograma!: number;
  nom!: string;
  anio!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Programa {
    return Programa.init({
    idPrograma: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Programa',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPrograma" },
        ]
      },
    ]
  });
  }
}
