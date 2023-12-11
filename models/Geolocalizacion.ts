import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface GeolocalizacionAttributes {
  idGeolocalizacionProblematica: number;
  codigoPropuesta: string;
  enlace?: string;
  desc?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type GeolocalizacionPk = "idGeolocalizacionProblematica";
export type GeolocalizacionId = Geolocalizacion[GeolocalizacionPk];
export type GeolocalizacionOptionalAttributes = "enlace" | "desc" | "createdAt" | "updatedAt" | "deletedAt";
export type GeolocalizacionCreationAttributes = Optional<GeolocalizacionAttributes, GeolocalizacionOptionalAttributes>;

export class Geolocalizacion extends Model<GeolocalizacionAttributes, GeolocalizacionCreationAttributes> implements GeolocalizacionAttributes {
  idGeolocalizacionProblematica!: number;
  codigoPropuesta!: string;
  enlace?: string;
  desc?: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  // Geolocalizacion belongsTo Propuesta via codigoPropuesta
  codigoPropuestaPropuestum!: Propuesta;
  getCodigoPropuestaPropuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuestaPropuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Geolocalizacion {
    return Geolocalizacion.init({
    idGeolocalizacionProblematica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
    },
    enlace: {
      type: DataTypes.STRING(2083),
      allowNull: true
    },
    desc: {
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
    tableName: 'Geolocalizacion',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idGeolocalizacionProblematica" },
        ]
      },
      {
        name: "fkGeolocalizacionPropuestaPropuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
    ]
  });
  }
}
