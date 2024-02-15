import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { EvaluacionItem, EvaluacionItemId } from './EvaluacionItem';
import type { Propuesta, PropuestaId } from './Propuesta';
import type { TipoEvaluacion, TipoEvaluacionId } from './TipoEvaluacion';
import type { Usuario, UsuarioId } from './Usuario';

export interface EvaluacionAttributes {
  idTipoEvaluacion: number;
  idEvaluacion: number;
  codigoPropuesta: string;
  observFinal?: string;
  valoracionFinal?: number;
  puntaje?: number;
}

export type EvaluacionPk = "idEvaluacion";
export type EvaluacionId = Evaluacion[EvaluacionPk];
export type EvaluacionOptionalAttributes = "observFinal" | "valoracionFinal" | "puntaje" ;
export type EvaluacionCreationAttributes = Optional<EvaluacionAttributes, EvaluacionOptionalAttributes>;

export class Evaluacion extends Model<EvaluacionAttributes, EvaluacionCreationAttributes> implements EvaluacionAttributes {
  idTipoEvaluacion!: number;
  idEvaluacion!: number;
  codigoPropuesta!: string;
  observFinal?: string;
  valoracionFinal?: number;
  puntaje?: number;

  // Evaluacion hasMany EvaluacionItem via idEvaluacion
  evaluacionItems!: EvaluacionItem[];
  getEvaluacionItems!: Sequelize.HasManyGetAssociationsMixin<EvaluacionItem>;
  setEvaluacionItems!: Sequelize.HasManySetAssociationsMixin<EvaluacionItem, EvaluacionItemId>;
  addEvaluacionItem!: Sequelize.HasManyAddAssociationMixin<EvaluacionItem, EvaluacionItemId>;
  addEvaluacionItems!: Sequelize.HasManyAddAssociationsMixin<EvaluacionItem, EvaluacionItemId>;
  createEvaluacionItem!: Sequelize.HasManyCreateAssociationMixin<EvaluacionItem>;
  removeEvaluacionItem!: Sequelize.HasManyRemoveAssociationMixin<EvaluacionItem, EvaluacionItemId>;
  removeEvaluacionItems!: Sequelize.HasManyRemoveAssociationsMixin<EvaluacionItem, EvaluacionItemId>;
  hasEvaluacionItem!: Sequelize.HasManyHasAssociationMixin<EvaluacionItem, EvaluacionItemId>;
  hasEvaluacionItems!: Sequelize.HasManyHasAssociationsMixin<EvaluacionItem, EvaluacionItemId>;
  countEvaluacionItems!: Sequelize.HasManyCountAssociationsMixin;
  // Evaluacion belongsToMany Usuario via idEvaluacion and idUsuario
  idUsuarioUsuarios!: Usuario[];
  getIdUsuarioUsuarios!: Sequelize.BelongsToManyGetAssociationsMixin<Usuario>;
  setIdUsuarioUsuarios!: Sequelize.BelongsToManySetAssociationsMixin<Usuario, UsuarioId>;
  addIdUsuarioUsuario!: Sequelize.BelongsToManyAddAssociationMixin<Usuario, UsuarioId>;
  addIdUsuarioUsuarios!: Sequelize.BelongsToManyAddAssociationsMixin<Usuario, UsuarioId>;
  createIdUsuarioUsuario!: Sequelize.BelongsToManyCreateAssociationMixin<Usuario>;
  removeIdUsuarioUsuario!: Sequelize.BelongsToManyRemoveAssociationMixin<Usuario, UsuarioId>;
  removeIdUsuarioUsuarios!: Sequelize.BelongsToManyRemoveAssociationsMixin<Usuario, UsuarioId>;
  hasIdUsuarioUsuario!: Sequelize.BelongsToManyHasAssociationMixin<Usuario, UsuarioId>;
  hasIdUsuarioUsuarios!: Sequelize.BelongsToManyHasAssociationsMixin<Usuario, UsuarioId>;
  countIdUsuarioUsuarios!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Evaluacion belongsTo Propuesta via codigoPropuesta
  codigoPropuestaPropuestum!: Propuesta;
  getCodigoPropuestaPropuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuestaPropuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;
  // Evaluacion belongsTo TipoEvaluacion via idTipoEvaluacion
  idTipoEvaluacionTipoEvaluacion!: TipoEvaluacion;
  getIdTipoEvaluacionTipoEvaluacion!: Sequelize.BelongsToGetAssociationMixin<TipoEvaluacion>;
  setIdTipoEvaluacionTipoEvaluacion!: Sequelize.BelongsToSetAssociationMixin<TipoEvaluacion, TipoEvaluacionId>;
  createIdTipoEvaluacionTipoEvaluacion!: Sequelize.BelongsToCreateAssociationMixin<TipoEvaluacion>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Evaluacion {
    return Evaluacion.init({
    idTipoEvaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TipoEvaluacion',
        key: 'idTipoEvaluacion'
      }
    },
    idEvaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
    },
    observFinal: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    valoracionFinal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    puntaje: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Evaluacion',
    timestamps: true,
    paranoid: true
  });
  }
}
