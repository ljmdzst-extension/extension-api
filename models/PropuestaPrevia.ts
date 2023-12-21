import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PropuestaPreviaAttributes {
  codigoPropuesta: string;
  codigoPropuestaPrevia: string;
}

export type PropuestaPreviaPk = "codigoPropuesta" | "codigoPropuestaPrevia";
export type PropuestaPreviaId = PropuestaPrevia[PropuestaPreviaPk];

export class PropuestaPrevia extends Model<PropuestaPreviaAttributes> implements PropuestaPreviaAttributes {
  codigoPropuesta!: string;
  codigoPropuestaPrevia!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaPrevia {
    return PropuestaPrevia.init({
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    codigoPropuestaPrevia: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
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
