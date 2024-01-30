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
  EvaluacionItems!: EvaluacionItem[];
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
  idUsuario_Usuarios!: Usuario[];
  getIdUsuario_Usuarios!: Sequelize.BelongsToManyGetAssociationsMixin<Usuario>;
  setIdUsuario_Usuarios!: Sequelize.BelongsToManySetAssociationsMixin<Usuario, UsuarioId>;
  addIdUsuario_Usuario!: Sequelize.BelongsToManyAddAssociationMixin<Usuario, UsuarioId>;
  addIdUsuario_Usuarios!: Sequelize.BelongsToManyAddAssociationsMixin<Usuario, UsuarioId>;
  createIdUsuario_Usuario!: Sequelize.BelongsToManyCreateAssociationMixin<Usuario>;
  removeIdUsuario_Usuario!: Sequelize.BelongsToManyRemoveAssociationMixin<Usuario, UsuarioId>;
  removeIdUsuario_Usuarios!: Sequelize.BelongsToManyRemoveAssociationsMixin<Usuario, UsuarioId>;
  hasIdUsuario_Usuario!: Sequelize.BelongsToManyHasAssociationMixin<Usuario, UsuarioId>;
  hasIdUsuario_Usuarios!: Sequelize.BelongsToManyHasAssociationsMixin<Usuario, UsuarioId>;
  countIdUsuario_Usuarios!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Evaluacion belongsTo Propuesta via codigoPropuesta
  codigoPropuesta_Propuestum!: Propuesta;
  getCodigoPropuesta_Propuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuesta_Propuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;
  // Evaluacion belongsTo TipoEvaluacion via idTipoEvaluacion
  idTipoEvaluacion_TipoEvaluacion!: TipoEvaluacion;
  getIdTipoEvaluacion_TipoEvaluacion!: Sequelize.BelongsToGetAssociationMixin<TipoEvaluacion>;
  setIdTipoEvaluacion_TipoEvaluacion!: Sequelize.BelongsToSetAssociationMixin<TipoEvaluacion, TipoEvaluacionId>;
  createIdTipoEvaluacion_TipoEvaluacion!: Sequelize.BelongsToCreateAssociationMixin<TipoEvaluacion>;

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
