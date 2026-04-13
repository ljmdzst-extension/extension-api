import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { TipoRelacion, TipoRelacionAttributes, TipoRelacionId } from './TipoRelacion';
import { HookReturn } from 'sequelize/types/hooks';

export interface RelacionAttributes {
  idRelacion: number;
  nom: string;
  idTipoRelacion: TipoRelacionId;
}

export type RelacionPk = "idRelacion";
export type RelacionId = Relacion[RelacionPk];
export type RelacionOptionalAttributes = "idRelacion";
export type RelacionCreationAttributes = Optional<RelacionAttributes, RelacionOptionalAttributes>;

export type TRelacion = {
  idRelacion : number;
  nom : string;
  tipoRelacion : TipoRelacionAttributes;
  desde : Date | null;
  hasta : Date | null
};

const CONSTRAINT_ATTRIBUTES = {
  idRelacion: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  idTipoRelacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'TipoRelacion',
      key: 'idTipoRelacion'
    }
  },
  desde: {
    type: DataTypes.DATE,
    allowNull: true
  },
  hasta: {
    type: DataTypes.DATE,
    allowNull: true
  }
}
const CONSTRAINT_OPTIONS = ( sequelize : Sequelize.Sequelize)=>({
  sequelize,
  tableName: 'Relacion',
  timestamps: false
})
export class Relacion extends Model<RelacionAttributes, RelacionCreationAttributes> implements RelacionAttributes {
  idRelacion!: number;
  nom!: string;
  idTipoRelacion!: number;

  tipoRelacion !: TipoRelacion;
  desde !: Date;
  hasta !: Date;

  static crear( data : RelacionCreationAttributes, tipoRelacion : TipoRelacion) : Relacion {
    const relacion = this.build(data);
    relacion.tipoRelacion = tipoRelacion;
    return relacion;
  }

  public verDatos() {
    return {
      idRelacion : this.idRelacion,
      nom : this.nom,
      tipoRelacion : this.tipoRelacion.verDatos(),
      desde : this.desde,
      hasta : this.hasta
    }
  }


  public async leerTipoRelacionBD( transaction?: Sequelize.Transaction ) : Promise<void> {
    return TipoRelacion.initModel(this.sequelize).findByPk(this.idTipoRelacion,{transaction})
                       .then( resp => {if(resp !== null) { this.tipoRelacion = resp; }} )
                       .catch( error => console.log(error) )
  }
 
 
  static initModel(sequelize: Sequelize.Sequelize): typeof Relacion {
    return Relacion.init(CONSTRAINT_ATTRIBUTES, CONSTRAINT_OPTIONS(sequelize));
  }
}
