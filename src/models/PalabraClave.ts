import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';
import type { PropuestaPalabraClave, PropuestaPalabraClaveId } from './PropuestaPalabraClave';

export interface PalabraClaveAttributes {
  idPalabraClave: number;
  nom: string;
}

export type PalabraClavePk = "idPalabraClave";
export type PalabraClaveId = PalabraClave[PalabraClavePk];
export type PalabraClaveCreationAttributes = PalabraClaveAttributes;

export class PalabraClave extends Model<PalabraClaveAttributes, PalabraClaveCreationAttributes> implements PalabraClaveAttributes {
  idPalabraClave!: number;
  nom!: string;

  // PalabraClave belongsToMany Propuesta via idPalabraClave and codigoPropuesta
  codigoPropuesta_Propuesta_PropuestaPalabraClaves!: Propuesta[];
  getCodigoPropuesta_Propuesta_PropuestaPalabraClaves!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuesta_Propuesta_PropuestaPalabraClaves!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaPalabraClave!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaPalabraClaves!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuesta_PropuestaPalabraClave!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuesta_Propuesta_PropuestaPalabraClave!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuesta_Propuesta_PropuestaPalabraClaves!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaPalabraClave!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaPalabraClaves!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuesta_Propuesta_PropuestaPalabraClaves!: Sequelize.BelongsToManyCountAssociationsMixin;
  // PalabraClave hasMany PropuestaPalabraClave via idPalabraClave
  PropuestaPalabraClaves!: PropuestaPalabraClave[];
  getPropuestaPalabraClaves!: Sequelize.HasManyGetAssociationsMixin<PropuestaPalabraClave>;
  setPropuestaPalabraClaves!: Sequelize.HasManySetAssociationsMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  addPropuestaPalabraClave!: Sequelize.HasManyAddAssociationMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  addPropuestaPalabraClaves!: Sequelize.HasManyAddAssociationsMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  createPropuestaPalabraClave!: Sequelize.HasManyCreateAssociationMixin<PropuestaPalabraClave>;
  removePropuestaPalabraClave!: Sequelize.HasManyRemoveAssociationMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  removePropuestaPalabraClaves!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  hasPropuestaPalabraClave!: Sequelize.HasManyHasAssociationMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  hasPropuestaPalabraClaves!: Sequelize.HasManyHasAssociationsMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  countPropuestaPalabraClaves!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof PalabraClave {
    return PalabraClave.init({
    idPalabraClave: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PalabraClave',
    timestamps: false
  });
  }
}
