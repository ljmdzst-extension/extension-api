import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ActividadParticipanteSocial, ActividadParticipanteSocialId } from './ActividadParticipanteSocial';

export interface ParticipanteSocialAttributes {
  idParticipanteSocial: number;
  nom: string;
}

export type ParticipanteSocialPk = "idParticipanteSocial";
export type ParticipanteSocialId = ParticipanteSocial[ParticipanteSocialPk];
export type ParticipanteSocialCreationAttributes = ParticipanteSocialAttributes;

export class ParticipanteSocial extends Model<ParticipanteSocialAttributes, ParticipanteSocialCreationAttributes> implements ParticipanteSocialAttributes {
  idParticipanteSocial!: number;
  nom!: string;

  // ParticipanteSocial hasMany ActividadParticipanteSocial via idParticipanteSocial
  actividadParticipanteSocials!: ActividadParticipanteSocial[];
  getActividadParticipanteSocials!: Sequelize.HasManyGetAssociationsMixin<ActividadParticipanteSocial>;
  setActividadParticipanteSocials!: Sequelize.HasManySetAssociationsMixin<ActividadParticipanteSocial, ActividadParticipanteSocialId>;
  addActividadParticipanteSocial!: Sequelize.HasManyAddAssociationMixin<ActividadParticipanteSocial, ActividadParticipanteSocialId>;
  addActividadParticipanteSocials!: Sequelize.HasManyAddAssociationsMixin<ActividadParticipanteSocial, ActividadParticipanteSocialId>;
  createActividadParticipanteSocial!: Sequelize.HasManyCreateAssociationMixin<ActividadParticipanteSocial>;
  removeActividadParticipanteSocial!: Sequelize.HasManyRemoveAssociationMixin<ActividadParticipanteSocial, ActividadParticipanteSocialId>;
  removeActividadParticipanteSocials!: Sequelize.HasManyRemoveAssociationsMixin<ActividadParticipanteSocial, ActividadParticipanteSocialId>;
  hasActividadParticipanteSocial!: Sequelize.HasManyHasAssociationMixin<ActividadParticipanteSocial, ActividadParticipanteSocialId>;
  hasActividadParticipanteSocials!: Sequelize.HasManyHasAssociationsMixin<ActividadParticipanteSocial, ActividadParticipanteSocialId>;
  countActividadParticipanteSocials!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof ParticipanteSocial {
    return ParticipanteSocial.init({
    idParticipanteSocial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ParticipanteSocial',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idParticipanteSocial" },
        ]
      },
    ]
  });
  }
}
