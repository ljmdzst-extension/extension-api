import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { Actividad } from './Actividad';
import { ESTADO_BD } from '../types/general';


export interface RelacionActividadAttributes {
  idRelacion: number;
  idActividad: number;
}

export type RelacionActividadPk = "idRelacion" | "idActividad";
export type RelacionActividadId = RelacionActividad[RelacionActividadPk];
export type RelacionActividadCreationAttributes = RelacionActividadAttributes;

const CONSTRAINT_ATTRIBUTES = {
  idRelacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Relacion',
      key: 'idRelacion'
    }
  },
  idActividad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Actividad',
      key: 'idActividad'
    }
  }
}

const CONSTRAINT_OPTIONS = ( sequelize : Sequelize.Sequelize)=>({
  sequelize,
  tableName: 'RelacionActividad',
  timestamps: true,
  paranoid: true
})

export class RelacionActividad extends Model<RelacionActividadAttributes, RelacionActividadCreationAttributes> implements RelacionActividadAttributes {
  idRelacion!: number;
  idActividad!: number;
  
  estadoEnBD !: ESTADO_BD;

  public verID() : number 
    {
        return this.idRelacion;
    }
    
  public verDatos () 
  {
      return this.dataValues;
  }

  public darDeAltaBD()
  {
      this.estadoEnBD = ESTADO_BD.A;
  }

  public darDeBajaBD()
  {
      this.estadoEnBD = ESTADO_BD.B;
  }

  public guardarEnBD(transaction ?: Sequelize.Transaction ) : Promise<any>[] {

    if(process.env.NODE_ENV === 'development') console.log('RelacionActividad.guardarEnBD()');

    let salida :  Promise<any>[] = [];

    if(this.estadoEnBD === ESTADO_BD.B) {
      salida = [...salida,this.destroy({transaction})];
    }

    if(this.estadoEnBD === ESTADO_BD.A || this.estadoEnBD === ESTADO_BD.M) {
      salida = [...salida,this.save({transaction})]
    }

    return salida;
  }

  public static async buscarPorActBD(iAct: Actividad, transaction?: Sequelize.Transaction ): Promise<RelacionActividad[]> {

    return await this.findAll({where : {idActividad : iAct.verID()},transaction});

  }

  
  
  static initModel(sequelize: Sequelize.Sequelize): typeof RelacionActividad {
    return RelacionActividad.init(CONSTRAINT_ATTRIBUTES, CONSTRAINT_OPTIONS(sequelize));
  }
}
