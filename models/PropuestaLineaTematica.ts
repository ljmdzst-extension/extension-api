import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaLineaTematicaAttributes {
  idLineaTematica: number;
  codigoPropuesta: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type PropuestaLineaTematicaPk = "idLineaTematica" | "codigoPropuesta";
export type PropuestaLineaTematicaId = PropuestaLineaTematica[PropuestaLineaTematicaPk];
export type PropuestaLineaTematicaOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type PropuestaLineaTematicaCreationAttributes = Optional<PropuestaLineaTematicaAttributes, PropuestaLineaTematicaOptionalAttributes>;

export class PropuestaLineaTematica extends Model<PropuestaLineaTematicaAttributes, PropuestaLineaTematicaCreationAttributes> implements PropuestaLineaTematicaAttributes {
  idLineaTematica!: number;
  codigoPropuesta!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaLineaTematica {
    return PropuestaLineaTematica.init({
    idLineaTematica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'LineaTematica',
        key: 'idLineaTematica'
      }
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
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
    tableName: 'PropuestaLineaTematica',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idLineaTematica" },
          { name: "codigoPropuesta" },
        ]
      },
      {
        name: "fk_PropuestaLineaTematica_LineaTematica1_idx",
        using: "BTREE",
        fields: [
          { name: "idLineaTematica" },
        ]
      },
      {
        name: "fkPropuestaLineaTematicaPropuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
    ]
  });
  }
}
