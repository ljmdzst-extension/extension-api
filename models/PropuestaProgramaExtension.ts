import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaProgramaExtensionAttributes {
  idProgramaExtension: number;
  codigoPropuesta: string;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt: Date;
}

export type PropuestaProgramaExtensionPk = "idProgramaExtension" | "codigoPropuesta";
export type PropuestaProgramaExtensionId = PropuestaProgramaExtension[PropuestaProgramaExtensionPk];
export type PropuestaProgramaExtensionOptionalAttributes = "createdAt" | "deletedAt" | "updatedAt";
export type PropuestaProgramaExtensionCreationAttributes = Optional<PropuestaProgramaExtensionAttributes, PropuestaProgramaExtensionOptionalAttributes>;

export class PropuestaProgramaExtension extends Model<PropuestaProgramaExtensionAttributes, PropuestaProgramaExtensionCreationAttributes> implements PropuestaProgramaExtensionAttributes {
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
      primaryKey: true,
      references: {
        model: 'ProgramaExtension',
        key: 'idProgramaExtension'
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
        name: "fk_PropuestaProgramaExtension_ProgramaExtension1_idx",
        using: "BTREE",
        fields: [
          { name: "idProgramaExtension" },
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
