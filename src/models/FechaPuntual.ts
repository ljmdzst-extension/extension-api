import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import type { FechaPuntualActividad, FechaPuntualActividadId } from './FechaPuntualActividad';
import { BD } from '../config/dbConfig';
import { ESTADO_BD } from '../types/general';
import { INVALIDO } from '../logs/validaciones';
import { ERROR } from '../logs/errores';

export interface FechaPuntualAttributes {
  idFecha: number;
  fecha: string;
}

export type FechaPuntualPk = "idFecha";
export type FechaPuntualId = FechaPuntual[FechaPuntualPk];
export type FechaPuntualOptionalAttributes = "idFecha";
export type FechaPuntualCreationAttributes = Optional<FechaPuntualAttributes, FechaPuntualOptionalAttributes>;
export type TFecha = {
  idFecha : FechaPuntualId,
  fecha : string
}
export class FechaPuntual extends Model<FechaPuntualAttributes, FechaPuntualCreationAttributes> implements FechaPuntualAttributes {
  idFecha!: number;
  fecha!: string;

  private iActividad ?: Actividad

  public estadoEnBD !: number;

  public static crear( data : TFecha , _iActividad : Actividad ) {
    const fecha = BD.FechaPuntual.build(data);

    fecha.iActividad = _iActividad;

    return fecha;
  }


  public estaEnRango(desde : Date, hasta : Date) : boolean {
      const msDesde = Date.parse(desde.toString());
      const msHasta = Date.parse(hasta.toString());
      const msFecha = Date.parse(this.fecha.toString());
      return  msDesde <= msFecha && msFecha <= msHasta;
  }
  
  public verDatos (): TFecha 
  {
      return this.dataValues;
  }
  public static validar( data : TFecha, desde : Date, hasta : Date ){
      const fecha = new FechaPuntual(data);
      if(! fecha.estaEnRango(desde,hasta) ) throw INVALIDO.RANGO_FECHA_PUNTUAL ;
  }

  /** Conexion BD */
  public darDeAltaBD()
   {
       this.estadoEnBD = ESTADO_BD.A;
   }
   public darDeBajaBD()
   {
      this.estadoEnBD = ESTADO_BD.B;
   }
   public estaDeBaja() : boolean { 
      return this.estadoEnBD === ESTADO_BD.B;
  }

  
  public async guardarEnBD(transaction ?: Sequelize.Transaction ) : Promise<void> {
      console.log('FechaPuntual.guardarEnBD');
     
      if(!this.iActividad) throw { status : 500, msg : `La FechaPuntual ${this.idFecha} no tienne una actividad asociada`}
      
      switch (this.estadoEnBD) {
          case ESTADO_BD.A:
              await this.darDeAlta(transaction);
              break;
          case ESTADO_BD.B:
              await BD.FechaPuntualActividad.destroy({where : {idFecha : this.idFecha, idActividad : this.iActividad.verID()} , transaction });
              break;
          default:
              break;
      }
  }

  private async darDeAlta( transaction ?:  Sequelize.Transaction) {
      if(!this.iActividad) throw { status : 500, msg : `La FechaPuntual ${this.idFecha} no tienne una actividad asociada`}

      const fechaCargada = await BD.FechaPuntual.findOne({ where : {fecha : this.fecha} ,transaction});
      if(!fechaCargada) {
          this.idFecha = (await BD.FechaPuntual.create(this, { transaction})).dataValues.idFecha;
      } else {
          this.idFecha = fechaCargada.idFecha;
      }


      const registroRelacion = {idFecha : this.idFecha, idActividad : this.iActividad.verID() }
      if(await BD.FechaPuntualActividad.findOne({where : registroRelacion, paranoid : false,transaction})){
          await BD.FechaPuntualActividad.restore({where : registroRelacion, transaction });
      }else {
          await BD.FechaPuntualActividad.create(registroRelacion,{ transaction });
      }
      
  }
  public static async buscarPorIDBD(id: number, transaction?:  Sequelize.Transaction | undefined): Promise<FechaPuntual> { 
      const bdFechaPuntual = await BD.FechaPuntual.findByPk(id,{transaction});
      if(!bdFechaPuntual ) throw ERROR.FECHA_PUNTUAL_INEXISTENTE;
      return new FechaPuntual(bdFechaPuntual.dataValues);
  } ;
  public static async buscarPorActBD(iAct: Actividad, transaction?:  Sequelize.Transaction | undefined): Promise<Array<FechaPuntual>> {

      let salida : FechaPuntual[] = [];

      const bdFechasPuntualesActividad = await BD.FechaPuntualActividad.findAll({where : {idActividad : iAct.verID()},transaction});

      if(bdFechasPuntualesActividad.length > 0) {

         await Promise.all(
          bdFechasPuntualesActividad.map( async bdFechaPuntualActividad => {
              const bdFechaPuntual = await BD.FechaPuntual.findByPk(bdFechaPuntualActividad.idFecha,{transaction});
              if(bdFechaPuntual){
                  salida.push( new FechaPuntual(bdFechaPuntual.dataValues,iAct) )
              } else 
                  console.log(`fecha puntual ${bdFechaPuntualActividad.idFecha} no existe en bd`);
          } )
         )
      
      }

      return salida;

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
