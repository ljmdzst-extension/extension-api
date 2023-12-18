import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface IntegranteAttributes {
  nroDoc: string;
  codigoPropuesta: string;
  carrera?: string;
  observ?: string;
  titulo?: string;
  tieneTarjeta?: number;
  dedicacionDocente?: string;
  categoriaDocente?: string;
  idAreaUNL?: number;
  periodoLectivo?: string;
  idUnidadAcademica?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type IntegrantePk = "nroDoc" | "codigoPropuesta";
export type IntegranteId = Integrante[IntegrantePk];
export type IntegranteOptionalAttributes = "carrera" | "observ" | "titulo" | "tieneTarjeta" | "dedicacionDocente" | "categoriaDocente" | "idAreaUNL" | "periodoLectivo" | "idUnidadAcademica" | "createdAt" | "updatedAt" | "deletedAt";
export type IntegranteCreationAttributes = Optional<IntegranteAttributes, IntegranteOptionalAttributes>;

export class Integrante extends Model<IntegranteAttributes, IntegranteCreationAttributes> implements IntegranteAttributes {
  nroDoc!: string;
  codigoPropuesta!: string;
  carrera?: string;
  observ?: string;
  titulo?: string;
  tieneTarjeta?: number;
  dedicacionDocente?: string;
  categoriaDocente?: string;
  idAreaUNL?: number;
  periodoLectivo?: string;
  idUnidadAcademica?: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Integrante {
    return Integrante.init({
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    carrera: {
      type: DataTypes.STRING(255),
      allowNull: true
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
      allowNull: true
    },
    periodoLectivo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idUnidadAcademica: {
      type: DataTypes.INTEGER,
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
        name: "fkIntegranteRelacion2_idx",
        using: "BTREE",
        fields: [
          { name: "idUnidadAcademica" },
        ]
      },
    ]
  });
  }
}
