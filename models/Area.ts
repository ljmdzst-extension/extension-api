import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AreaAttributes {
  idArea: number;
  nom: string;
  idPrograma: number;
}

export type AreaPk = "idArea";
export type AreaId = Area[AreaPk];
export type AreaOptionalAttributes = "idArea";
export type AreaCreationAttributes = Optional<AreaAttributes, AreaOptionalAttributes>;

export class Area extends Model<AreaAttributes, AreaCreationAttributes> implements AreaAttributes {
  idArea!: number;
  nom!: string;
  idPrograma!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Area {
    return Area.init({
    idArea: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    idPrograma: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Area',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idArea" },
        ]
      },
      {
        name: "fkAreaPrograma1_idx",
        using: "BTREE",
        fields: [
          { name: "idPrograma" },
        ]
      },
    ]
  });
  }
}
