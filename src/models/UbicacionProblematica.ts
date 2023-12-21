import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { Ubicacion, UbicacionAttributes } from './Ubicacion';

export interface UbicacionProblematicaAttributes {
  idUbicacion: number;
  codigoPropuesta: string;
}

export type UbicacionProblematicaPk = "idUbicacion";
export type UbicacionProblematicaId = UbicacionProblematica[UbicacionProblematicaPk];

export class UbicacionProblematica extends Model<UbicacionProblematicaAttributes> implements UbicacionProblematicaAttributes {
  idUbicacion!: number;
  codigoPropuesta!: string;


  public async verDatos ( sequelize: Sequelize.Sequelize, transaction ?: Sequelize.Transaction ) :
  Promise< UbicacionAttributes | null > {
    return await Ubicacion.initModel(sequelize).findByPk(this.idUbicacion,{transaction});
  }

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
