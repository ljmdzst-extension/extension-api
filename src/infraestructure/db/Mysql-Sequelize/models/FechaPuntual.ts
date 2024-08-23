import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { domain } from '../../../../domain';


export interface FechaPuntualAttributes {
  idFecha: number;
  fecha: string;
}

export type FechaPuntualPk = "idFecha";
export type FechaPuntualId = FechaPuntual[FechaPuntualPk];
export type FechaPuntualOptionalAttributes = "idFecha";
export type FechaPuntualCreationAttributes = Optional<FechaPuntualAttributes, FechaPuntualOptionalAttributes>;

export class FechaPuntual extends Model<FechaPuntualAttributes, FechaPuntualCreationAttributes> implements FechaPuntualAttributes {
  idFecha!: number;
  fecha!: string;


  public static async buscarPorListaIds( ids : FechaPuntualId[] , transaction ?: Sequelize.Transaction) : Promise<domain.TDataFechaPuntual[]> {
    return (await FechaPuntual.findAll({where : { idFecha : ids}, transaction})).map( fp => ({ ...fp.dataValues, fecha : new Date(fp.dataValues.fecha)}));
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof FechaPuntual {
    return FechaPuntual.init({
    idFecha: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'FechaPuntual',
    timestamps: false
  });
  }
}
