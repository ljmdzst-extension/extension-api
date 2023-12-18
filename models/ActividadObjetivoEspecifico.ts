import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ActividadObjetivoEspecificoAttributes {
  idActividadObjetivoEspecifico: number;
  idObjetivoEspecifico: number;
  desc?: string;
  motivoModificacion?: string;
  motivoSuspension?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type ActividadObjetivoEspecificoPk = "idActividadObjetivoEspecifico";
export type ActividadObjetivoEspecificoId = ActividadObjetivoEspecifico[ActividadObjetivoEspecificoPk];
export type ActividadObjetivoEspecificoOptionalAttributes = "desc" | "motivoModificacion" | "motivoSuspension" | "createdAt" | "updatedAt" | "deletedAt";
export type ActividadObjetivoEspecificoCreationAttributes = Optional<ActividadObjetivoEspecificoAttributes, ActividadObjetivoEspecificoOptionalAttributes>;

export class ActividadObjetivoEspecifico extends Model<ActividadObjetivoEspecificoAttributes, ActividadObjetivoEspecificoCreationAttributes> implements ActividadObjetivoEspecificoAttributes {
  idActividadObjetivoEspecifico!: number;
  idObjetivoEspecifico!: number;
  desc?: string;
  motivoModificacion?: string;
  motivoSuspension?: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof ActividadObjetivoEspecifico {
    return ActividadObjetivoEspecifico.init({
    idActividadObjetivoEspecifico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idObjetivoEspecifico: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    motivoModificacion: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    motivoSuspension: {
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
    tableName: 'ActividadObjetivoEspecifico',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idActividadObjetivoEspecifico" },
        ]
      },
      {
        name: "fk_ActividadObjetivoEspecifico_ObjetivoEspecifico1_idx",
        using: "BTREE",
        fields: [
          { name: "idObjetivoEspecifico" },
        ]
      },
    ]
  });
  }
}
