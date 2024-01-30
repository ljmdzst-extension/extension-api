import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { Relacion, RelacionId } from './Relacion';

export interface RelacionActividadAttributes {
  idRelacion: number;
  idActividad: number;
}

export type RelacionActividadPk = "idRelacion" | "idActividad";
export type RelacionActividadId = RelacionActividad[RelacionActividadPk];
export type RelacionActividadCreationAttributes =RelacionActividadAttributes;

export class RelacionActividad extends Model<RelacionActividadAttributes, RelacionActividadCreationAttributes> implements RelacionActividadAttributes {
  idRelacion!: number;
  idActividad!: number;

  // RelacionActividad belongsTo Actividad via idActividad
  idActividad_Actividad!: Actividad;
  getIdActividad_Actividad!: Sequelize.BelongsToGetAssociationMixin<Actividad>;
  setIdActividad_Actividad!: Sequelize.BelongsToSetAssociationMixin<Actividad, ActividadId>;
  createIdActividad_Actividad!: Sequelize.BelongsToCreateAssociationMixin<Actividad>;
  // RelacionActividad belongsTo Relacion via idRelacion
  idRelacion_Relacion!: Relacion;
  getIdRelacion_Relacion!: Sequelize.BelongsToGetAssociationMixin<Relacion>;
  setIdRelacion_Relacion!: Sequelize.BelongsToSetAssociationMixin<Relacion, RelacionId>;
  createIdRelacion_Relacion!: Sequelize.BelongsToCreateAssociationMixin<Relacion>;

  static initModel(sequelize: Sequelize.Sequelize): typeof RelacionActividad {
    return RelacionActividad.init({
    idRelacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Relacion',
        key: 'idRelacion'
      }
    },
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Actividad',
        key: 'idActividad'
      }
    }
  }, {
    sequelize,
    tableName: 'RelacionActividad',
    timestamps: true,
    paranoid: true
  });
  }
}
