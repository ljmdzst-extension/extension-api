import * as Sequelize from 'sequelize';
import { domain } from '../../../domain';
import { MPersona } from './persona';
import sequelizeExtension, { BD } from './config/dbConfig';
import { ColaDeTareas } from '../../helpers/tareas';
import MAreaProgramaUsuario from './area-programa-usuario';

export default class MUsuario implements domain.IModelUsuario { 
  
    constructor( ){}
    
    public static async verlistaIdsUsados ( db :Sequelize.Sequelize, transaction ?: Sequelize.Transaction ) : Promise<string[]> {
        return (await BD.Usuario.findAll({ attributes : ['idUsuario'], transaction})).map( usr => usr.idUsuario )
    }
    async buscarPorId(idUsuario: string): Promise<domain.Usuario | null> {
      let salida : domain.Usuario | null = null;
      const transaction = await sequelizeExtension.transaction({logging : process.env.NODE_ENV ? sql => console.log(sql) : undefined});
  
      try {
        const dbUsr = await BD.Usuario.findByPk(idUsuario,{transaction});
        if(!dbUsr) throw {status : 400 , message: 'no existe usuario con ese id'};
        
        const p = await new MPersona().buscarPorUsuario( dbUsr.nroDoc, transaction );
        if(!p) throw {status : 400 , message: 'no existe persona con ese nroDoc'};
    
        const c = await BD.CategoriaUsuario.verCategoria( dbUsr.idUsuario,transaction )
        if(!c) throw {status : 400 , message: 'no existe categoria asociada a ese usuario'};
        
        const cPermisos = await BD.PermisoUsuario.verPermisos(dbUsr.idUsuario,transaction);
    
        const cProgramasHabilitados = await MAreaProgramaUsuario.buscarPorUsuario( dbUsr.idUsuario, transaction )
        
        await transaction.commit();

        salida = new domain.Usuario(dbUsr.dataValues,p,c,cPermisos);
    
        cProgramasHabilitados.forEach( ph => salida?.altaProgramasHabilitados( ph ));
        
      } catch (error : any ) {
        await transaction.rollback();
        console.log( error.message);
      }
    
      return salida;
    }
    async buscarPor(parametros: Partial<domain.TDataUsuario>, offset?: number, limit?: number): Promise<domain.Usuario[]> {
      let salida : domain.Usuario[] = [];
      
      try {
        const cDbUsuarios = await BD.Usuario.findAll({ attributes : ['idUsuario'] ,where : { ...parametros } ,offset , limit });
      
        if(cDbUsuarios.length > 0) {
          const peticiones = new ColaDeTareas();

          cDbUsuarios.forEach( dbUsr => peticiones.push( 
              ()=> this.buscarPorId(dbUsr.idUsuario)
                      .then( resp => { if(resp) salida.push(resp)}) 
          ) );

          await peticiones.resolverConDelay(100);
        }
      } catch (error : any) {
        console.log(error.message);
      }
 
      return salida;
    }
    verLista(offset?: number, limit?: number): Promise<domain.Usuario[]> {
      throw new Error('Method not implemented.');
    }
    guardarDatos(usuario: domain.Usuario): Promise<domain.Usuario> {
      throw new Error('Method not implemented.');
    }
    darDeBaja(usuario: domain.Usuario): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
  
  }