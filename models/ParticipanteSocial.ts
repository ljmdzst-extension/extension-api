import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ParticipanteSocialAttributes {
  idParticipanteSocial: number;
  codigoPropuesta: string;
  nom: string;
  valoracion?: number;
  esDirecto?: number;
  observ?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type ParticipanteSocialPk = "idParticipanteSocial";
export type ParticipanteSocialId = ParticipanteSocial[ParticipanteSocialPk];
export type ParticipanteSocialOptionalAttributes = "valoracion" | "esDirecto" | "observ" | "createdAt" | "updatedAt" | "deletedAt";
export type ParticipanteSocialCreationAttributes = Optional<ParticipanteSocialAttributes, ParticipanteSocialOptionalAttributes>;

export class ParticipanteSocial extends Model<ParticipanteSocialAttributes, ParticipanteSocialCreationAttributes> implements ParticipanteSocialAttributes {
  idParticipanteSocial!: number;
  codigoPropuesta!: string;
  nom!: string;
  valoracion?: number;
  esDirecto?: number;
  observ?: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof ParticipanteSocial {
    return ParticipanteSocial.init({
    idParticipanteSocial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    valoracion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    esDirecto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    observ: {
      type: DataTypes.STRING(2000),
      allowNull: true
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
    tableName: 'ParticipanteSocial',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idParticipanteSocial" },
        ]
      },
      {
        name: "fkPropuestaParticipanteSocialPropuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
    ]
  });
  }
}
