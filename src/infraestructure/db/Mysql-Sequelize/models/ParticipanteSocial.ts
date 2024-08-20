import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ActividadParticipanteSocial, ActividadParticipanteSocialId } from './ActividadParticipanteSocial';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface ParticipanteSocialAttributes {
  idParticipanteSocial: number;
  codigoPropuesta: string;
  nom: string;
  valoracion?: number;
  esDirecto?: number;
  observ?: string;
}

export type ParticipanteSocialPk = "idParticipanteSocial";
export type ParticipanteSocialId = ParticipanteSocial[ParticipanteSocialPk];
export type ParticipanteSocialOptionalAttributes = "valoracion" | "esDirecto" | "observ" ;
export type ParticipanteSocialCreationAttributes = Optional<ParticipanteSocialAttributes, ParticipanteSocialOptionalAttributes>;

export class ParticipanteSocial extends Model<ParticipanteSocialAttributes, ParticipanteSocialCreationAttributes> implements ParticipanteSocialAttributes {
  idParticipanteSocial!: number;
  codigoPropuesta!: string;
  nom!: string;
  valoracion?: number;
  esDirecto?: number;
  observ?: string;

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
  // ParticipanteSocial belongsTo Propuesta via codigoPropuesta
  codigoPropuestaPropuestum!: Propuesta;
  getCodigoPropuestaPropuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuestaPropuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ParticipanteSocial {
    return ParticipanteSocial.init({
    idParticipanteSocial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
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
    }
  }, {
    sequelize,
    tableName: 'ParticipanteSocial',
    timestamps: true,
    paranoid: true
  });
  }
}
