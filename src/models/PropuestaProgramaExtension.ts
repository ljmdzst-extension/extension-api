import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PropuestaProgramaExtensionAttributes {
  idProgramaExtension: number;
  codigoPropuesta: string;
}

export type PropuestaProgramaExtensionPk = "idProgramaExtension" | "codigoPropuesta";
export type PropuestaProgramaExtensionId = PropuestaProgramaExtension[PropuestaProgramaExtensionPk];

export class PropuestaProgramaExtension extends Model<PropuestaProgramaExtensionAttributes> implements PropuestaProgramaExtensionAttributes {
  idProgramaExtension!: number;
  codigoPropuesta!: string;
  createdAt!: Date;
  deletedAt?: Date;
  updatedAt!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaProgramaExtension {
    return PropuestaProgramaExtension.init({
    idProgramaExtension: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'PropuestaProgramaExtension',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProgramaExtension" },
          { name: "codigoPropuesta" },
        ]
      },
      {
        name: "fkPropuestaProgramaExtensionPropuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
    ]
  });
  }
}
