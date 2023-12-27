import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { RolIntegrante, RolIntegranteAttributes } from './RolIntegrante';
import { Persona, PersonaAttributes } from './Persona';
import { HookReturn } from 'sequelize/types/hooks';
import { RolId } from './Rol';


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
  updatedAt ?: Date;
  deletedAt ?: Date;
}

export type IntegrantePk = "nroDoc" | "codigoPropuesta";
export type IntegranteId = Integrante[IntegrantePk];
export type IntegranteOptionalAttributes = "observ" | "titulo" | "tieneTarjeta" | "dedicacionDocente" | "categoriaDocente" | "idAreaUnl" | "idCarrera" | "periodoLectivo" | "updatedAt" | "deletedAt" ;
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

  public async editarRoles ( data : RolId[], sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) :
  Promise< void >{

    if(data.length) {
      const acutalizarRoles = RolIntegrante.initModel(sequelize).bulkCreate(
        data.map( rol => ({nroDoc : this.nroDoc, idRolIntegrante : rol, codigoPropuesta : this.codigoPropuesta}) ),
        {
          updateOnDuplicate : ['updatedAt','deletedAt'],
          transaction
        }
      );
  
      const darDeBajaSobrantes = RolIntegrante.destroy({
        where : {
          codigoPropuesta : this.codigoPropuesta,
          idRolIntegrante : {[Sequelize.Op.not] : data.map( rol => rol)}
        },
        transaction
      });
  
      await acutalizarRoles;
      await darDeBajaSobrantes;
    }

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
