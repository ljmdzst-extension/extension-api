import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PropuestaRelacionadaAttributes {
  codigoPropuesta: string;
  codigoPropuestaRelacionada: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type PropuestaRelacionadaPk = "codigoPropuesta" | "codigoPropuestaRelacionada";
export type PropuestaRelacionadaId = PropuestaRelacionada[PropuestaRelacionadaPk];
export type PropuestaRelacionadaOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type PropuestaRelacionadaCreationAttributes = Optional<PropuestaRelacionadaAttributes, PropuestaRelacionadaOptionalAttributes>;

export class PropuestaRelacionada extends Model<PropuestaRelacionadaAttributes, PropuestaRelacionadaCreationAttributes> implements PropuestaRelacionadaAttributes {
  codigoPropuesta!: string;
  codigoPropuestaRelacionada!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaRelacionada {
    return PropuestaRelacionada.init({
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    codigoPropuestaRelacionada: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
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
          { name: "codigoPropuesta" },
          { name: "codigoPropuestaRelacionada" },
        ]
      },
      {
        name: "fkPropuestaRelacionadaPropuesta2_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuestaRelacionada" },
        ]
      },
    ]
  });
  }
}
