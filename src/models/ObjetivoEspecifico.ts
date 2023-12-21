import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ObjetivoEspecificoAttributes {
  idObjetivoEspecifico: number;
  codigoPropuesta: string;
  desc?: string;
  resEsp?: string;
}

export type ObjetivoEspecificoPk = "idObjetivoEspecifico";
export type ObjetivoEspecificoId = ObjetivoEspecifico[ObjetivoEspecificoPk];
export type ObjetivoEspecificoOptionalAttributes = "desc" | "resEsp" ;
export type ObjetivoEspecificoCreationAttributes = Optional<ObjetivoEspecificoAttributes, ObjetivoEspecificoOptionalAttributes>;

export class ObjetivoEspecifico extends Model<ObjetivoEspecificoAttributes, ObjetivoEspecificoCreationAttributes> implements ObjetivoEspecificoAttributes {
  idObjetivoEspecifico!: number;
  codigoPropuesta!: string;
  desc?: string;
  resEsp?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof ObjetivoEspecifico {
    return ObjetivoEspecifico.init({
    idObjetivoEspecifico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    resEsp: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ObjetivoEspecifico',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idObjetivoEspecifico" },
        ]
      },
      {
        name: "fkObjetivoEspecificoPropuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
    ]
  });
  }
}
