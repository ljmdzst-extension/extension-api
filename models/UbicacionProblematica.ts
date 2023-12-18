import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UbicacionProblematicaAttributes {
  idUbicacion: number;
  codigoPropuesta: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type UbicacionProblematicaPk = "idUbicacion";
export type UbicacionProblematicaId = UbicacionProblematica[UbicacionProblematicaPk];
export type UbicacionProblematicaOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type UbicacionProblematicaCreationAttributes = Optional<UbicacionProblematicaAttributes, UbicacionProblematicaOptionalAttributes>;

export class UbicacionProblematica extends Model<UbicacionProblematicaAttributes, UbicacionProblematicaCreationAttributes> implements UbicacionProblematicaAttributes {
  idUbicacion!: number;
  codigoPropuesta!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof UbicacionProblematica {
    return UbicacionProblematica.init({
    idUbicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
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
    tableName: 'UbicacionProblematica',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUbicacion" },
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
