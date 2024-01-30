import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaRelacionadaAttributes {
  codigoPropuesta: string;
  codigoPropuestaRelacionada: string;
}

export type PropuestaRelacionadaPk = "codigoPropuesta" | "codigoPropuestaRelacionada";
export type PropuestaRelacionadaId = PropuestaRelacionada[PropuestaRelacionadaPk];
export type PropuestaRelacionadaCreationAttributes = PropuestaRelacionadaAttributes;

export class PropuestaRelacionada extends Model<PropuestaRelacionadaAttributes, PropuestaRelacionadaCreationAttributes> implements PropuestaRelacionadaAttributes {
  codigoPropuesta!: string;
  codigoPropuestaRelacionada!: string;

  // PropuestaRelacionada belongsTo Propuesta via codigoPropuesta
  codigoPropuesta_Propuestum!: Propuesta;
  getCodigoPropuesta_Propuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuesta_Propuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;
  // PropuestaRelacionada belongsTo Propuesta via codigoPropuestaRelacionada
  codigoPropuestaRelacionada_Propuestum!: Propuesta;
  getCodigoPropuestaRelacionada_Propuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuestaRelacionada_Propuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaRelacionada_Propuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;

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
