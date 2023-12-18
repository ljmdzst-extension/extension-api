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
  codigoPropuesta_Propuesta_PropuestaLineaTematicas!: Propuesta[];
  getCodigoPropuesta_Propuesta_PropuestaLineaTematicas!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuesta_Propuesta_PropuestaLineaTematicas!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaLineaTematica!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaLineaTematicas!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuesta_PropuestaLineaTematica!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuesta_Propuesta_PropuestaLineaTematica!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuesta_Propuesta_PropuestaLineaTematicas!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaLineaTematica!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaLineaTematicas!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuesta_Propuesta_PropuestaLineaTematicas!: Sequelize.BelongsToManyCountAssociationsMixin;
  // LineaTematica hasMany PropuestaLineaTematica via idLineaTematica
  PropuestaLineaTematicas!: PropuestaLineaTematica[];
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
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idLineaTematica" },
        ]
      },
    ]
  });
  }
}
