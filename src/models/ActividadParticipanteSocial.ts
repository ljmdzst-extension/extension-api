import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ParticipanteSocial, ParticipanteSocialId } from './ParticipanteSocial';

export interface ActividadParticipanteSocialAttributes {
  idActividadPartSocial: number;
  idParticipanteSocial: number;
  desc: string;
}

export type ActividadParticipanteSocialPk = "idActividadPartSocial";
export type ActividadParticipanteSocialId = ActividadParticipanteSocial[ActividadParticipanteSocialPk];
export type ActividadParticipanteSocialOptionalAttributes = "idActividadPartSocial";
export type ActividadParticipanteSocialCreationAttributes = Optional<ActividadParticipanteSocialAttributes, ActividadParticipanteSocialOptionalAttributes>;

export class ActividadParticipanteSocial extends Model<ActividadParticipanteSocialAttributes, ActividadParticipanteSocialCreationAttributes> implements ActividadParticipanteSocialAttributes {
  idActividadPartSocial!: number;
  idParticipanteSocial!: number;
  desc!: string;

  // ActividadParticipanteSocial belongsTo ParticipanteSocial via idParticipanteSocial
  idParticipanteSocialParticipanteSocial!: ParticipanteSocial;
  getIdParticipanteSocialParticipanteSocial!: Sequelize.BelongsToGetAssociationMixin<ParticipanteSocial>;
  setIdParticipanteSocialParticipanteSocial!: Sequelize.BelongsToSetAssociationMixin<ParticipanteSocial, ParticipanteSocialId>;
  createIdParticipanteSocialParticipanteSocial!: Sequelize.BelongsToCreateAssociationMixin<ParticipanteSocial>;

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
    }
  }, {
    sequelize,
    tableName: 'ActividadParticipanteSocial',
    timestamps: true,
    paranoid: true
  });
  }
}
