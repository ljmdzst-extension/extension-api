import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ActividadObjetivoEspecifico, ActividadObjetivoEspecificoId } from './ActividadObjetivoEspecifico';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface ObjetivoEspecificoAttributes {
  idObjetivoEspecifico: number;
  codigoPropuesta: string;
  desc?: string;
  resEsp?: string;
}

export type ObjetivoEspecificoPk = "idObjetivoEspecifico";
export type ObjetivoEspecificoId = ObjetivoEspecifico[ObjetivoEspecificoPk];
export type ObjetivoEspecificoOptionalAttributes = "idObjetivoEspecifico" | "desc" | "resEsp" ;
export type ObjetivoEspecificoCreationAttributes = Optional<ObjetivoEspecificoAttributes, ObjetivoEspecificoOptionalAttributes>;

export class ObjetivoEspecifico extends Model<ObjetivoEspecificoAttributes, ObjetivoEspecificoCreationAttributes> implements ObjetivoEspecificoAttributes {
  idObjetivoEspecifico!: number;
  codigoPropuesta!: string;
  desc?: string;
  resEsp?: string;

  // ObjetivoEspecifico hasMany ActividadObjetivoEspecifico via idObjetivoEspecifico
  ActividadObjetivoEspecificos!: ActividadObjetivoEspecifico[];
  getActividadObjetivoEspecificos!: Sequelize.HasManyGetAssociationsMixin<ActividadObjetivoEspecifico>;
  setActividadObjetivoEspecificos!: Sequelize.HasManySetAssociationsMixin<ActividadObjetivoEspecifico, ActividadObjetivoEspecificoId>;
  addActividadObjetivoEspecifico!: Sequelize.HasManyAddAssociationMixin<ActividadObjetivoEspecifico, ActividadObjetivoEspecificoId>;
  addActividadObjetivoEspecificos!: Sequelize.HasManyAddAssociationsMixin<ActividadObjetivoEspecifico, ActividadObjetivoEspecificoId>;
  createActividadObjetivoEspecifico!: Sequelize.HasManyCreateAssociationMixin<ActividadObjetivoEspecifico>;
  removeActividadObjetivoEspecifico!: Sequelize.HasManyRemoveAssociationMixin<ActividadObjetivoEspecifico, ActividadObjetivoEspecificoId>;
  removeActividadObjetivoEspecificos!: Sequelize.HasManyRemoveAssociationsMixin<ActividadObjetivoEspecifico, ActividadObjetivoEspecificoId>;
  hasActividadObjetivoEspecifico!: Sequelize.HasManyHasAssociationMixin<ActividadObjetivoEspecifico, ActividadObjetivoEspecificoId>;
  hasActividadObjetivoEspecificos!: Sequelize.HasManyHasAssociationsMixin<ActividadObjetivoEspecifico, ActividadObjetivoEspecificoId>;
  countActividadObjetivoEspecificos!: Sequelize.HasManyCountAssociationsMixin;
  // ObjetivoEspecifico belongsTo Propuesta via codigoPropuesta
  codigoPropuesta_Propuestum!: Propuesta;
  getCodigoPropuesta_Propuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuesta_Propuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ObjetivoEspecifico {
    return ObjetivoEspecifico.init({
    idObjetivoEspecifico: {
      autoIncrement: true,
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
    desc: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    resEsp: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ObjetivoEspecifico',
    timestamps: true,
    paranoid: true
  });
  }
}
