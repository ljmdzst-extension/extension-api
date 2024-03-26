import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId, TItemActividad } from './Actividad';
import type { Programa, ProgramaId } from './Programa';
import { BD } from '../config/dbConfig';
import { ERROR } from '../logs/errores';

export interface AreaAttributes {
  idArea: number;
  nom: string;
}

export type AreaPk = "idArea";
export type AreaId = Area[AreaPk];
export type AreaOptionalAttributes = "idArea";
export type AreaCreationAttributes = Optional<AreaAttributes, AreaOptionalAttributes>;

type TArea = {
  idArea : AreaId,
  nom : string,
  listaActividades ?: Array<TItemActividad>
}

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

export class Area extends Model<AreaAttributes, AreaCreationAttributes> implements AreaAttributes {
  idArea!: number;
  nom!: string;

  // private listaActividades !: Array<Actividad>;

  // public verActividaesPorEjeTrans()
  // {

  // }
  // public verActividadesPorObjEst( )
  // {

  // }
  // public verIndiceRelacionConAreasInternas()
  // {

  // }
  // public verActividadesPorLie()
  // {

  // }
  // public verDatos() : TArea 
  // {
  //     let salida : TArea = {
  //         ...this.dataValues,
         
  //     };

  //     // if(this.listaActividades?.length) {
  //     //     salida = {...salida ,  listaActividades : this.listaActividades?.map(iAct => iAct.verDatos())}
  //     // }

  //     return salida; 
  // }

  // public verID() : AreaId {
  //     return this.idArea;
  // }

  // /**Conexion BD */

  // public static async buscarPorID(idArea : AreaId):Promise<Area>{
  //     let salida : Area = new Area({idArea:0,nom:''});

  //     const bdArea = await BD.Area.findByPk(idArea);

  //     if(!bdArea) throw ERROR.AREA_INEXISTENTE;

  //     salida = new Area(bdArea.dataValues);

  //     return salida;
  // }

  // public static async buscarPorListaID(ids : AreaId[]):Promise<Area[]>{
  //     let salida : Area[] = [];

  //     const bdAreas = await BD.Area.findAll({ where : { idArea : ids }});

  //     if(bdAreas.length) {

  //         salida = bdAreas.map( item => new Area(item.dataValues));
  //     }


  //     return salida;
  // }
  
  // // public static async buscarPorIDConAct (idArea : AreaId): Promise<TItemActividad[]>{
  // //     let salida : TItemActividad[] = [];

  // //     const bdActividades = await BD.Actividad.buscarPorAreaID(idArea);

  // //     if(bdActividades.length){
  // //        salida = bdActividades;
  // //     }

  // //     return salida;
  // // }


  static initModel(sequelize: Sequelize.Sequelize): typeof Area {
    return Area.init(AREA_ATTRIBUTES, {
    sequelize,
    tableName: 'Area',
    timestamps: false
  });
  }
}
