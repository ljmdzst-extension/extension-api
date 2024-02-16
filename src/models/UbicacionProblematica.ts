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
  codigoPropuestaPropuestum!: Propuesta;
  getCodigoPropuestaPropuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuestaPropuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;
  // UbicacionProblematica belongsTo Ubicacion via idUbicacion
  ubicacion!: Ubicacion;
  getUbicacion!: Sequelize.BelongsToGetAssociationMixin<Ubicacion>;
  setUbicacion!: Sequelize.BelongsToSetAssociationMixin<Ubicacion, UbicacionId>;
  createUbicacion!: Sequelize.BelongsToCreateAssociationMixin<Ubicacion>;

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
