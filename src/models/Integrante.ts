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


  // Integrante hasMany RolIntegrante via nroDoc
  roles!: RolIntegrante[];
  getRoles!: Sequelize.HasManyGetAssociationsMixin<RolIntegrante>;
  setRoles!: Sequelize.HasManySetAssociationsMixin<RolIntegrante, RolIntegranteId>;
  addRoles!: Sequelize.HasManyAddAssociationMixin<RolIntegrante, RolIntegranteId>;
  createRol!: Sequelize.HasManyCreateAssociationMixin<RolIntegrante>;
  removeRol!: Sequelize.HasManyRemoveAssociationMixin<RolIntegrante, RolIntegranteId>;
  hasRole!: Sequelize.HasManyHasAssociationsMixin<RolIntegrante, RolIntegranteId>;
  countRoles!: Sequelize.HasManyCountAssociationsMixin;
 
  // Integrante belongsTo Persona via nroDoc
  persona!: Persona;
  getPersona!: Sequelize.BelongsToGetAssociationMixin<Persona>;
  setPersona!: Sequelize.BelongsToSetAssociationMixin<Persona, PersonaId>;
  createPersona!: Sequelize.BelongsToCreateAssociationMixin<Persona>;
  
  // Integrante belongsTo Propuesta via codigoPropuesta
  propuesta !: Propuesta;
  getPropuesta!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setPropuesta!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createPropuesta!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;


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
