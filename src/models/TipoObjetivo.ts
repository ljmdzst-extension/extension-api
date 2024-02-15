import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Objetivo, ObjetivoId } from './Objetivo';

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

  // TipoObjetivo hasMany Objetivo via tipoObjId
  objetivos!: Objetivo[];
  getObjetivos!: Sequelize.HasManyGetAssociationsMixin<Objetivo>;
  setObjetivos!: Sequelize.HasManySetAssociationsMixin<Objetivo, ObjetivoId>;
  addObjetivo!: Sequelize.HasManyAddAssociationMixin<Objetivo, ObjetivoId>;
  addObjetivos!: Sequelize.HasManyAddAssociationsMixin<Objetivo, ObjetivoId>;
  createObjetivo!: Sequelize.HasManyCreateAssociationMixin<Objetivo>;
  removeObjetivo!: Sequelize.HasManyRemoveAssociationMixin<Objetivo, ObjetivoId>;
  removeObjetivos!: Sequelize.HasManyRemoveAssociationsMixin<Objetivo, ObjetivoId>;
  hasObjetivo!: Sequelize.HasManyHasAssociationMixin<Objetivo, ObjetivoId>;
  hasObjetivos!: Sequelize.HasManyHasAssociationsMixin<Objetivo, ObjetivoId>;
  countObjetivos!: Sequelize.HasManyCountAssociationsMixin;

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
    timestamps: false
  });
  }
}
