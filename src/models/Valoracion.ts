import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Meta, MetaId } from './Meta';

export interface ValoracionAttributes {
  idValoracion: number;
  nom: string;
}

export type ValoracionPk = "idValoracion";
export type ValoracionId = Valoracion[ValoracionPk];
export type ValoracionOptionalAttributes = "idValoracion";
export type ValoracionCreationAttributes = Optional<ValoracionAttributes, ValoracionOptionalAttributes>;

export class Valoracion extends Model<ValoracionAttributes, ValoracionCreationAttributes> implements ValoracionAttributes {
  idValoracion!: number;
  nom!: string;

  // Valoracion hasMany Meta via idValoracion
  meta!: Meta[];
  getMeta!: Sequelize.HasManyGetAssociationsMixin<Meta>;
  setMeta!: Sequelize.HasManySetAssociationsMixin<Meta, MetaId>;
  addMetum!: Sequelize.HasManyAddAssociationMixin<Meta, MetaId>;
  addMeta!: Sequelize.HasManyAddAssociationsMixin<Meta, MetaId>;
  createMetum!: Sequelize.HasManyCreateAssociationMixin<Meta>;
  removeMetum!: Sequelize.HasManyRemoveAssociationMixin<Meta, MetaId>;
  removeMeta!: Sequelize.HasManyRemoveAssociationsMixin<Meta, MetaId>;
  hasMetum!: Sequelize.HasManyHasAssociationMixin<Meta, MetaId>;
  hasMeta!: Sequelize.HasManyHasAssociationsMixin<Meta, MetaId>;
  countMeta!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Valoracion {
    return Valoracion.init({
    idValoracion: {
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
    tableName: 'Valoracion',
    timestamps: false
  });
  }
}
