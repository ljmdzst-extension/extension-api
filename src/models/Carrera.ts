import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CarreraAttributes {
  idCarrera: number;
  nom: string;
  idUnidadAcademica: number;
}

export type CarreraPk = "idCarrera";
export type CarreraId = Carrera[CarreraPk];
export type CarreraOptionalAttributes = "idCarrera";
export type CarreraCreationAttributes = Optional<CarreraAttributes, CarreraOptionalAttributes>;

export class Carrera extends Model<CarreraAttributes, CarreraCreationAttributes> implements CarreraAttributes {
  idCarrera!: number;
  nom!: string;
  idUnidadAcademica!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Carrera {
    return Carrera.init({
    idCarrera: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idUnidadAcademica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Relacion',
        key: 'idRelacion'
      }
    }
  }, {
    sequelize,
    tableName: 'Carrera',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCarrera" },
        ]
      },
      {
        name: "fkCarreraRelacion1_idx",
        using: "BTREE",
        fields: [
          { name: "idUnidadaAcademica" },
        ]
      },
    ]
  });
  }
}
