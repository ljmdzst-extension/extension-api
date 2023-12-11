import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaRelacionadaAttributes {
  codigoPropuestaRelacionada: string;
  codigoPropuesta: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type PropuestaRelacionadaPk = "codigoPropuestaRelacionada" | "codigoPropuesta";
export type PropuestaRelacionadaId = PropuestaRelacionada[PropuestaRelacionadaPk];
export type PropuestaRelacionadaOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type PropuestaRelacionadaCreationAttributes = Optional<PropuestaRelacionadaAttributes, PropuestaRelacionadaOptionalAttributes>;

export class PropuestaRelacionada extends Model<PropuestaRelacionadaAttributes, PropuestaRelacionadaCreationAttributes> implements PropuestaRelacionadaAttributes {
  codigoPropuestaRelacionada!: string;
  codigoPropuesta!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaRelacionada {
    return PropuestaRelacionada.init({
    codigoPropuestaRelacionada: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
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
    tableName: 'PropuestaRelacionada',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codigoPropuestaRelacionada" },
          { name: "codigoPropuesta" },
        ]
      },
      {
        name: "fkPropuestaRelacionadaPropuesta2_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuestaRelacionada" },
        ]
      },
      {
        name: "fkPropuestaRelacionadaPropuesta1",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
    ]
  });
  }
}
