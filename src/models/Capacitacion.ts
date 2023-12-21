import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';
import type { PropuestaCapacitacion, PropuestaCapacitacionId } from './PropuestaCapacitacion';

export interface CapacitacionAttributes {
  idCapacitacion: number;
  nom: string;
}

export type CapacitacionPk = "idCapacitacion";
export type CapacitacionId = Capacitacion[CapacitacionPk];
export type CapacitacionCreationAttributes = CapacitacionAttributes;

export class Capacitacion extends Model<CapacitacionAttributes, CapacitacionCreationAttributes> implements CapacitacionAttributes {
  idCapacitacion!: number;
  nom!: string;

  // Capacitacion belongsToMany Propuesta via idCapacitacion and codigoPropuesta
  codigoPropuesta_Propuesta!: Propuesta[];
  getCodigoPropuesta_Propuesta!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuesta_Propuesta!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuestum!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuestum!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuesta_Propuestum!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuesta_Propuesta!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuestum!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuesta_Propuesta!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Capacitacion hasMany PropuestaCapacitacion via idCapacitacion
  PropuestaCapacitacions!: PropuestaCapacitacion[];
  getPropuestaCapacitacions!: Sequelize.HasManyGetAssociationsMixin<PropuestaCapacitacion>;
  setPropuestaCapacitacions!: Sequelize.HasManySetAssociationsMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  addPropuestaCapacitacion!: Sequelize.HasManyAddAssociationMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  addPropuestaCapacitacions!: Sequelize.HasManyAddAssociationsMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  createPropuestaCapacitacion!: Sequelize.HasManyCreateAssociationMixin<PropuestaCapacitacion>;
  removePropuestaCapacitacion!: Sequelize.HasManyRemoveAssociationMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  removePropuestaCapacitacions!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  hasPropuestaCapacitacion!: Sequelize.HasManyHasAssociationMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  hasPropuestaCapacitacions!: Sequelize.HasManyHasAssociationsMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  countPropuestaCapacitacions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Capacitacion {
    return Capacitacion.init({
    idCapacitacion: {
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
    tableName: 'Capacitacion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCapacitacion" },
        ]
      },
    ]
  });
  }
}
