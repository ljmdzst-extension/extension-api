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
  codigoPropuestaPropuestaPropuestaCapacitacions!: Propuesta[];
  getCodigoPropuestaPropuestaPropuestaCapacitacions!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuestaPropuestaPropuestaCapacitacions!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPropuestaPropuestaCapacitacion!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPropuestaPropuestaCapacitacions!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestaPropuestaCapacitacion!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuestaPropuestaPropuestaCapacitacion!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuestaPropuestaPropuestaCapacitacions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPropuestaPropuestaCapacitacion!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPropuestaPropuestaCapacitacions!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuestaPropuestaPropuestaCapacitacions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Capacitacion hasMany PropuestaCapacitacion via idCapacitacion
  propuestaCapacitacions!: PropuestaCapacitacion[];
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
    timestamps: false
  });
  }
}
