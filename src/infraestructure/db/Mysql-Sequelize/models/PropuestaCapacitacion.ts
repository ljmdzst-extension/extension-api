import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Capacitacion, CapacitacionId } from './Capacitacion';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaCapacitacionAttributes {
  codigoPropuesta: string;
  idCapacitacion: number;
}

export type PropuestaCapacitacionPk = "codigoPropuesta" | "idCapacitacion";
export type PropuestaCapacitacionId = PropuestaCapacitacion[PropuestaCapacitacionPk];
export type PropuestaCapacitacionCreationAttributes =PropuestaCapacitacionAttributes;

export class PropuestaCapacitacion extends Model<PropuestaCapacitacionAttributes, PropuestaCapacitacionCreationAttributes> implements PropuestaCapacitacionAttributes {
  codigoPropuesta!: string;
  idCapacitacion!: number;

  // PropuestaCapacitacion belongsTo Capacitacion via idCapacitacion
  idCapacitacionCapacitacion!: Capacitacion;
  getIdCapacitacionCapacitacion!: Sequelize.BelongsToGetAssociationMixin<Capacitacion>;
  setIdCapacitacionCapacitacion!: Sequelize.BelongsToSetAssociationMixin<Capacitacion, CapacitacionId>;
  createIdCapacitacionCapacitacion!: Sequelize.BelongsToCreateAssociationMixin<Capacitacion>;
  // PropuestaCapacitacion belongsTo Propuesta via codigoPropuesta
  codigoPropuestaPropuestum!: Propuesta;
  getCodigoPropuestaPropuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuestaPropuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaCapacitacion {
    return PropuestaCapacitacion.init({
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
    },
    idCapacitacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Capacitacion',
        key: 'idCapacitacion'
      }
    }
  }, {
    sequelize,
    tableName: 'PropuestaCapacitacion',
    timestamps: true,
    paranoid: true
  });
  }
}
