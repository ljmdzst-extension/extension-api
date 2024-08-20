import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaRelacionadaAttributes {
  codigoPropuesta: string;
  codigoPropuestaRelacionada: string;
}

export type PropuestaRelacionadaPk = "codigoPropuesta" | "codigoPropuestaRelacionada";
export type PropuestaRelacionadaId = PropuestaRelacionada[PropuestaRelacionadaPk];
export type PropuestaRelacionadaCreationAttributes =PropuestaRelacionadaAttributes;

export class PropuestaRelacionada extends Model<PropuestaRelacionadaAttributes, PropuestaRelacionadaCreationAttributes> implements PropuestaRelacionadaAttributes {
  codigoPropuesta!: string;
  codigoPropuestaRelacionada!: string;

  // PropuestaRelacionada belongsTo Propuesta via codigoPropuesta
  codigoPropuestaPropuestum!: Propuesta;
  getCodigoPropuestaPropuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuestaPropuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;
  // PropuestaRelacionada belongsTo Propuesta via codigoPropuestaRelacionada
  codigoPropuestaRelacionadaPropuestum!: Propuesta;
  getCodigoPropuestaRelacionadaPropuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuestaRelacionadaPropuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaRelacionadaPropuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaRelacionada {
    return PropuestaRelacionada.init({
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
    },
    codigoPropuestaRelacionada: {
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
    tableName: 'PropuestaRelacionada',
    timestamps: true,
    paranoid: true
  });
  }
}
