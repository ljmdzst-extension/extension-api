import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface RelacionAttributes {
  idRelacion: number;
  nom: string;
  idTipoRelacion: number;
}

export type RelacionPk = "idRelacion";
export type RelacionId = Relacion[RelacionPk];
export type RelacionOptionalAttributes = "idRelacion";
export type RelacionCreationAttributes = Optional<RelacionAttributes, RelacionOptionalAttributes>;

export class Relacion extends Model<RelacionAttributes, RelacionCreationAttributes> implements RelacionAttributes {
  idRelacion!: number;
  nom!: string;
  idTipoRelacion!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Relacion {
    return Relacion.init({
    idRelacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idTipoRelacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Relacion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idRelacion" },
        ]
      },
      {
        name: "fkRelacionTipoRelacion1_idx",
        using: "BTREE",
        fields: [
          { name: "idTipoRelacion" },
        ]
      },
    ]
  });
  }
}
