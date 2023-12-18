import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TipoObjetivoAttributes {
  idTipoObj: number;
  nom: string;
}

export type TipoObjetivoPk = "idTipoObj";
export type TipoObjetivoId = TipoObjetivo[TipoObjetivoPk];
export type TipoObjetivoOptionalAttributes = "idTipoObj";
export type TipoObjetivoCreationAttributes = Optional<TipoObjetivoAttributes, TipoObjetivoOptionalAttributes>;

export class TipoObjetivo extends Model<TipoObjetivoAttributes, TipoObjetivoCreationAttributes> implements TipoObjetivoAttributes {
  idTipoObj!: number;
  nom!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TipoObjetivo {
    return TipoObjetivo.init({
    idTipoObj: {
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
    tableName: 'TipoObjetivo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTipoObj" },
        ]
      },
    ]
  });
  }
}
