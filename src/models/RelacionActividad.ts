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
export type RelacionActividadCreationAttributes = RelacionActividadAttributes;

export class RelacionActividad extends Model<RelacionActividadAttributes, RelacionActividadCreationAttributes> implements RelacionActividadAttributes {
  idRelacion!: number;
  idActividad!: number;

  // RelacionActividad belongsTo Actividad via idActividad
  idActividadActividad!: Actividad;
  getIdActividadActividad!: Sequelize.BelongsToGetAssociationMixin<Actividad>;
  setIdActividadActividad!: Sequelize.BelongsToSetAssociationMixin<Actividad, ActividadId>;
  createIdActividadActividad!: Sequelize.BelongsToCreateAssociationMixin<Actividad>;
  // RelacionActividad belongsTo Relacion via idRelacion
  idRelacionRelacion!: Relacion;
  getIdRelacionRelacion!: Sequelize.BelongsToGetAssociationMixin<Relacion>;
  setIdRelacionRelacion!: Sequelize.BelongsToSetAssociationMixin<Relacion, RelacionId>;
  createIdRelacionRelacion!: Sequelize.BelongsToCreateAssociationMixin<Relacion>;

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
