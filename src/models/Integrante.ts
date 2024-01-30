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
  idAreaUNL?: number;
  idCarrera?: number;
  periodoLectivo?: string;
}

export type IntegrantePk = "nroDoc" | "codigoPropuesta";
export type IntegranteId = Integrante[IntegrantePk];
export type IntegranteOptionalAttributes = "observ" | "titulo" | "tieneTarjeta" | "dedicacionDocente" | "categoriaDocente" | "idAreaUNL" | "idCarrera" | "periodoLectivo";
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
  idAreaUNL?: number;
  idCarrera?: number;
  periodoLectivo?: string;

  // Integrante belongsTo Carrera via idCarrera
  idCarrera_Carrera!: Carrera;
  getIdCarrera_Carrera!: Sequelize.BelongsToGetAssociationMixin<Carrera>;
  setIdCarrera_Carrera!: Sequelize.BelongsToSetAssociationMixin<Carrera, CarreraId>;
  createIdCarrera_Carrera!: Sequelize.BelongsToCreateAssociationMixin<Carrera>;
  // Integrante hasMany RolIntegrante via nroDoc
  RolIntegrantes!: RolIntegrante[];
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
  codigoPropuesta_RolIntegrantes!: RolIntegrante[];
  getCodigoPropuesta_RolIntegrantes!: Sequelize.HasManyGetAssociationsMixin<RolIntegrante>;
  setCodigoPropuesta_RolIntegrantes!: Sequelize.HasManySetAssociationsMixin<RolIntegrante, RolIntegranteId>;
  addCodigoPropuesta_RolIntegrante!: Sequelize.HasManyAddAssociationMixin<RolIntegrante, RolIntegranteId>;
  addCodigoPropuesta_RolIntegrantes!: Sequelize.HasManyAddAssociationsMixin<RolIntegrante, RolIntegranteId>;
  createCodigoPropuesta_RolIntegrante!: Sequelize.HasManyCreateAssociationMixin<RolIntegrante>;
  removeCodigoPropuesta_RolIntegrante!: Sequelize.HasManyRemoveAssociationMixin<RolIntegrante, RolIntegranteId>;
  removeCodigoPropuesta_RolIntegrantes!: Sequelize.HasManyRemoveAssociationsMixin<RolIntegrante, RolIntegranteId>;
  hasCodigoPropuesta_RolIntegrante!: Sequelize.HasManyHasAssociationMixin<RolIntegrante, RolIntegranteId>;
  hasCodigoPropuesta_RolIntegrantes!: Sequelize.HasManyHasAssociationsMixin<RolIntegrante, RolIntegranteId>;
  countCodigoPropuesta_RolIntegrantes!: Sequelize.HasManyCountAssociationsMixin;
  // Integrante belongsTo Persona via nroDoc
  nroDoc_Persona!: Persona;
  getNroDoc_Persona!: Sequelize.BelongsToGetAssociationMixin<Persona>;
  setNroDoc_Persona!: Sequelize.BelongsToSetAssociationMixin<Persona, PersonaId>;
  createNroDoc_Persona!: Sequelize.BelongsToCreateAssociationMixin<Persona>;
  // Integrante belongsTo Propuesta via codigoPropuesta
  codigoPropuesta_Propuestum!: Propuesta;
  getCodigoPropuesta_Propuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuesta_Propuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;
  // Integrante belongsTo Relacion via idAreaUNL
  idAreaUNL_Relacion!: Relacion;
  getIdAreaUNL_Relacion!: Sequelize.BelongsToGetAssociationMixin<Relacion>;
  setIdAreaUNL_Relacion!: Sequelize.BelongsToSetAssociationMixin<Relacion, RelacionId>;
  createIdAreaUNL_Relacion!: Sequelize.BelongsToCreateAssociationMixin<Relacion>;

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
    idAreaUNL: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Relacion',
        key: 'idRelacion'
      }
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
