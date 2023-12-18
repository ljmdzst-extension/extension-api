import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface MetaAttributes {
  idMeta: number;
  descripcion: string;
  resultado?: string;
  observaciones?: string;
  idValoracion?: number;
  idActividad: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type MetaPk = "idMeta";
export type MetaId = Meta[MetaPk];
export type MetaOptionalAttributes = "idMeta" | "resultado" | "observaciones" | "idValoracion" | "createdAt" | "updatedAt" | "deletedAt";
export type MetaCreationAttributes = Optional<MetaAttributes, MetaOptionalAttributes>;

export class Meta extends Model<MetaAttributes, MetaCreationAttributes> implements MetaAttributes {
  idMeta!: number;
  descripcion!: string;
  resultado?: string;
  observaciones?: string;
  idValoracion?: number;
  idActividad!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


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
      allowNull: true
    },
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'Meta',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMeta" },
        ]
      },
      {
        name: "fkmetavaloracion1_idx",
        using: "BTREE",
        fields: [
          { name: "idValoracion" },
        ]
      },
      {
        name: "fkmetaActividad1_idx",
        using: "BTREE",
        fields: [
          { name: "idActividad" },
        ]
      },
    ]
  });
  }
}
