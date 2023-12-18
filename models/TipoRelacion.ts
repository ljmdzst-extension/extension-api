import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TipoRelacionAttributes {
  idTipoRelacion: number;
  nom: string;
}

export type TipoRelacionPk = "idTipoRelacion";
export type TipoRelacionId = TipoRelacion[TipoRelacionPk];
export type TipoRelacionOptionalAttributes = "idTipoRelacion";
export type TipoRelacionCreationAttributes = Optional<TipoRelacionAttributes, TipoRelacionOptionalAttributes>;

export class TipoRelacion extends Model<TipoRelacionAttributes, TipoRelacionCreationAttributes> implements TipoRelacionAttributes {
  idTipoRelacion!: number;
  nom!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TipoRelacion {
    return TipoRelacion.init({
    idTipoRelacion: {
      autoIncrement: true,
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
    tableName: 'TipoRelacion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTipoRelacion" },
        ]
      },
    ]
  });
  }
}
