import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Area, AreaId } from './Area';
import type { Programa, ProgramaId } from './Programa';

export interface AreaProgramaAttributes {
  idArea: number;
  idPrograma: number;
  anio : number;
}

export type AreaProgramaPk = "idArea" | "idPrograma" | "anio";
export type AreaProgramaId = AreaPrograma[AreaProgramaPk];
export type AreaProgramaCreationAttributes = AreaProgramaAttributes;

export class AreaPrograma extends Model<AreaProgramaAttributes, AreaProgramaCreationAttributes> implements AreaProgramaAttributes {
  idArea!: number;
  idPrograma!: number;
  anio !: number;
  // AreaPrograma belongsTo Area via idArea
  area!: Area;
  getArea!: Sequelize.BelongsToGetAssociationMixin<Area>;
  setArea!: Sequelize.BelongsToSetAssociationMixin<Area, AreaId>;
  createArea!: Sequelize.BelongsToCreateAssociationMixin<Area>;

  // AreaPrograma belongsTo Programa via idPrograma
  programa!: Programa;
  getPrograma!: Sequelize.BelongsToGetAssociationMixin<Programa>;
  setPrograma!: Sequelize.BelongsToSetAssociationMixin<Programa, ProgramaId>;
  createPrograma!: Sequelize.BelongsToCreateAssociationMixin<Programa>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AreaPrograma {
    return AreaPrograma.init({
    idArea: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Area',
        key: 'idArea'
      }
    },
    idPrograma: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Programa',
            key: 'idPrograma'
        }
    },
    anio : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Area',
          key: 'anio'
        }
    }
  }, {
    sequelize,
    tableName: 'AreaPrograma',
    timestamps: false
  });
  }
}
