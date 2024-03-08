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
  codigoPropuestaPropuestaPropuestaPalabraClaves!: Propuesta[];
  getCodigoPropuestaPropuestaPropuestaPalabraClaves!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuestaPropuestaPropuestaPalabraClaves!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPropuestaPropuestaPalabraClave!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPropuestaPropuestaPalabraClaves!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestaPropuestaPalabraClave!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuestaPropuestaPropuestaPalabraClave!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuestaPropuestaPropuestaPalabraClaves!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPropuestaPropuestaPalabraClave!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPropuestaPropuestaPalabraClaves!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuestaPropuestaPropuestaPalabraClaves!: Sequelize.BelongsToManyCountAssociationsMixin;
  // PalabraClave hasMany PropuestaPalabraClave via idPalabraClave
  propuestaPalabraClaves!: PropuestaPalabraClave[];
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
      primaryKey: true,
      autoIncrement : true
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
