import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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
      allowNull: false
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false
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
