import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { domain } from '../../../../domain';

export interface EnlaceAttributes {
  idEnlace: number;
  desc: string;
  link: string;
  idActividad: number;
}

export type EnlacePk = "idEnlace";
export type EnlaceId = Enlace[EnlacePk];
export type EnlaceOptionalAttributes = "idEnlace" ;
export type EnlaceCreationAttributes = Optional<EnlaceAttributes, EnlaceOptionalAttributes>;

// export type TEnlace = EnlaceAttributes

const ENLACE_ATTRIBUTES = {
  idEnlace: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  desc: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  link: {
    type: DataTypes.STRING(2083),
    allowNull: false
  },
  idActividad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Actividad',
      key: 'idActividad'
    }
  }
}

export class Enlace extends Model<EnlaceAttributes, EnlaceCreationAttributes> implements EnlaceAttributes {
  idEnlace!: number;
  desc!: string;
  link!: string;
  idActividad !: number;
  
  public static async buscarPorActividad( a : domain.Actividad, transaction ?: Sequelize.Transaction ) : Promise<domain.TDataEnlace[]> {
   
    return Enlace.findAll({where : { idActividad : a.verDatos().idActividad},transaction});
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof Enlace {
    return Enlace.init(ENLACE_ATTRIBUTES, {
    sequelize,
    tableName: 'Enlace',
    timestamps: true,
    paranoid: true
  });
  }
}
