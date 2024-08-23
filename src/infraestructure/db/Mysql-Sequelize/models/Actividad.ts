import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import {domain} from '../../../../domain'
import { Meta } from './Meta';
import { Enlace } from './Enlace';
import { ObjetivoActividad } from './ObjetivoActividad';
import { ProgramaSippeActividad } from './ProgramaSippeActividad';
import { InstitucionActividad } from './InstitucionActividad';
import { UbicacionActividad } from './UbicacionActividad';
import { FechaPuntualActividad } from './FechaPuntualActividad';

export interface ActividadAttributes {
  idActividad: number;
  idArea: number;
  idUsuario?: string;
  nro?: number;
  desc: string;
  motivoCancel?: string | null;
  fechaDesde?: string;
  fechaHasta?: string;
  createdAt ?: string;
}

export type ActividadPk = "idActividad";
export type ActividadId = Actividad[ActividadPk];
export type ActividadOptionalAttributes = "idActividad" | "idUsuario" | "nro" | "motivoCancel" | "fechaDesde" | "fechaHasta" ;
export type ActividadCreationAttributes = Optional<ActividadAttributes, ActividadOptionalAttributes>;


const ATRIBUTOS_TABLA_ACTIVIDAD_CONFIG = {
  idActividad: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  idArea: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Area',
      key: 'idArea'
    }
  },
  idUsuario: {
    type: DataTypes.STRING(255),
    allowNull: true,
    references: {
      model: 'Usuario',
      key: 'idUsuario'
    }
  },
  nro: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  desc: {
    type: DataTypes.STRING(2000),
    allowNull: false
  },
  motivoCancel: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  fechaDesde: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  fechaHasta: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  createdAt : {
    type : DataTypes.DATEONLY,
    allowNull : false
  }
}

export class Actividad extends Model<ActividadAttributes, ActividadCreationAttributes> implements ActividadAttributes {

  idActividad!: number;
  idArea!: number;
  idUsuario?: string;
  nro?: number;
  desc!: string;
  motivoCancel?: string | null;
  fechaDesde?: string;
  fechaHasta?: string;
  createdAt?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Actividad {
    return Actividad.init(ATRIBUTOS_TABLA_ACTIVIDAD_CONFIG, {
    sequelize,
    tableName: 'Actividad',
    timestamps: true,
    paranoid: true
  });
  }
}

export class Mactividad implements domain.IModelActividad { 
  constructor( private sequelize : Sequelize.Sequelize ){}
  
  async buscarPorId(idActividad: number ): Promise<domain.Actividad | null> {
    let salida : domain.Actividad | null = null;
    const transaction = await this.sequelize.transaction({logging : process.env.NODE_ENV === 'development' ? sql => console.log(sql) : undefined});
    try {
        
        const dbAct = await Actividad.initModel(this.sequelize).findByPk(idActividad );

        if(dbAct) {
    
          let data : domain.TDataActividad = {...dbAct.dataValues};
    
          salida = new domain.Actividad(data);
    
          data.listaMetas = await Meta.initModel(this.sequelize).buscarPorActividad( salida,transaction );
          data.listaEnlaces = await Enlace.initModel(this.sequelize).buscarPorActividad(salida,transaction);
          data.listaInstituciones = await InstitucionActividad.initModel(this.sequelize).buscarPorActividad(salida,transaction);
          data.listaFechaPuntuales = await FechaPuntualActividad.initModel(this.sequelize).buscarPorActividad(salida,transaction);
          data.listaObjetivos = await ObjetivoActividad.initModel(this.sequelize).buscarPorActividad(salida,transaction);
          data.listaProgramaSIPPPEs = await ProgramaSippeActividad.initModel(this.sequelize).buscarPorActividad(salida,transaction);
          data.listaUbicaciones = await UbicacionActividad.initModel(this.sequelize).buscarPorActividad(salida,transaction);
          
          await transaction.commit();

          salida.editar(data);
        
        }
      } catch (error : any ) {

        await transaction.rollback();

        if(error instanceof Sequelize.Error) {
          console.log(`${error.name} : ${error.message}`);
          console.log(error.stack);
        }
      }
    return salida;
  }
  async buscarPor(parametros: domain.TDataActividad ): Promise<domain.Actividad[]> {
    let salida : domain.Actividad[] = [];
    let cDbActividades : Actividad[] = [];
    try { 
      cDbActividades = await Actividad.initModel(this.sequelize).findAll({where : {...parametros}});  
    } catch (error : any) {
      console.log(error);
    }
        
    if(cDbActividades.length > 0) {
      salida = cDbActividades.map( dbAct => new domain.Actividad(dbAct.dataValues));
    }

    return salida;
  }
  async verLista(offset ?: number, limit ?: number): Promise<domain.Actividad[]> {
    let salida : domain.Actividad[] = [];
    let cDbActividades : Actividad[] = [];
    try { 
      cDbActividades = await Actividad.initModel(this.sequelize).findAll({offset, limit});  
    } catch (error : any) {
      console.log(error);
    }
        
    if(cDbActividades.length > 0) {
      salida = cDbActividades.map( dbAct => new domain.Actividad(dbAct.dataValues));
    }

    return salida;
  }
  async guardarDatos( actividad : domain.Actividad ): Promise<domain.Actividad> {
    const dbAct = Actividad.initModel(this.sequelize).build(actividad.verDatos());
    try {
      await dbAct.save();
    } catch (error) {
      console.log(error);
    }
    actividad.editar({idActividad : dbAct.dataValues.idActividad});
    return actividad;
  }

  async darDeBaja(idActividad: number ): Promise<boolean> {
    let salida = false;
    try {
      const cant = await Actividad.initModel(this.sequelize).destroy({where : { idActividad }});

      salida = cant > 0;
      
    } catch (error : any) {
      console.log(error);
    }

    return salida;
  }

  async buscarPorArea(idArea: number): Promise<domain.Actividad[]> {
    let salida : domain.Actividad[] = [];
    let cDbActividades : Actividad[] = [];
    try { 
      cDbActividades = await Actividad.initModel(this.sequelize).findAll({where : {idArea }});  
    } catch (error : any) {
      console.log(error);
    }
        
    if(cDbActividades.length > 0) {
      salida = cDbActividades.map( dbAct => new domain.Actividad(dbAct.dataValues));
    }
    return salida;
  }

  
}
