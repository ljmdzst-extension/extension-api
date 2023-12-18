import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Capacitacion, CapacitacionId } from './Capacitacion';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaCapacitacionAttributes {
  codigoPropuesta: string;
  idCapacitacion: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type PropuestaCapacitacionPk = "codigoPropuesta" | "idCapacitacion";
export type PropuestaCapacitacionId = PropuestaCapacitacion[PropuestaCapacitacionPk];
export type PropuestaCapacitacionOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type PropuestaCapacitacionCreationAttributes = Optional<PropuestaCapacitacionAttributes, PropuestaCapacitacionOptionalAttributes>;

export class PropuestaCapacitacion extends Model<PropuestaCapacitacionAttributes, PropuestaCapacitacionCreationAttributes> implements PropuestaCapacitacionAttributes {
  codigoPropuesta!: string;
  idCapacitacion!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  // PropuestaCapacitacion belongsTo Capacitacion via idCapacitacion
  idCapacitacion_Capacitacion!: Capacitacion;
  getIdCapacitacion_Capacitacion!: Sequelize.BelongsToGetAssociationMixin<Capacitacion>;
  setIdCapacitacion_Capacitacion!: Sequelize.BelongsToSetAssociationMixin<Capacitacion, CapacitacionId>;
  createIdCapacitacion_Capacitacion!: Sequelize.BelongsToCreateAssociationMixin<Capacitacion>;
  // PropuestaCapacitacion belongsTo Propuesta via codigoPropuesta
  codigoPropuesta_Propuestum!: Propuesta;
  getCodigoPropuesta_Propuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuesta_Propuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;

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
    tableName: 'PropuestaCapacitacion',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
          { name: "idCapacitacion" },
        ]
      },
      {
        name: "fkPropuestaInstanciaCapacitacionPropuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
      {
        name: "fkPropuestaCapacitacionInstanciaCapacitacion1_idx",
        using: "BTREE",
        fields: [
          { name: "idCapacitacion" },
        ]
      },
    ]
  });
  }
}
