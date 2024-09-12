
import {domain} from '../../../domain'
import sequelizeExtension, { BD } from './config/dbConfig';
import MInstitucion from './institucion';
import MFechaPuntual from './fechaPuntual';
import MObjetivo from './objetivo';
import MProgramaSippe from './programaSIPPE';
import MUbicacion from './ubicacion';
import { ColaDeTareas } from '../../helpers/tareas';
import MUsuario from './usuario';

export class MActividad implements domain.IModelActividad { 
    constructor( ){}
    
    async buscarPorId(idActividad: number ): Promise<domain.Actividad | null> {
      let salida : domain.Actividad | null = null;
      const transaction = await sequelizeExtension.transaction({logging : process.env.NODE_ENV === 'development' ? sql => console.log(sql) : undefined});
      try {
          
          const dbAct = await BD.Actividad.findByPk(idActividad, { transaction } );
  
          if(dbAct) {

            const usr = await new MUsuario().buscarPorId(`${dbAct.idUsuario}`);

            if(!usr) throw new Error('no existe un usuario con ese idUsuario');

            const dbArea = await BD.Area.findByPk(dbAct.idArea,{transaction});

            if(!dbArea) throw new Error('no existe área con ese idArea');
            

            let data : domain.TDataActividad = {...dbAct.dataValues};
      
            salida = new domain.Actividad(data,new domain.Area(dbArea.dataValues),usr);
            
            await Promise.all(
              [
                BD.Meta.findAll( {where : { idActividad } , transaction } ).then( resp => data.listaMetas = resp.map( item => item.dataValues)),
                BD.Enlace.findAll( { where : { idActividad}, transaction }).then( resp => data.listaEnlaces =resp.map( item => item.dataValues)),
                MInstitucion.buscarPorActividad(salida,transaction).then( resp => data.listaInstituciones = resp),
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
    async buscarPor(parametros: domain.TDataActividad ): Promise<domain.Actividad[]> {
      let salida : domain.Actividad[] = [];
  
      try { 
        let cDbActividades = await BD.Actividad.findAll({ attributes : ['idActividad'], where : {...parametros}})
                                           .then( resp => resp.map( dbact => dbact.idActividad));  

        if(cDbActividades.length > 0) {

          const peticiones = new ColaDeTareas();

          cDbActividades.forEach( id => peticiones.push( 
              ()=>this.buscarPorId(id)
                      .then( resp => { if(resp) salida.push(resp)}) 
          ) );

          await peticiones.resolverConDelay(100);

        }


      } catch (error : any) {  console.log(error);   }
          
     
  
      return salida;
    }
    async verLista(offset ?: number, limit ?: number): Promise<domain.Actividad[]> {
      let salida : domain.Actividad[] = [];
 
      try { 
         let cDbActividades = await BD.Actividad.findAll({ attributes : ['idActividad'], offset , limit })
                                           .then( resp => resp.map( dbact => dbact.idActividad));  

        if(cDbActividades.length > 0) {

          const peticiones = new ColaDeTareas();

          cDbActividades.forEach( id => peticiones.push( 
              ()=>this.buscarPorId(id)
                      .then( resp => { if(resp) salida.push(resp)}) 
          ) );

          await peticiones.resolverConDelay(100);

        }


      } catch (error : any) { console.log(error);  }

      return salida;
    }
    async guardarDatos( actividad : domain.Actividad ): Promise<domain.Actividad> {
      const dbAct = BD.Actividad.build(actividad.verDatos());
      try {

        await dbAct.save();

      } catch (error : any) {

        throw error;
      }

      actividad.editar({idActividad : dbAct.dataValues.idActividad});

      return actividad;
    }
  
    async darDeBaja(idActividad: number ): Promise<boolean> {
      let salida = false;
      try {
        const cant = await BD.Actividad.destroy({where : { idActividad }});
  
        salida = cant > 0;
        
      } catch (error : any) {
        console.log(error);
      }
  
      return salida;
    }
  
    async buscarPorArea(idArea: number): Promise<domain.Actividad[]> {
      let salida : domain.Actividad[] = [];
      try { 
        let cDbActividades = await BD.Actividad.findAll({ attributes : ['idActividad'], where : { idArea } })
                                            .then( resp => resp.map( dbact => dbact.idActividad));  

        if(cDbActividades.length > 0) {

          const peticiones = new ColaDeTareas();

          cDbActividades.forEach( id => peticiones.push( 
              ()=>this.buscarPorId(id)
                      .then( resp => { if(resp) salida.push(resp)}) 
          ) );

          await peticiones.resolverSinDelay();

        }


      } catch (error : any) { console.log(error);  }

      return salida;
    }
  
    
  }