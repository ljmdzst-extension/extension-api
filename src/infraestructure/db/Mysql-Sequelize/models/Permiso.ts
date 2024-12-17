import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PermisoAttributes {
  idPermiso: number;
  nombre: string;
}

export type PermisoPk = "idPermiso";
export type PermisoId = Permiso[PermisoPk];
export type PermisoOptionalAttributes = "idPermiso";
export type PermisoCreationAttributes = Optional<PermisoAttributes, PermisoOptionalAttributes>;

export class Permiso extends Model<PermisoAttributes, PermisoCreationAttributes> implements PermisoAttributes {
  idPermiso!: number;
  nombre!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Permiso {
    return Permiso.init({
    idPermiso: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Permiso',
    timestamps: false
  });
  }
}
