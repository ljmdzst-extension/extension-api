import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';


export interface RelacionActividadAttributes {
  idRelacion: number;
  idActividad: number;
}

export type RelacionActividadPk = "idRelacion" | "idActividad";
export type RelacionActividadId = RelacionActividad[RelacionActividadPk];
export type RelacionActividadCreationAttributes = RelacionActividadAttributes;

const CONSTRAINT_ATTRIBUTES = {
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
}

const CONSTRAINT_OPTIONS = ( sequelize : Sequelize.Sequelize)=>({
  sequelize,
  tableName: 'RelacionActividad',
  timestamps: true,
  paranoid: true
})

export class RelacionActividad extends Model<RelacionActividadAttributes, RelacionActividadCreationAttributes> implements RelacionActividadAttributes {
  idRelacion!: number;
  idActividad!: number;
  static initModel(sequelize: Sequelize.Sequelize): typeof RelacionActividad {
    return RelacionActividad.init(CONSTRAINT_ATTRIBUTES, CONSTRAINT_OPTIONS(sequelize));
  }
}
