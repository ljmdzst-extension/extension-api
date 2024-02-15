import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Carrera, CarreraId } from './Carrera';
import type { Persona, PersonaId } from './Persona';
import type { Propuesta, PropuestaId } from './Propuesta';
import type { Relacion, RelacionId } from './Relacion';
import type { RolIntegrante, RolIntegranteId } from './RolIntegrante';

export interface IntegranteAttributes {
  nroDoc: string;
  codigoPropuesta: string;
  tipoIntegrante: number;
  observ?: string;
  titulo?: string;
  tieneTarjeta?: number;
  dedicacionDocente?: string;
  categoriaDocente?: string;
  idAreaUnl?: number;
  idCarrera?: number;
  periodoLectivo?: string;
}

export type IntegrantePk = "nroDoc" | "codigoPropuesta";
export type IntegranteId = Integrante[IntegrantePk];
export type IntegranteOptionalAttributes = "observ" | "titulo" | "tieneTarjeta" | "dedicacionDocente" | "categoriaDocente" | "idAreaUnl" | "idCarrera" | "periodoLectivo" ;
export type IntegranteCreationAttributes = Optional<IntegranteAttributes, IntegranteOptionalAttributes>;

export class Integrante extends Model<IntegranteAttributes, IntegranteCreationAttributes> implements IntegranteAttributes {
  nroDoc!: string;
  codigoPropuesta!: string;
  tipoIntegrante!: number;
  observ?: string;
  titulo?: string;
  tieneTarjeta?: number;
  dedicacionDocente?: string;
  categoriaDocente?: string;
  idAreaUnl?: number;
  idCarrera?: number;
  periodoLectivo?: string;

  // Integrante belongsTo Carrera via idCarrera
  idCarreraCarrera!: Carrera;
  getIdCarreraCarrera!: Sequelize.BelongsToGetAssociationMixin<Carrera>;
  setIdCarreraCarrera!: Sequelize.BelongsToSetAssociationMixin<Carrera, CarreraId>;
  createIdCarreraCarrera!: Sequelize.BelongsToCreateAssociationMixin<Carrera>;
  // Integrante hasMany RolIntegrante via nroDoc
  rolIntegrantes!: RolIntegrante[];
  getRolIntegrantes!: Sequelize.HasManyGetAssociationsMixin<RolIntegrante>;
  setRolIntegrantes!: Sequelize.HasManySetAssociationsMixin<RolIntegrante, RolIntegranteId>;
  addRolIntegrante!: Sequelize.HasManyAddAssociationMixin<RolIntegrante, RolIntegranteId>;
  addRolIntegrantes!: Sequelize.HasManyAddAssociationsMixin<RolIntegrante, RolIntegranteId>;
  createRolIntegrante!: Sequelize.HasManyCreateAssociationMixin<RolIntegrante>;
  removeRolIntegrante!: Sequelize.HasManyRemoveAssociationMixin<RolIntegrante, RolIntegranteId>;
  removeRolIntegrantes!: Sequelize.HasManyRemoveAssociationsMixin<RolIntegrante, RolIntegranteId>;
  hasRolIntegrante!: Sequelize.HasManyHasAssociationMixin<RolIntegrante, RolIntegranteId>;
  hasRolIntegrantes!: Sequelize.HasManyHasAssociationsMixin<RolIntegrante, RolIntegranteId>;
  countRolIntegrantes!: Sequelize.HasManyCountAssociationsMixin;
  // Integrante hasMany RolIntegrante via codigoPropuesta
  codigoPropuestaRolIntegrantes!: RolIntegrante[];
  getCodigoPropuestaRolIntegrantes!: Sequelize.HasManyGetAssociationsMixin<RolIntegrante>;
  setCodigoPropuestaRolIntegrantes!: Sequelize.HasManySetAssociationsMixin<RolIntegrante, RolIntegranteId>;
  addCodigoPropuestaRolIntegrante!: Sequelize.HasManyAddAssociationMixin<RolIntegrante, RolIntegranteId>;
  addCodigoPropuestaRolIntegrantes!: Sequelize.HasManyAddAssociationsMixin<RolIntegrante, RolIntegranteId>;
  createCodigoPropuestaRolIntegrante!: Sequelize.HasManyCreateAssociationMixin<RolIntegrante>;
  removeCodigoPropuestaRolIntegrante!: Sequelize.HasManyRemoveAssociationMixin<RolIntegrante, RolIntegranteId>;
  removeCodigoPropuestaRolIntegrantes!: Sequelize.HasManyRemoveAssociationsMixin<RolIntegrante, RolIntegranteId>;
  hasCodigoPropuestaRolIntegrante!: Sequelize.HasManyHasAssociationMixin<RolIntegrante, RolIntegranteId>;
  hasCodigoPropuestaRolIntegrantes!: Sequelize.HasManyHasAssociationsMixin<RolIntegrante, RolIntegranteId>;
  countCodigoPropuestaRolIntegrantes!: Sequelize.HasManyCountAssociationsMixin;
  // Integrante belongsTo Persona via nroDoc
  nroDocPersona!: Persona;
  getNroDocPersona!: Sequelize.BelongsToGetAssociationMixin<Persona>;
  setNroDocPersona!: Sequelize.BelongsToSetAssociationMixin<Persona, PersonaId>;
  createNroDocPersona!: Sequelize.BelongsToCreateAssociationMixin<Persona>;
  // Integrante belongsTo Propuesta via codigoPropuesta
  codigoPropuestaPropuestum!: Propuesta;
  getCodigoPropuestaPropuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuestaPropuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;
  // Integrante belongsTo Relacion via idAreaUnl
  idAreaUnlRelacion!: Relacion;
  getIdAreaUnlRelacion!: Sequelize.BelongsToGetAssociationMixin<Relacion>;
  setIdAreaUnlRelacion!: Sequelize.BelongsToSetAssociationMixin<Relacion, RelacionId>;
  createIdAreaUnlRelacion!: Sequelize.BelongsToCreateAssociationMixin<Relacion>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Integrante {
    return Integrante.init({
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Persona',
        key: 'nroDoc'
      }
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
    },
    tipoIntegrante: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    observ: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tieneTarjeta: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dedicacionDocente: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    categoriaDocente: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idAreaUnl: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Relacion',
        key: 'idRelacion'
      },
      field: 'idAreaUNL'
    },
    idCarrera: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Carrera',
        key: 'idCarrera'
      }
    },
    periodoLectivo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Integrante',
    timestamps: true,
    paranoid: true
  });
  }
}
