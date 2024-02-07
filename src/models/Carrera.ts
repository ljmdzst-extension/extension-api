import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Integrante, IntegranteId } from './Integrante';
import type { Relacion, RelacionId } from './Relacion';

export interface CarreraAttributes {
  idCarrera: number;
  idUnidadAcademica: number;
  nom: string;
}

export type CarreraPk = "idCarrera";
export type CarreraId = Carrera[CarreraPk];
export type CarreraCreationAttributes = CarreraAttributes;

export class Carrera extends Model<CarreraAttributes, CarreraCreationAttributes> implements CarreraAttributes {
  idCarrera!: number;
  idUnidadAcademica!: number;
  nom!: string;

  // Carrera hasMany Integrante via idCarrera
  integrantes!: Integrante[];
  getIntegrantes!: Sequelize.HasManyGetAssociationsMixin<Integrante>;
  setIntegrantes!: Sequelize.HasManySetAssociationsMixin<Integrante, IntegranteId>;
  addIntegrante!: Sequelize.HasManyAddAssociationMixin<Integrante, IntegranteId>;
  addIntegrantes!: Sequelize.HasManyAddAssociationsMixin<Integrante, IntegranteId>;
  createIntegrante!: Sequelize.HasManyCreateAssociationMixin<Integrante>;
  removeIntegrante!: Sequelize.HasManyRemoveAssociationMixin<Integrante, IntegranteId>;
  removeIntegrantes!: Sequelize.HasManyRemoveAssociationsMixin<Integrante, IntegranteId>;
  hasIntegrante!: Sequelize.HasManyHasAssociationMixin<Integrante, IntegranteId>;
  hasIntegrantes!: Sequelize.HasManyHasAssociationsMixin<Integrante, IntegranteId>;
  countIntegrantes!: Sequelize.HasManyCountAssociationsMixin;
  // Carrera belongsTo Relacion via idUnidadAcademica
  idUnidadAcademicaRelacion!: Relacion;
  getIdUnidadAcademicaRelacion!: Sequelize.BelongsToGetAssociationMixin<Relacion>;
  setIdUnidadAcademicaRelacion!: Sequelize.BelongsToSetAssociationMixin<Relacion, RelacionId>;
  createIdUnidadAcademicaRelacion!: Sequelize.BelongsToCreateAssociationMixin<Relacion>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Carrera {
    return Carrera.init({
    idCarrera: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idUnidadAcademica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Relacion',
        key: 'idRelacion'
      }
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Carrera',
    timestamps: false
  });
  }
}
