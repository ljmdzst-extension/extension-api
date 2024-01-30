import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { LineaTematica, LineaTematicaId } from './LineaTematica';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaLineaTematicaAttributes {
  idLineaTematica: number;
  codigoPropuesta: string;
}

export type PropuestaLineaTematicaPk = "idLineaTematica" | "codigoPropuesta";
export type PropuestaLineaTematicaId = PropuestaLineaTematica[PropuestaLineaTematicaPk];
export type PropuestaLineaTematicaCreationAttributes = PropuestaLineaTematicaAttributes;

export class PropuestaLineaTematica extends Model<PropuestaLineaTematicaAttributes, PropuestaLineaTematicaCreationAttributes> implements PropuestaLineaTematicaAttributes {
  idLineaTematica!: number;
  codigoPropuesta!: string;

  // PropuestaLineaTematica belongsTo LineaTematica via idLineaTematica
  idLineaTematica_LineaTematica!: LineaTematica;
  getIdLineaTematica_LineaTematica!: Sequelize.BelongsToGetAssociationMixin<LineaTematica>;
  setIdLineaTematica_LineaTematica!: Sequelize.BelongsToSetAssociationMixin<LineaTematica, LineaTematicaId>;
  createIdLineaTematica_LineaTematica!: Sequelize.BelongsToCreateAssociationMixin<LineaTematica>;
  // PropuestaLineaTematica belongsTo Propuesta via codigoPropuesta
  codigoPropuesta_Propuestum!: Propuesta;
  getCodigoPropuesta_Propuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuesta_Propuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaLineaTematica {
    return PropuestaLineaTematica.init({
    idLineaTematica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'LineaTematica',
        key: 'idLineaTematica'
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
    }
  }, {
    sequelize,
    tableName: 'PropuestaLineaTematica',
    timestamps: true,
    paranoid: true
  });
  }
}
