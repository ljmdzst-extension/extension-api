import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Area, AreaId } from './Area';

export interface ProgramaAttributes {
  idPrograma: number;
  nom: string;
  anio: number;
}

export type ProgramaPk = "idPrograma";
export type ProgramaId = Programa[ProgramaPk];
export type ProgramaOptionalAttributes = "idPrograma";
export type ProgramaCreationAttributes = Optional<ProgramaAttributes, ProgramaOptionalAttributes>;

export class Programa extends Model<ProgramaAttributes, ProgramaCreationAttributes> implements ProgramaAttributes {
  idPrograma!: number;
  nom!: string;
  anio!: number;

  // Programa hasMany Area via idPrograma
  areas!: Area[];
  getAreas!: Sequelize.HasManyGetAssociationsMixin<Area>;
  setAreas!: Sequelize.HasManySetAssociationsMixin<Area, AreaId>;
  addArea!: Sequelize.HasManyAddAssociationMixin<Area, AreaId>;
  addAreas!: Sequelize.HasManyAddAssociationsMixin<Area, AreaId>;
  createArea!: Sequelize.HasManyCreateAssociationMixin<Area>;
  removeArea!: Sequelize.HasManyRemoveAssociationMixin<Area, AreaId>;
  removeAreas!: Sequelize.HasManyRemoveAssociationsMixin<Area, AreaId>;
  hasArea!: Sequelize.HasManyHasAssociationMixin<Area, AreaId>;
  hasAreas!: Sequelize.HasManyHasAssociationsMixin<Area, AreaId>;
  countAreas!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Programa {
    return Programa.init({
    idPrograma: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Programa',
    timestamps: false
  });
  }
}
