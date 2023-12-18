import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PalabraClaveAttributes {
  idPalabraClave: number;
  nom: string;
}

export type PalabraClavePk = "idPalabraClave";
export type PalabraClaveId = PalabraClave[PalabraClavePk];
export type PalabraClaveCreationAttributes = PalabraClaveAttributes;

export class PalabraClave extends Model<PalabraClaveAttributes, PalabraClaveCreationAttributes> implements PalabraClaveAttributes {
  idPalabraClave!: number;
  nom!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof PalabraClave {
    return PalabraClave.init({
    idPalabraClave: {
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
    tableName: 'PalabraClave',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPalabraClave" },
        ]
      },
    ]
  });
  }
}
