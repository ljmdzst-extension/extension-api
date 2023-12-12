import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';
import { RolIntegrante, RolIntegranteId } from './RolIntegrante';
import { Rol, RolId, RolPk } from './Rol';

export interface IntegranteAttributes {
  nroDoc: string;
  codigoPropuesta: string;
  carrera?: string;
  observ?: string;
  titulo?: string;
  tieneTarjeta?: number;
  dedicacionDocente?: string;
  categoriaDocente?: string;
  idAreaUnl?: number;
  periodoLectivo?: string;
  idUnidadAcademica?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type IntegrantePk = "nroDoc" | "codigoPropuesta";
export type IntegranteId = Integrante[IntegrantePk];
export type IntegranteOptionalAttributes = "carrera" | "observ" | "titulo" | "tieneTarjeta" | "dedicacionDocente" | "categoriaDocente" | "idAreaUnl" | "periodoLectivo" | "idUnidadAcademica" | "createdAt" | "updatedAt" | "deletedAt";
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
  idAreaUnl?: number;
  periodoLectivo?: string;
  idUnidadAcademica?: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  public async asignarRol( idRol : RolId, sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  :Promise<boolean> {

    let salida = false;

    const iRol = await Rol.initModel(sequelize).findByPk(idRol);

    if(iRol){
      const [idRolIntegrante , creado] = await RolIntegrante.initModel(sequelize).findOrCreate({
        defaults : {
          codigoPropuesta : this.codigoPropuesta,
          idRolIntegrante : iRol.idRolIntegrante,
          nroDoc : this.nroDoc
        },
        paranoid : false,
        transaction
      });

      if(!creado) {
        await idRolIntegrante.restore({transaction})
      }
    }

    return salida;

  } 

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
    idAreaUnl: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Relacion',
        key: 'idRelacion'
      },
      field: 'idAreaUNL'
    },
    periodoLectivo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idUnidadAcademica: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Relacion',
        key: 'idRelacion'
      }
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
        name: "fk_PropuestaIntegrante_Relacion1_idx",
        using: "BTREE",
        fields: [
          { name: "idAreaUNL" },
        ]
      },
      {
        name: "fk_PropuestaIntegrante_Relacion2_idx",
        using: "BTREE",
        fields: [
          { name: "idUnidadAcademica" },
        ]
      },
      {
        name: "fk_Integrante_Propuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
    ]
  });
  }
}
