import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PropuestaPalabraClaveAttributes {
  codigoPropuesta: string;
  idPalabraClave: number;
}

export type PropuestaPalabraClavePk = "codigoPropuesta" | "idPalabraClave";
export type PropuestaPalabraClaveId = PropuestaPalabraClave[PropuestaPalabraClavePk];

export class PropuestaPalabraClave extends Model<PropuestaPalabraClaveAttributes> implements PropuestaPalabraClaveAttributes {
  codigoPropuesta!: string;
  idPalabraClave!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaPalabraClave {
    return PropuestaPalabraClave.init({
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    idPalabraClave: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'PropuestaPalabraClave',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
          { name: "idPalabraClave" },
        ]
      },
      {
        name: "fkPropuestaPalabraClavePropuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
      {
        name: "fkPropuestaPalabraClavePalabraClave1_idx",
        using: "BTREE",
        fields: [
          { name: "idPalabraClave" },
        ]
      },
    ]
  });
  }
}
