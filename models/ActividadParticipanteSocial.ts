import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ParticipanteSocial, ParticipanteSocialId } from './ParticipanteSocial';

export interface ActividadParticipanteSocialAttributes {
  idActividadPartSocial: number;
  idParticipanteSocial: number;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type ActividadParticipanteSocialPk = "idActividadPartSocial";
export type ActividadParticipanteSocialId = ActividadParticipanteSocial[ActividadParticipanteSocialPk];
export type ActividadParticipanteSocialOptionalAttributes = "idActividadPartSocial" | "createdAt" | "updatedAt" | "deletedAt";
export type ActividadParticipanteSocialCreationAttributes = Optional<ActividadParticipanteSocialAttributes, ActividadParticipanteSocialOptionalAttributes>;

export class ActividadParticipanteSocial extends Model<ActividadParticipanteSocialAttributes, ActividadParticipanteSocialCreationAttributes> implements ActividadParticipanteSocialAttributes {
  idActividadPartSocial!: number;
  idParticipanteSocial!: number;
  desc!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof ActividadParticipanteSocial {
    return ActividadParticipanteSocial.init({
    idActividadPartSocial: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idParticipanteSocial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ParticipanteSocial',
        key: 'idParticipanteSocial'
      }
    },
    desc: {
      type: DataTypes.TEXT,
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
    tableName: 'ActividadParticipanteSocial',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idActividadPartSocial" },
        ]
      },
      {
        name: "fkPropuestaActividadPartSocialPropuestaParticipanteSocial1_idx",
        using: "BTREE",
        fields: [
          { name: "idParticipanteSocial" },
        ]
      },
    ]
  });
  }
}
