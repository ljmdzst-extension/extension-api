import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';
import type { PropuestaLineaTematica, PropuestaLineaTematicaId } from './PropuestaLineaTematica';

export interface LineaTematicaAttributes {
  idLineaTematica: number;
  nom: string;
}

export type LineaTematicaPk = "idLineaTematica";
export type LineaTematicaId = LineaTematica[LineaTematicaPk];
export type LineaTematicaCreationAttributes = LineaTematicaAttributes;

export class LineaTematica extends Model<LineaTematicaAttributes, LineaTematicaCreationAttributes> implements LineaTematicaAttributes {
  idLineaTematica!: number;
  nom!: string;

  // LineaTematica belongsToMany Propuesta via idLineaTematica and codigoPropuesta
  codigoPropuestaPropuestaPropuestaLineaTematicas!: Propuesta[];
  getCodigoPropuestaPropuestaPropuestaLineaTematicas!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuestaPropuestaPropuestaLineaTematicas!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPropuestaPropuestaLineaTematica!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPropuestaPropuestaLineaTematicas!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestaPropuestaLineaTematica!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuestaPropuestaPropuestaLineaTematica!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuestaPropuestaPropuestaLineaTematicas!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPropuestaPropuestaLineaTematica!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPropuestaPropuestaLineaTematicas!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuestaPropuestaPropuestaLineaTematicas!: Sequelize.BelongsToManyCountAssociationsMixin;
  // LineaTematica hasMany PropuestaLineaTematica via idLineaTematica
  propuestaLineaTematicas!: PropuestaLineaTematica[];
  getPropuestaLineaTematicas!: Sequelize.HasManyGetAssociationsMixin<PropuestaLineaTematica>;
  setPropuestaLineaTematicas!: Sequelize.HasManySetAssociationsMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  addPropuestaLineaTematica!: Sequelize.HasManyAddAssociationMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  addPropuestaLineaTematicas!: Sequelize.HasManyAddAssociationsMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  createPropuestaLineaTematica!: Sequelize.HasManyCreateAssociationMixin<PropuestaLineaTematica>;
  removePropuestaLineaTematica!: Sequelize.HasManyRemoveAssociationMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  removePropuestaLineaTematicas!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  hasPropuestaLineaTematica!: Sequelize.HasManyHasAssociationMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  hasPropuestaLineaTematicas!: Sequelize.HasManyHasAssociationsMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  countPropuestaLineaTematicas!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof LineaTematica {
    return LineaTematica.init({
    idLineaTematica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'LineaTematica',
    timestamps: false
  });
  }
}
