import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { PalabraClave, PalabraClaveId } from './PalabraClave';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaPalabraClaveAttributes {
  codigoPropuesta: string;
  idPalabraClave: number;
}

export type PropuestaPalabraClavePk = "codigoPropuesta" | "idPalabraClave";
export type PropuestaPalabraClaveId = PropuestaPalabraClave[PropuestaPalabraClavePk];
export type PropuestaPalabraClaveCreationAttributes = PropuestaPalabraClaveAttributes;

export class PropuestaPalabraClave extends Model<PropuestaPalabraClaveAttributes, PropuestaPalabraClaveCreationAttributes> implements PropuestaPalabraClaveAttributes {
  codigoPropuesta!: string;
  idPalabraClave!: number;

  // PropuestaPalabraClave belongsTo PalabraClave via idPalabraClave
  idPalabraClave_PalabraClave!: PalabraClave;
  getIdPalabraClave_PalabraClave!: Sequelize.BelongsToGetAssociationMixin<PalabraClave>;
  setIdPalabraClave_PalabraClave!: Sequelize.BelongsToSetAssociationMixin<PalabraClave, PalabraClaveId>;
  createIdPalabraClave_PalabraClave!: Sequelize.BelongsToCreateAssociationMixin<PalabraClave>;
  // PropuestaPalabraClave belongsTo Propuesta via codigoPropuesta
  codigoPropuesta_Propuestum!: Propuesta;
  getCodigoPropuesta_Propuestum!: Sequelize.BelongsToGetAssociationMixin<Propuesta>;
  setCodigoPropuesta_Propuestum!: Sequelize.BelongsToSetAssociationMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuestum!: Sequelize.BelongsToCreateAssociationMixin<Propuesta>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaPalabraClave {
    return PropuestaPalabraClave.init({
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
    },
    idPalabraClave: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'PalabraClave',
        key: 'idPalabraClave'
      }
    }
  }, {
    sequelize,
    tableName: 'PropuestaPalabraClave',
    timestamps: true,
    paranoid: true
  });
  }
}
