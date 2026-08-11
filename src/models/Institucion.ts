import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { InstitucionActividad } from './InstitucionActividad';
import { BD } from '../config/dbConfig';
import { ESTADO_BD } from '../types/general';
import { Actividad } from './Actividad';
import { ERROR } from '../logs/errores';

export interface InstitucionAttributes {
  idInstitucion: number;
  nom: string;
  dom?: string | null;
  email?: string | null;
  tel?: string | null;
  ubicacion?: string | null;
  pais?: string | null;
  ciudad?: string | null;
  provincia?: string | null;
  direccion?: string | null;
  latitud?: string | null;
  longitud?: string | null;
}

export type InstitucionPk = "idInstitucion";
export type InstitucionId = Institucion[InstitucionPk];
export type InstitucionOptionalAttributes = "idInstitucion" | "dom" | "email" | "tel" | "ubicacion" | "ciudad" | "provincia" | "direccion" | "pais" | "latitud" | "longitud";
export type InstitucionCreationAttributes = Optional<InstitucionAttributes, InstitucionOptionalAttributes>;

// type TInstitucion = InstitucionAttributes;

const INSTITUCION_ATTRIBUTES = {
  idInstitucion: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  dom: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  tel: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  ubicacion: {
    type: DataTypes.STRING(2083),
    allowNull: true
  },
  pais: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  ciudad: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  provincia: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  direccion: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  latitud: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  longitud: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}

export class Institucion extends Model<InstitucionAttributes, InstitucionCreationAttributes> implements InstitucionAttributes {
  idInstitucion!: number;
  nom!: string;
  dom?: string;
  email?: string;
  tel?: string;
  ubicacion?: string;
  pais?: string;
  ciudad?: string;
  provincia?: string;
  direccion?: string;
  latitud?: string;
  longitud?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Institucion {
    return Institucion.init(INSTITUCION_ATTRIBUTES, {
      sequelize,
      tableName: 'Institucion',
      timestamps: true,
      paranoid: true
    });
  }
}