import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { RolIntegrante, RolIntegranteId } from './RolIntegrante';

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

  // Rol hasMany RolIntegrante via idRolIntegrante
  rolIntegrantes!: RolIntegrante[];
  getRolIntegrantes!: Sequelize.HasManyGetAssociationsMixin<RolIntegrante>;
  setRolIntegrantes!: Sequelize.HasManySetAssociationsMixin<RolIntegrante, RolIntegranteId>;
  addRolIntegrante!: Sequelize.HasManyAddAssociationMixin<RolIntegrante, RolIntegranteId>;
  addRolIntegrantes!: Sequelize.HasManyAddAssociationsMixin<RolIntegrante, RolIntegranteId>;
  createRolIntegrante!: Sequelize.HasManyCreateAssociationMixin<RolIntegrante>;
  removeRolIntegrante!: Sequelize.HasManyRemoveAssociationMixin<RolIntegrante, RolIntegranteId>;
  removeRolIntegrantes!: Sequelize.HasManyRemoveAssociationsMixin<RolIntegrante, RolIntegranteId>;
  hasRolIntegrante!: Sequelize.HasManyHasAssociationMixin<RolIntegrante, RolIntegranteId>;
  hasRolIntegrantes!: Sequelize.HasManyHasAssociationsMixin<RolIntegrante, RolIntegranteId>;
  countRolIntegrantes!: Sequelize.HasManyCountAssociationsMixin;

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
