import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaPalabraClaveAttributes {
  codigoPropuesta: string;
  idPalabraClave: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type PropuestaPalabraClavePk = "codigoPropuesta" | "idPalabraClave";
export type PropuestaPalabraClaveId = PropuestaPalabraClave[PropuestaPalabraClavePk];
export type PropuestaPalabraClaveOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type PropuestaPalabraClaveCreationAttributes = Optional<PropuestaPalabraClaveAttributes, PropuestaPalabraClaveOptionalAttributes>;

export class PropuestaPalabraClave extends Model<PropuestaPalabraClaveAttributes, PropuestaPalabraClaveCreationAttributes> implements PropuestaPalabraClaveAttributes {
  codigoPropuesta!: string;
  idPalabraClave!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  // PropuestaPalabraClave belongsTo Propuesta via codigoPropuesta
  codigoPropuestaPropuestum!: Propuesta;
  getCodigoPropuestaPropuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuestaPropuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaPalabraClave {
    return PropuestaPalabraClave.init({
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
    },
    idPalabraClave: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'PalabraClave',
        key: 'idPalabraClave'
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
        name: "fk_PropuestaPalabraClave_PalabraClave1_idx",
        using: "BTREE",
        fields: [
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
    ]
  });
  }
}
