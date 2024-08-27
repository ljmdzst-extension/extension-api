import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { domain } from '../../../../domain';


export interface ProgramaAttributes {
  idPrograma: number;
  nom: string;
}

export type ProgramaPk = "idPrograma";
export type ProgramaId = Programa[ProgramaPk];
export type ProgramaOptionalAttributes = "idPrograma";
export type ProgramaCreationAttributes = Optional<ProgramaAttributes, ProgramaOptionalAttributes>;

export class Programa extends Model<ProgramaAttributes, ProgramaCreationAttributes> implements ProgramaAttributes {
  
  idPrograma!: number;
  nom!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Programa {
    return Programa.init({
    idPrograma: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Programa',
    timestamps: false
  });
  }
}


export class MPrograma implements domain.IModelPrograma {
  constructor( private sequelize : Sequelize.Sequelize ){}
  async buscarPor(parametros: Partial<domain.TDataPrograma>): Promise<domain.Programa[]> {
    throw new Error('Method not implemented.');
  }
  async verLista(anio: number): Promise<domain.Programa[]> {
    throw new Error('Method not implemented.');
  }
  async verListaConAreas(anio: number): Promise<domain.Programa[]> {
    throw new Error('Method not implemented.');
  }
}