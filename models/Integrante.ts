import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { RolIntegranteAttributes, RolIntegranteId } from './RolIntegrante';
import { RolIntegrante } from './RolIntegrante';
import { Persona, PersonaAttributes } from './Persona';


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
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type IntegrantePk = "nroDoc" | "codigoPropuesta";
export type IntegranteId = Integrante[IntegrantePk];
export type IntegranteOptionalAttributes = "observ" | "titulo" | "tieneTarjeta" | "dedicacionDocente" | "categoriaDocente" | "idAreaUnl" | "idCarrera" | "periodoLectivo" | "createdAt" | "updatedAt" | "deletedAt";
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
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  public async verRoles( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<RolIntegrante[]> {
    return RolIntegrante.initModel(sequelize).findAll({
      where : {
        nroDoc : this.nroDoc,
        codigoPropuesta : this.codigoPropuesta
      },
      transaction
    });
  }

  public async verPersona( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) :
  Promise< PersonaAttributes | null > {
     return Persona.initModel(sequelize).findByPk(this.nroDoc,{transaction});
  }

  

  static initModel(sequelize: Sequelize.Sequelize): typeof Integrante {
    return Integrante.init({
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'persona',
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
        model: 'carrera',
        key: 'idCarrera'
      }
    },
    periodoLectivo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    updatedAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    deletedAt : {
      type : DataTypes.DATE,
      allowNull : true
    }
  }, {
    sequelize,
    tableName: 'Integrante',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nroDoc" },
          { name: "codigoPropuesta" },
        ]
      },
      {
        name: "fkIntegrantePropuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
      {
        name: "fkIntegranteRelacion1_idx",
        using: "BTREE",
        fields: [
          { name: "idAreaUNL" },
        ]
      },
      {
        name: "fkIntegranteCarrera1_idx",
        using: "BTREE",
        fields: [
          { name: "idCarrera" },
        ]
      },
    ]
  });
  }
}
