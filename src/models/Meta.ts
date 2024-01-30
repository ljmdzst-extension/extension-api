import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { Valoracion, ValoracionId } from './Valoracion';

export interface MetaAttributes {
  idMeta: number;
  descripcion: string;
  resultado?: string;
  observaciones?: string;
  idValoracion?: number;
  idActividad: number;
}

export type MetaPk = "idMeta";
export type MetaId = Meta[MetaPk];
export type MetaOptionalAttributes = "idMeta" | "resultado" | "observaciones" | "idValoracion" ;
export type MetaCreationAttributes = Optional<MetaAttributes, MetaOptionalAttributes>;

export class Meta extends Model<MetaAttributes, MetaCreationAttributes> implements MetaAttributes {
  idMeta!: number;
  descripcion!: string;
  resultado?: string;
  observaciones?: string;
  idValoracion?: number;
  idActividad!: number;

  // Meta belongsTo Actividad via idActividad
  idActividad_Actividad!: Actividad;
  getIdActividad_Actividad!: Sequelize.BelongsToGetAssociationMixin<Actividad>;
  setIdActividad_Actividad!: Sequelize.BelongsToSetAssociationMixin<Actividad, ActividadId>;
  createIdActividad_Actividad!: Sequelize.BelongsToCreateAssociationMixin<Actividad>;
  // Meta belongsTo Valoracion via idValoracion
  idValoracion_Valoracion!: Valoracion;
  getIdValoracion_Valoracion!: Sequelize.BelongsToGetAssociationMixin<Valoracion>;
  setIdValoracion_Valoracion!: Sequelize.BelongsToSetAssociationMixin<Valoracion, ValoracionId>;
  createIdValoracion_Valoracion!: Sequelize.BelongsToCreateAssociationMixin<Valoracion>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Meta {
    return Meta.init({
    idMeta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    resultado: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    observaciones: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    idValoracion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Valoracion',
        key: 'idValoracion'
      }
    },
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Actividad',
        key: 'idActividad'
      }
    }
  }, {
    sequelize,
    tableName: 'Meta',
    timestamps: true,
    paranoid: true
  });
  }
}
