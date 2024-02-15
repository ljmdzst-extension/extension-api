import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Institucion, InstitucionId } from './Institucion';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaInstitucionAttributes {
  idInstitucion: number;
  codigoPropuesta: string;
  antecedentes?: string;
  valoracion?: number;
}

export type PropuestaInstitucionPk = "idInstitucion" | "codigoPropuesta";
export type PropuestaInstitucionId = PropuestaInstitucion[PropuestaInstitucionPk];
export type PropuestaInstitucionOptionalAttributes = "antecedentes" | "valoracion" ;
export type PropuestaInstitucionCreationAttributes = Optional<PropuestaInstitucionAttributes, PropuestaInstitucionOptionalAttributes>;

export class PropuestaInstitucion extends Model<PropuestaInstitucionAttributes, PropuestaInstitucionCreationAttributes> implements PropuestaInstitucionAttributes {
  idInstitucion!: number;
  codigoPropuesta!: string;
  antecedentes?: string;
  valoracion?: number;

  // PropuestaInstitucion belongsTo Institucion via idInstitucion
  idInstitucionInstitucion!: Institucion;
  getIdInstitucionInstitucion!: Sequelize.BelongsToGetAssociationMixin<Institucion>;
  setIdInstitucionInstitucion!: Sequelize.BelongsToSetAssociationMixin<Institucion, InstitucionId>;
  createIdInstitucionInstitucion!: Sequelize.BelongsToCreateAssociationMixin<Institucion>;
  // PropuestaInstitucion belongsTo Propuesta via codigoPropuesta
  codigoPropuestaPropuestum!: Propuesta;
  getCodigoPropuestaPropuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuestaPropuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaInstitucion {
    return PropuestaInstitucion.init({
    idInstitucion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Institucion',
        key: 'idInstitucion'
      }
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
    },
    antecedentes: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    valoracion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PropuestaInstitucion',
    timestamps: true,
    paranoid: true
  });
  }
}
