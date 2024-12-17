import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Objetivo, ObjetivoId } from './Objetivo';

export interface InstanciaAttributes {
  idInstancia: number;
  nom: string;
}

export type InstanciaPk = "idInstancia";
export type InstanciaId = Instancia[InstanciaPk];
export type InstanciaOptionalAttributes = "idInstancia";
export type InstanciaCreationAttributes = Optional<InstanciaAttributes, InstanciaOptionalAttributes>;

export class Instancia extends Model<InstanciaAttributes, InstanciaCreationAttributes> implements InstanciaAttributes {
  idInstancia!: number;
  nom!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Instancia {
    return Instancia.init({
    idInstancia: {
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
    tableName: 'Instancia',
    timestamps: false
  });
  }
}