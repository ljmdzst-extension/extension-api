import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional, Transaction } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import { BD } from '../config/dbConfig';
import { ESTADO_BD } from '../types/general';
import { ERROR } from '../logs/errores';

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

export type TEnlace = EnlaceAttributes

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
  
  private iActividad !: Actividad;

  public estadoEnBD !: number;

  public verDatos() : TEnlace 
  { 
      return this.dataValues;
  }

  public static crear( data : TEnlace, _iActividad : Actividad ) {
     const enlace = BD.Enlace.build(data);
     enlace.iActividad = _iActividad;
     return enlace;
  }

  public static async validar( data : TEnlace) : Promise<void> {
      await new BD.Enlace({...data,idActividad : 0}).validate({ skip : ['createdAt','updatedAt','deletedAt']})
  }
  public editarDatos( data : TEnlace){
      this.dataValues = data;
      this.estadoEnBD = ESTADO_BD.M;
  }
  public estaDeBaja() : boolean 
  { 
      return this.estadoEnBD === ESTADO_BD.B;
  }
  private async darDeAltaBD( registro : TEnlace & {idActividad :number}, transaction ?: Transaction)
  {
      
      this.idEnlace = (await BD.Enlace.create(registro, { transaction})).dataValues.idEnlace;
  }
  private async darDeBajaBD( transaction ?: Transaction)
  {
      await BD.Enlace.destroy({where : {idEnlace : this.idEnlace} , transaction });
  }
  private async modificarBD( registro : TEnlace & {idActividad :number},transaction ?: Transaction)
  {   
      if(!await BD.Enlace.findByPk(registro.idEnlace, { transaction})){
          console.log(`enlace ${this.idEnlace} posiblemente dado de baja, restaurando...`)
          await BD.Enlace.restore({where : {idEnlace : registro.idEnlace}, transaction});
      }
      await BD.Enlace.update(registro,{where : {idEnlace : registro.idEnlace}, transaction});
     
  }

  public async guardarEnBD(transaction ?: Transaction ) : Promise<void> {
      console.log('Enlace.guardarEnBD');

      if(!this.iActividad) throw { status : 500, msg : `La Enlace ${this.idEnlace} no tienne una actividad asociada`}
      const registro = { ...this, idActividad : this.iActividad.verID() }

      switch (this.estadoEnBD) {
          case ESTADO_BD.A:
              await this.darDeAltaBD(registro,transaction);
              break;
          case ESTADO_BD.M:
              await this.modificarBD(registro,transaction);
              break;
          case ESTADO_BD.B:
              await this.darDeBajaBD(transaction)
              break;
          default:
              break;
      }
  }
  public static async buscarPorIDBD(id: number, transaction?: Transaction | undefined): Promise<Enlace> { 
      const bdEnlace = await BD.Enlace.findByPk(id,{transaction});
      if(!bdEnlace ) throw ERROR.ENLACE_INEXISTENTE;
      return bdEnlace;
  } ;
  public static async buscarPorActBD(idAct: ActividadId, transaction?: Transaction | undefined): Promise<Array<Enlace>> {

      let salida : Enlace[] = [];

      const bdEnlaces = await BD.Enlace.findAll({where : {idActividad : idAct},transaction});

      if(bdEnlaces.length > 0) {

          bdEnlaces.forEach( bdEnlace => salida.push( bdEnlace ) )
      
      }

      return salida;

  }
  public static async modificarPorActBD( iActividad : Actividad ,listaEnlaces : Enlace[], transaction ?: Transaction ): Promise<void> {


      const listaBajaEnlaces = iActividad.verDatos().listaEnlaces?.filter( 
          TEnlace => listaEnlaces.every( nEnlace => nEnlace.idEnlace !== TEnlace.idEnlace  
      ) ) || [];
      
      if(listaBajaEnlaces.length){
          const idEnlaceOptions =  { 
              [Sequelize.Op.or] : listaBajaEnlaces.map( enlace => enlace.idEnlace)  
          } 
          const whereOptions =  { 
              idActividad : iActividad.verID(), 
              idEnlace : idEnlaceOptions
          } ;
          await BD.Enlace.destroy( {  where : whereOptions, transaction} )
      }

      await Promise.all( 
          listaEnlaces.map( async enlace => {
              const whereOptions = { idActividad : iActividad.verID(), idEnlace : enlace.idEnlace};
              const defaultOptions = {...enlace.verDatos(), idActividad : iActividad.verID()};
              const [TEnlace, creado ] = await BD.Enlace.findOrCreate( { where : whereOptions, defaults : defaultOptions, transaction } );
              if(!creado){
                  await TEnlace.update(enlace.verDatos(),{transaction : transaction});
              }
          })
       )


     

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
