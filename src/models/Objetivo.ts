import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ObjetivoAttributes {
  idObjetivo: number;
  nom: string;
  detalle?: string;
  tipo_obj_id: number;
}

export type ObjetivoPk = "idObjetivo";
export type ObjetivoId = Objetivo[ObjetivoPk];
export type ObjetivoOptionalAttributes = "idObjetivo" | "detalle";
export type ObjetivoCreationAttributes = Optional<ObjetivoAttributes, ObjetivoOptionalAttributes>;

export class Objetivo extends Model<ObjetivoAttributes, ObjetivoCreationAttributes> implements ObjetivoAttributes {
  idObjetivo!: number;
  nom!: string;
  detalle?: string;
  tipo_obj_id!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Objetivo {
    return Objetivo.init({
    idObjetivo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    detalle: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    tipo_obj_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Objetivo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idObjetivo" },
        ]
      },
      {
        name: "fk_objetivo_tipo_obj1_idx",
        using: "BTREE",
        fields: [
          { name: "tipo_obj_id" },
        ]
      },
    ]
  });
  }
}
