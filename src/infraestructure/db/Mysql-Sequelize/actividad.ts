import * as Sequelize from 'sequelize';
import {domain} from '../../../domain'
import { ColaDeTareas } from '../../helpers/tareas';
import { Actividad, ActividadCreationAttributes } from './models/Actividad';
import MInstitucion from './institucion';
import MFechaPuntual from './fechaPuntual';
import MObjetivo from './objetivo';
import MProgramaSippe from './programaSIPPE';
import MUbicacion from './ubicacion';
import MUsuario from './usuario';
import { Area } from './models/Area';
import { Meta } from './models/Meta';
import { Enlace } from './models/Enlace';

export class MActividad implements domain.IModelActividad { 
  
  constructor(  
    private sequelize : Sequelize.Sequelize,
    private transaction ?: Sequelize.Transaction
   ){}
  
  
  async findByPk(pk: number): Promise<domain.Actividad | null> {
    let salida : domain.Actividad | null = null;
    const transaction = await this.sequelize.transaction({logging : process.env.NODE_ENV === 'development' ? sql => console.log(sql) : undefined});
    try {
        
        const dbAct = await Actividad.findByPk(pk, { transaction } );

        if(dbAct) {

          const usr = await new MUsuario().buscarPorId(`${dbAct.idUsuario}`);

          if(!usr) throw new Error('no existe un usuario con ese idUsuario');

          const dbArea = await Area.initModel(this.sequelize).findByPk(dbAct.idArea,{transaction});

          if(!dbArea) throw new Error('no existe área con ese idArea');
          

          let data : domain.TDataActividad = {...dbAct.dataValues};
    
          salida = new domain.Actividad(data,new domain.Area(dbArea.dataValues),usr);
          
          await Promise.all(
            [
              Meta.initModel(this.sequelize).findAll( {where : { idActividad : pk } , transaction } ).then( resp => data.listaMetas = resp.map( item => item.dataValues)),
              Enlace.initModel(this.sequelize).findAll( { where : { idActividad : pk}, transaction }).then( resp => data.listaEnlaces =resp.map( item => item.dataValues)),
              new MInstitucion(this.sequelize,transaction).buscarPorActividad(salida).then( resp => data.listaInstituciones = resp),
              MFechaPuntual.buscarPorActividad(salida,transaction).then( resp => data.listaFechaPuntuales = resp),
              MObjetivo.buscarPorActividad(salida,transaction).then( resp => data.listaObjetivos = resp),
              MProgramaSippe.buscarPorActividad(salida,transaction).then( resp => data.listaProgramaSIPPPEs = resp),
              MUbicacion.buscarPorActividad(salida,transaction).then( resp => data.listaUbicaciones = resp),
            ]
          )
          
          await transaction.commit();

          salida.editar(data);
        }
      } catch (error : any ) {

        await transaction.rollback();

        throw error;
      }
      
      return salida;
  }
  async findAll(): Promise<domain.Actividad[]> {
    let salida : domain.Actividad[] = [];
 
    try { 
       let cDbActividades = await Actividad.initModel(this.sequelize).findAll({ attributes : ['idActividad']})
                                         .then( resp => resp.map( dbact => dbact.idActividad));  

      if(cDbActividades.length > 0) {

        const peticiones = new ColaDeTareas();

        cDbActividades.forEach( id => peticiones.push( 
            ()=>this.findByPk(id)
                    .then( resp => { if(resp) salida.push(resp)}) 
        ) );

        await peticiones.resolverConDelay(100);

      }


    } catch (error : any) { console.log(error);  }

    return salida;
  }
  async findOne(params: any): Promise<domain.Actividad | null> {
    let salida : domain.Actividad | null= null;

    const dbAct = await Actividad.initModel(this.sequelize)
        .findOne({where : { ...params},transaction : this.transaction});
        
    if(dbAct) {
      salida = await this.findByPk(dbAct.idActividad);
    }

    return salida;
  }
  async findBy(params: ActividadCreationAttributes, offset?: number, limit?: number): Promise<domain.Actividad[]> {
    let salida : domain.Actividad[] = [];
  
      try { 
        let cDbActividades = await Actividad.initModel(this.sequelize)
        .findAll({
          attributes : ['idActividad'],
          where : { 
            [Sequelize.Op.or] : {
              idActividad : params.idActividad, 
              idArea : params.idArea, 
              idUsuario : { [Sequelize.Op.like] : `${params.idUsuario }%` }, 
              nro : params.nro, 
              desc : { [Sequelize.Op.like] : `${params.desc }%` }, 
              motivoCancel : { [Sequelize.Op.like] : `${params.motivoCancel }%` }
            }
           
          },
          offset ,
          limit ,
          transaction : this.transaction
        });
       

        if(cDbActividades.length > 0) {

          const peticiones = new ColaDeTareas();

          cDbActividades.forEach( act => peticiones.push( 
              ()=>this.findByPk(act.idActividad)
                      .then( resp => { if(resp) salida.push(resp)}) 
          ) );

          await peticiones.resolverConDelay(100);

        }


      } catch (error : any) {  console.log(error);   }
          
     
  
      return salida;
  }
  async save(i: domain.Actividad): Promise<domain.Actividad> {
      const dbActividad = Actividad.initModel(this.sequelize).build(i.verDatos());
      dbActividad.isNewRecord = i.verDatos().idActividad > 0;
       await dbActividad.save({transaction : this.transaction})
        .then( resp => {
            i.editar(resp);
        });
       return i;
  }
  async destroy(i: domain.Actividad): Promise<boolean> {
    const resp = await Actividad.initModel(this.sequelize).destroy({where : { idActividad : i.verDatos().idActividad}, transaction : this.transaction});

    return resp > 0;
  }
  async update(i: domain.Actividad): Promise<domain.Actividad> {
    const dbActividad = Actividad.initModel(this.sequelize).build(i.verDatos());
    dbActividad.isNewRecord = i.verDatos().idActividad > 0;
     await dbActividad.save({transaction : this.transaction})
      .then( resp => {
          i.editar(resp);
      });
     return i;
  }
    

  async buscarPorArea(idArea: number): Promise<domain.Actividad[]> {
      let salida : domain.Actividad[] = [];
      try { 
        let cDbActividades = await Actividad.findAll({ attributes : ['idActividad'], where : { idArea } })
                                            .then( resp => resp.map( dbact => dbact.idActividad));  

        if(cDbActividades.length > 0) {

          const peticiones = new ColaDeTareas();

          cDbActividades.forEach( id => peticiones.push( 
              ()=>this.findByPk(id)
                      .then( resp => { if(resp) salida.push(resp)}) 
          ) );

          await peticiones.resolverSinDelay();

        }


      } catch (error : any) { console.log(error);  }

      return salida;
    }
  
    
  }