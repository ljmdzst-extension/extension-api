import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Relacion, RelacionId } from './Relacion';

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

  // TipoRelacion hasMany Relacion via idTipoRelacion
  relacions!: Relacion[];
  getRelacions!: Sequelize.HasManyGetAssociationsMixin<Relacion>;
  setRelacions!: Sequelize.HasManySetAssociationsMixin<Relacion, RelacionId>;
  addRelacion!: Sequelize.HasManyAddAssociationMixin<Relacion, RelacionId>;
  addRelacions!: Sequelize.HasManyAddAssociationsMixin<Relacion, RelacionId>;
  createRelacion!: Sequelize.HasManyCreateAssociationMixin<Relacion>;
  removeRelacion!: Sequelize.HasManyRemoveAssociationMixin<Relacion, RelacionId>;
  removeRelacions!: Sequelize.HasManyRemoveAssociationsMixin<Relacion, RelacionId>;
  hasRelacion!: Sequelize.HasManyHasAssociationMixin<Relacion, RelacionId>;
  hasRelacions!: Sequelize.HasManyHasAssociationsMixin<Relacion, RelacionId>;
  countRelacions!: Sequelize.HasManyCountAssociationsMixin;

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
    timestamps: false
  });
  }
}
