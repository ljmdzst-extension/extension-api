import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface EnlaceAttributes {
  idEnlace: number;
  desc: string;
  link: string;
  idActividad: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type EnlacePk = "idEnlace";
export type EnlaceId = Enlace[EnlacePk];
export type EnlaceOptionalAttributes = "idEnlace" | "createdAt" | "updatedAt" | "deletedAt";
export type EnlaceCreationAttributes = Optional<EnlaceAttributes, EnlaceOptionalAttributes>;

export class Enlace extends Model<EnlaceAttributes, EnlaceCreationAttributes> implements EnlaceAttributes {
  idEnlace!: number;
  desc!: string;
  link!: string;
  idActividad!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Enlace {
    return Enlace.init({
    idEnlace: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    desc: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    link: {
      type: DataTypes.STRING(2083),
      allowNull: false
    },
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'Enlace',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEnlace" },
        ]
      },
      {
        name: "fkEnlaceActividad1_idx",
        using: "BTREE",
        fields: [
          { name: "idActividad" },
        ]
      },
    ]
  });
  }
}
