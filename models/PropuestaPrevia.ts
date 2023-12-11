import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaPreviaAttributes {
  codigoPropuesta: string;
  codigoPropuestaPrevia: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type PropuestaPreviaPk = "codigoPropuesta" | "codigoPropuestaPrevia";
export type PropuestaPreviaId = PropuestaPrevia[PropuestaPreviaPk];
export type PropuestaPreviaOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type PropuestaPreviaCreationAttributes = Optional<PropuestaPreviaAttributes, PropuestaPreviaOptionalAttributes>;

export class PropuestaPrevia extends Model<PropuestaPreviaAttributes, PropuestaPreviaCreationAttributes> implements PropuestaPreviaAttributes {
  codigoPropuesta!: string;
  codigoPropuestaPrevia!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaPrevia {
    return PropuestaPrevia.init({
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
    },
    codigoPropuestaPrevia: {
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
    tableName: 'PropuestaPrevia',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
          { name: "codigoPropuestaPrevia" },
        ]
      },
      {
        name: "fkPropuestaPreviaPropuesta2_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuestaPrevia" },
        ]
      },
    ]
  });
  }
}
