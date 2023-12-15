import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PersonaAttributes {
  nroDoc: string;
  tipoDoc: string;
  ape: string;
  nom: string;
  tel?: string;
  dom?: string;
  email?: string;
  ciudad?: string;
  provincia?: string;
  pais?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type PersonaPk = "nroDoc";
export type PersonaId = Persona[PersonaPk];
export type PersonaOptionalAttributes = "tel" | "dom" | "email" | "ciudad" | "provincia" | "pais" | "createdAt" | "updatedAt" | "deletedAt";
export type PersonaCreationAttributes = Optional<PersonaAttributes, PersonaOptionalAttributes>;

export class Persona extends Model<PersonaAttributes, PersonaCreationAttributes> implements PersonaAttributes {
  nroDoc!: string;
  tipoDoc!: string;
  ape!: string;
  nom!: string;
  tel?: string;
  dom?: string;
  email?: string;
  ciudad?: string;
  provincia?: string;
  pais?: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Persona {
    return Persona.init({
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
    tipoDoc: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    ape: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dom: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ciudad: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    provincia: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Santa Fe"
    },
    pais: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Argentina"
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
    tableName: 'Persona',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nroDoc" },
        ]
      },
    ]
  });
  }
}
