import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { Programa, ProgramaId } from './Programa';

export interface AreaAttributes {
  idArea: number;
  nom: string;
  idPrograma: number;
}

export type AreaPk = "idArea";
export type AreaId = Area[AreaPk];
export type AreaOptionalAttributes = "idArea";
export type AreaCreationAttributes = Optional<AreaAttributes, AreaOptionalAttributes>;

export class Area extends Model<AreaAttributes, AreaCreationAttributes> implements AreaAttributes {
  idArea!: number;
  nom!: string;
  idPrograma!: number;

  // Area hasMany Actividad via idArea
  actividads!: Actividad[];
  getActividads!: Sequelize.HasManyGetAssociationsMixin<Actividad>;
  setActividads!: Sequelize.HasManySetAssociationsMixin<Actividad, ActividadId>;
  addActividad!: Sequelize.HasManyAddAssociationMixin<Actividad, ActividadId>;
  addActividads!: Sequelize.HasManyAddAssociationsMixin<Actividad, ActividadId>;
  createActividad!: Sequelize.HasManyCreateAssociationMixin<Actividad>;
  removeActividad!: Sequelize.HasManyRemoveAssociationMixin<Actividad, ActividadId>;
  removeActividads!: Sequelize.HasManyRemoveAssociationsMixin<Actividad, ActividadId>;
  hasActividad!: Sequelize.HasManyHasAssociationMixin<Actividad, ActividadId>;
  hasActividads!: Sequelize.HasManyHasAssociationsMixin<Actividad, ActividadId>;
  countActividads!: Sequelize.HasManyCountAssociationsMixin;
  // Area belongsTo Programa via idPrograma
  idProgramaPrograma!: Programa;
  getIdProgramaPrograma!: Sequelize.BelongsToGetAssociationMixin<Programa>;
  setIdProgramaPrograma!: Sequelize.BelongsToSetAssociationMixin<Programa, ProgramaId>;
  createIdProgramaPrograma!: Sequelize.BelongsToCreateAssociationMixin<Programa>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Area {
    return Area.init({
    idArea: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    idPrograma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Programa',
        key: 'idPrograma'
      }
    }
  }, {
    sequelize,
    tableName: 'Area',
    timestamps: false
  });
  }
}
