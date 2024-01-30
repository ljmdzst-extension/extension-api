import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ProgramaSippe, ProgramaSippeId } from './ProgramaSippe';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaProgramaExtensionAttributes {
  idProgramaExtension: number;
  codigoPropuesta: string;
}

export type PropuestaProgramaExtensionPk = "idProgramaExtension" | "codigoPropuesta";
export type PropuestaProgramaExtensionId = PropuestaProgramaExtension[PropuestaProgramaExtensionPk];
export type PropuestaProgramaExtensionCreationAttributes =PropuestaProgramaExtensionAttributes;

export class PropuestaProgramaExtension extends Model<PropuestaProgramaExtensionAttributes, PropuestaProgramaExtensionCreationAttributes> implements PropuestaProgramaExtensionAttributes {
  idProgramaExtension!: number;
  codigoPropuesta!: string;

  // PropuestaProgramaExtension belongsTo ProgramaSippe via idProgramaExtension
  idProgramaExtension_ProgramaSIPPE!: ProgramaSippe;
  getIdProgramaExtension_ProgramaSIPPE!: Sequelize.BelongsToGetAssociationMixin<ProgramaSippe>;
  setIdProgramaExtension_ProgramaSIPPE!: Sequelize.BelongsToSetAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  createIdProgramaExtension_ProgramaSIPPE!: Sequelize.BelongsToCreateAssociationMixin<ProgramaSippe>;
  // PropuestaProgramaExtension belongsTo Propuesta via codigoPropuesta
  codigoPropuesta_Propuestum!: Propuesta;
  getCodigoPropuesta_Propuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuesta_Propuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaProgramaExtension {
    return PropuestaProgramaExtension.init({
    idProgramaExtension: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ProgramaSIPPE',
        key: 'idProgramaSIPPE'
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
    }
  }, {
    sequelize,
    tableName: 'PropuestaProgramaExtension',
    timestamps: true,
    paranoid: true
  });
  }
}
