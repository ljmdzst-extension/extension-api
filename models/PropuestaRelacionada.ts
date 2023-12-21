import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PropuestaRelacionadaAttributes {
  codigoPropuesta: string;
  codigoPropuestaRelacionada: string;
}

export type PropuestaRelacionadaPk = "codigoPropuesta" | "codigoPropuestaRelacionada";
export type PropuestaRelacionadaId = PropuestaRelacionada[PropuestaRelacionadaPk];

export class PropuestaRelacionada extends Model<PropuestaRelacionadaAttributes> implements PropuestaRelacionadaAttributes {
  codigoPropuesta!: string;
  codigoPropuestaRelacionada!: string;


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
