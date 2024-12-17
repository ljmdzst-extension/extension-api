import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ValoracionAttributes {
  idValoracion: number;
  nom: string;
}

export type ValoracionPk = "idValoracion";
export type ValoracionId = Valoracion[ValoracionPk];
export type ValoracionOptionalAttributes = "idValoracion";
export type ValoracionCreationAttributes = Optional<ValoracionAttributes, ValoracionOptionalAttributes>;

export type TValoracion = ValoracionAttributes;
const CONSTRAINT_ATTRIBUTES = {
  idValoracion: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}
const CONSTRAINT_OPTIONS = (sequelize : Sequelize.Sequelize)=>( {
  sequelize,
  tableName: 'Valoracion',
  timestamps: false
})
export class Valoracion extends Model<ValoracionAttributes, ValoracionCreationAttributes> implements ValoracionAttributes {
  idValoracion!: number;
  nom!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Valoracion {
    return Valoracion.init(CONSTRAINT_ATTRIBUTES,CONSTRAINT_OPTIONS(sequelize));
  }
}
