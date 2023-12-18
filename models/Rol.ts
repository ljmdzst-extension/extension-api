import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface RolAttributes {
  idRolIntegrante: number;
  nom: string;
}

export type RolPk = "idRolIntegrante";
export type RolId = Rol[RolPk];
export type RolCreationAttributes = RolAttributes;

export class Rol extends Model<RolAttributes, RolCreationAttributes> implements RolAttributes {
  idRolIntegrante!: number;
  nom!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Rol {
    return Rol.init({
    idRolIntegrante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Rol',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idRolIntegrante" },
        ]
      },
    ]
  });
  }
}
