import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaPreviaAttributes {
  codigoPropuesta: string;
  codigoPropuestaPrevia: string;
}

export type PropuestaPreviaPk = "codigoPropuesta" | "codigoPropuestaPrevia";
export type PropuestaPreviaId = PropuestaPrevia[PropuestaPreviaPk];
export type PropuestaPreviaCreationAttributes = PropuestaPreviaAttributes;

export class PropuestaPrevia extends Model<PropuestaPreviaAttributes, PropuestaPreviaCreationAttributes> implements PropuestaPreviaAttributes {
  codigoPropuesta!: string;
  codigoPropuestaPrevia!: string;

  // PropuestaPrevia belongsTo Propuesta via codigoPropuesta
  codigoPropuestaPropuestum!: Propuesta;
  getCodigoPropuestaPropuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuestaPropuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;
  // PropuestaPrevia belongsTo Propuesta via codigoPropuestaPrevia
  codigoPropuestaPreviaPropuestum!: Propuesta;
  getCodigoPropuestaPreviaPropuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuestaPreviaPropuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPreviaPropuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;

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
    }
  }, {
    sequelize,
    tableName: 'PropuestaPrevia',
    timestamps: true,
    paranoid: true
  });
  }
}
