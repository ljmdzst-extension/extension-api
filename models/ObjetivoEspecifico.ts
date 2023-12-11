import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ActividadObjetivoEspecifico, ActividadObjetivoEspecificoId } from './ActividadObjetivoEspecifico';

export interface ObjetivoEspecificoAttributes {
  idObjetivoEspecifico: number;
  idPropuesta: number;
  desc?: string;
  resEsp?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type ObjetivoEspecificoPk = "idObjetivoEspecifico";
export type ObjetivoEspecificoId = ObjetivoEspecifico[ObjetivoEspecificoPk];
export type ObjetivoEspecificoOptionalAttributes = "desc" | "resEsp" | "createdAt" | "updatedAt" | "deletedAt";
export type ObjetivoEspecificoCreationAttributes = Optional<ObjetivoEspecificoAttributes, ObjetivoEspecificoOptionalAttributes>;

export class ObjetivoEspecifico extends Model<ObjetivoEspecificoAttributes, ObjetivoEspecificoCreationAttributes> implements ObjetivoEspecificoAttributes {
  idObjetivoEspecifico!: number;
  idPropuesta!: number;
  desc?: string;
  resEsp?: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  // ObjetivoEspecifico hasMany ActividadObjetivoEspecifico via idObjetivoEspecifico
  actividadObjetivoEspecificos!: ActividadObjetivoEspecifico[];
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

  static initModel(sequelize: Sequelize.Sequelize): typeof ObjetivoEspecifico {
    return ObjetivoEspecifico.init({
    idObjetivoEspecifico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idPropuesta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    resEsp: {
      type: DataTypes.STRING(500),
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
    tableName: 'ObjetivoEspecifico',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idObjetivoEspecifico" },
        ]
      },
    ]
  });
  }
}
