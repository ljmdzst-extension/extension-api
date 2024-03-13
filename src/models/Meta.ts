import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Actividad, ActividadId } from './Actividad';
import { ESTADO_BD } from '../types/general';
import { BD } from '../config/dbConfig';
import Valoracion from '../classes/Valoracion';
import { ERROR } from '../logs/errores';

export interface MetaAttributes {
  idMeta: number;
  descripcion: string;
  resultado?: string;
  observaciones?: string;
  idValoracion?: number;
  idActividad: number;
}

export type MetaPk = "idMeta";
export type MetaId = Meta[MetaPk];
export type MetaOptionalAttributes = "idMeta" | "resultado" | "observaciones" | "idValoracion" ;
export type MetaCreationAttributes = Optional<MetaAttributes, MetaOptionalAttributes>;

export type TMeta = MetaAttributes

export class Meta extends Model<MetaAttributes, MetaCreationAttributes> implements MetaAttributes {
  idMeta!: number;
  descripcion!: string;
  resultado?: string;
  observaciones?: string;
  idValoracion?: number;
  idActividad!: number;

  private iActividad ?: Actividad;
  private valoracion ?: Valoracion;


  public estadoEnBD !: ESTADO_BD;

  public static crear(data : TMeta, _iActividad : Actividad, valoracion ?: Valoracion) {
    const meta = BD.Meta.build(data);
    meta.iActividad = _iActividad;
    meta.valoracion = valoracion;
    return meta;
  }
  

  public estaDeBaja() : boolean { 
      return this.estadoEnBD === ESTADO_BD.B;
  }

  public verDatos(): TMeta
  {
      return this.dataValues;
  }

  public valorar( valoracion : Valoracion ){
    this.valoracion = valoracion;
  }

  public editarDatos( data : TMeta ){
      this.dataValues = data;
     
      this.estadoEnBD = ESTADO_BD.M;
  }

  public static async validar( data : TMeta) : Promise<void> {
      await new BD.Meta({...data,idActividad : 0}).validate({ skip : ['createdAt','updatedAt','deletedAt']})
  }
  /** Conexion BD */
  private async darDeAltaBD( registro : TMeta & {idActividad : number} , transaction ?: Sequelize.Transaction)
   {

      this.idMeta = (await BD.Meta.create({...registro, idValoracion : registro.idValoracion}, { transaction})).dataValues.idMeta;
   }
   private async  darDeBajaBD(transaction ?: Sequelize.Transaction)
   {
      await BD.Meta.destroy({where : {idMeta : this.idMeta} , transaction });
   }
   private async  modificarBD(registro : TMeta & {idActividad : number}, transaction ?: Sequelize.Transaction){
      
      if(!await BD.Meta.findByPk(registro.idMeta,{transaction})){
          console.log(`meta ${this.idMeta} posiblemente dada de baja, restaurando...`)
          await BD.Meta.restore({ where : {idMeta : registro.idMeta}, transaction });
      }
      await BD.Meta.update({...registro , idValoracion : registro.idValoracion},{where : {idMeta : registro.idMeta}, transaction});
      
   }
   public async guardarEnBD(transaction ?: Sequelize.Transaction ) : Promise<void> {
       console.log('Meta.guardarEnBD');

       if(!this.iActividad) throw { status : 500, msg : `La Meta ${this.idMeta} no tiene una actividad asociada`}
      
       const registro = { ...this.verDatos(), idActividad : this.iActividad.verID() }
       
       switch (this.estadoEnBD) {
           case ESTADO_BD.A:
               await this.darDeAltaBD(registro,transaction);
               break;
           case ESTADO_BD.M:
               await this.modificarBD(registro,transaction);
               break;
           case ESTADO_BD.B:
               await this.darDeBajaBD(transaction);
               break;
           default:
               break;
       }
   }
   public static async buscarPorIDBD(id: number, transaction?: Sequelize.Transaction | undefined): Promise<Meta> { 
      const bdMeta = await BD.Meta.findByPk(id,{transaction});
      const bdAct = await BD.Actividad.findByPk(bdMeta?.idActividad);
      if(!bdMeta ) throw ERROR.META_INEXISTENTE;
      if(!bdAct) throw ERROR.ACTIVIDAD_INEXISTENTE;
      return BD.Meta.crear(bdMeta.dataValues,bdAct);
  } ;
   public static async buscarPorActBD(iAct: Actividad, transaction?: Sequelize.Transaction | undefined): Promise<Array<Meta>> {

      let salida : Meta[] = [];

      const bdMetas = await BD.Meta.findAll({where : {idActividad : iAct.verID()},transaction});

      if(bdMetas.length > 0) {

          bdMetas.forEach(async bdMeta => salida.push( BD.Meta.crear({...bdMeta.dataValues},iAct )) ) 
      }

      return salida;

  }


  static initModel(sequelize: Sequelize.Sequelize): typeof Meta {
    return Meta.init({
    idMeta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    resultado: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    observaciones: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    idValoracion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Valoracion',
        key: 'idValoracion'
      }
    },
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Actividad',
        key: 'idActividad'
      }
    }
  }, {
    sequelize,
    tableName: 'Meta',
    timestamps: true,
    paranoid: true
  });
  }
}
