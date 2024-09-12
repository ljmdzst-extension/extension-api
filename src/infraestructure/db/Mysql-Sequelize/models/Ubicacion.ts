import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UbicacionAttributes {
  idUbicacion: number;
  enlace: string;
  desc?: string;
}

export type UbicacionPk = "idUbicacion";
export type UbicacionId = Ubicacion[UbicacionPk];
export type UbicacionOptionalAttributes = "idUbicacion" | "desc";
export type UbicacionCreationAttributes = Optional<UbicacionAttributes, UbicacionOptionalAttributes>;

export class Ubicacion extends Model<UbicacionAttributes, UbicacionCreationAttributes> implements UbicacionAttributes {
  idUbicacion!: number;
  enlace!: string;
  desc?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Ubicacion {
    return Ubicacion.init({
    idUbicacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    enlace: {
      type: DataTypes.STRING(2083),
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Ubicacion',
    timestamps: false
  });
  }
}
