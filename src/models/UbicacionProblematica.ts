import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';
import type { Ubicacion, UbicacionId } from './Ubicacion';

export interface UbicacionProblematicaAttributes {
  idUbicacion: number;
  codigoPropuesta: string;
}

export type UbicacionProblematicaPk = "idUbicacion";
export type UbicacionProblematicaId = UbicacionProblematica[UbicacionProblematicaPk];
export type UbicacionProblematicaCreationAttributes = UbicacionProblematicaAttributes;

export class UbicacionProblematica extends Model<UbicacionProblematicaAttributes, UbicacionProblematicaCreationAttributes> implements UbicacionProblematicaAttributes {
  idUbicacion!: number;
  codigoPropuesta!: string;

  // UbicacionProblematica belongsTo Propuesta via codigoPropuesta
  codigoPropuesta_Propuestum!: Propuesta;
  getCodigoPropuesta_Propuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuesta_Propuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;
  // UbicacionProblematica belongsTo Ubicacion via idUbicacion
  idUbicacion_Ubicacion!: Ubicacion;
  getIdUbicacion_Ubicacion!: Sequelize.BelongsToGetAssociationMixin<Ubicacion>;
  setIdUbicacion_Ubicacion!: Sequelize.BelongsToSetAssociationMixin<Ubicacion, UbicacionId>;
  createIdUbicacion_Ubicacion!: Sequelize.BelongsToCreateAssociationMixin<Ubicacion>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UbicacionProblematica {
    return UbicacionProblematica.init({
    idUbicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Ubicacion',
        key: 'idUbicacion'
      }
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
    }
  }, {
    sequelize,
    tableName: 'UbicacionProblematica',
    timestamps: true,
    paranoid: true
  });
  }
}
