import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { TipoObjetivo, TipoObjetivoAttributes } from './TipoObjetivo';

export interface ObjetivoAttributes {
  idObjetivo: number;
  nom: string;
  detalle?: string;
  tipoObjId: number;
}

export type ObjetivoPk = "idObjetivo";
export type ObjetivoId = Objetivo[ObjetivoPk];
export type ObjetivoOptionalAttributes = "idObjetivo" | "detalle";
export type ObjetivoCreationAttributes = Optional<ObjetivoAttributes, ObjetivoOptionalAttributes>;

export type TObjetivo = {
  idObjetivo : ObjetivoId,
  nom : string,
  tipoObjetivo : TipoObjetivoAttributes
}

const CONSTRAINT_ATTRIBUTES = {
  idObjetivo: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  detalle: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  tipoObjId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'TipoObjetivo',
      key: 'idTipoObj'
    },
    field: 'tipo_obj_id'
  }
}

const CONSTRAINT_OPTIONS = (sequelize : Sequelize.Sequelize)=>({
  sequelize,
  tableName: 'Objetivo',
  timestamps: false
})
export class Objetivo extends Model<ObjetivoAttributes, ObjetivoCreationAttributes> implements ObjetivoAttributes {
  idObjetivo!: number;
  nom!: string;
  detalle?: string;
  tipoObjId!: number;

  tipoObjetivo !: TipoObjetivo;

  static crear( data : ObjetivoCreationAttributes, tipoObj : TipoObjetivo ) : Objetivo {
    const objetivo = this.build(data);
    
    objetivo.tipoObjetivo = tipoObj;
  
    return objetivo;
  } 

  public verDatos() {
    return {
      idObjetivo : this.idObjetivo,
      nom : this.nom,
      tipoObjetivo : this.tipoObjetivo.verDatos() 
    }
  }

  public async leerTipoObjetivoBD( transaction?: Sequelize.Transaction ) : Promise<void> {
    return TipoObjetivo.initModel(this.sequelize).findByPk(this.tipoObjId,{transaction})
                       .then( resp => {if(resp !== null) { this.tipoObjetivo = resp; }} )
                       .catch( error => console.log(error) )
  }
 
  static initModel(sequelize: Sequelize.Sequelize): typeof Objetivo {
    return Objetivo.init(CONSTRAINT_ATTRIBUTES,CONSTRAINT_OPTIONS(sequelize) );
  }
}
