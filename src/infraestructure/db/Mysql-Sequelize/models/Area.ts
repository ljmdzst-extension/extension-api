import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { domain } from '../../../../domain';

export interface AreaAttributes {
  idArea: number;
  nom: string;
}

export type AreaPk = "idArea";
export type AreaId = Area[AreaPk];
export type AreaOptionalAttributes = "idArea";
export type AreaCreationAttributes = Optional<AreaAttributes, AreaOptionalAttributes>;



const AREA_ATTRIBUTES = {
  idArea: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(150),
    allowNull: false
  }
}

export class Area extends Model<AreaAttributes, AreaCreationAttributes> implements AreaAttributes, domain.IModelArea {
 
  idArea!: number;
  nom!: string;

  buscarPorId(idArea: number): Promise<domain.Area | null> {
    throw new Error('Method not implemented.');
  }
  static initModel(sequelize: Sequelize.Sequelize): typeof Area {
    return Area.init(AREA_ATTRIBUTES, {
    sequelize,
    tableName: 'Area',
    timestamps: false
  });
  }
}
