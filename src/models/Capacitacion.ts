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
  codigoPropuesta_Propuesta_PropuestaCapacitacions!: Propuesta[];
  getCodigoPropuesta_Propuesta_PropuestaCapacitacions!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuesta_Propuesta_PropuestaCapacitacions!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaCapacitacion!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaCapacitacions!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuesta_PropuestaCapacitacion!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuesta_Propuesta_PropuestaCapacitacion!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuesta_Propuesta_PropuestaCapacitacions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaCapacitacion!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaCapacitacions!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuesta_Propuesta_PropuestaCapacitacions!: Sequelize.BelongsToManyCountAssociationsMixin;
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
    timestamps: false
  });
  }
}
