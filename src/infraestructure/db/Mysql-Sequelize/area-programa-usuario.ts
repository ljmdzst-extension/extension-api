import * as Sequelize from 'sequelize';

import { domain } from '../../../domain';
import { BD } from './config/dbConfig';
import MAreaPrograma from './area-programa';


export default class MAreaProgramaUsuario { 
   constructor(){}
   static async buscarPorUsuario( idUsuario : string , transaction ?: Sequelize.Transaction ) : Promise< domain.PeriodoDeTrabajo[] > {
        let salida : domain.PeriodoDeTrabajo[] = [];
    
        const cDbAreaProgramaUsuario =  await BD.AreaProgramaUsuario.findAll({where : {idUsuario }, transaction});
    
        const cAreas = await MAreaPrograma.buscarAreas( [...new Set(cDbAreaProgramaUsuario.map( (({idArea})=>idArea) )).values()], transaction );
    
        const cProgramas = await MAreaPrograma.buscarProgramas( [...new Set(cDbAreaProgramaUsuario.map( (({idPrograma})=>idPrograma) )).values()], transaction );
        
        cDbAreaProgramaUsuario.forEach( dbapu => {
            if( ! salida.find( ph => ph.verDatos().anio === dbapu.anio ) ){
               salida.push( new domain.PeriodoDeTrabajo( dbapu.anio, [] ) );
            }
        });
    
        cDbAreaProgramaUsuario.forEach( dbapu => {
           const progHabilitados = salida.find( ph => ph.verDatos().anio === dbapu.anio);
           const nuevoProg = cProgramas.find( p => p.idPrograma === dbapu.idPrograma );
           if(progHabilitados && nuevoProg ) {
    
              progHabilitados.altaPrograma( new domain.Programa({...nuevoProg.dataValues,listaAreas : []},[]) );
           }
        })
    
        cDbAreaProgramaUsuario.forEach( dbapu => {
          const progHabilitados = salida.find( ph => ph.verDatos().anio === dbapu.anio);
          const nuevaArea = cAreas.find( p => p.idArea === dbapu.idArea );
          if(progHabilitados && nuevaArea){
            progHabilitados.altaAreaHabilitada( dbapu.idPrograma, new domain.Area(nuevaArea.dataValues) );
    
          }
        })
    
        return salida;
      }
    
      static async verLista(  transaction ?: Sequelize.Transaction ) : Promise< domain.PeriodoDeTrabajo[] > {
        let salida : domain.PeriodoDeTrabajo[] = [];
    
        const cDbAreaProgramaUsuario =  await BD.AreaProgramaUsuario.findAll({transaction});
        const cAreas = await MAreaPrograma.buscarAreas( [...new Set(cDbAreaProgramaUsuario.map( (({idArea})=>idArea) )).values()], transaction );
    
        const cProgramas = await MAreaPrograma.buscarProgramas( [...new Set(cDbAreaProgramaUsuario.map( (({idPrograma})=>idPrograma) )).values()], transaction );
        
        cDbAreaProgramaUsuario.forEach( dbapu => {
            if( ! salida.find( ph => ph.verDatos().anio === dbapu.anio ) ){
               salida.push( new domain.PeriodoDeTrabajo( dbapu.anio, [] ) );
            }
        });
    
        cDbAreaProgramaUsuario.forEach( dbapu => {
           const progHabilitados = salida.find( ph => ph.verDatos().anio === dbapu.anio);
           const nuevoProg = cProgramas.find( p => p.idPrograma === dbapu.idPrograma );
           if(progHabilitados && nuevoProg ) {
    
              progHabilitados.altaPrograma( new domain.Programa({...nuevoProg.dataValues,listaAreas : []},[]) );
           }
        })
    
        cDbAreaProgramaUsuario.forEach( dbapu => {
          const progHabilitados = salida.find( ph => ph.verDatos().anio === dbapu.anio);
          const nuevaArea = cAreas.find( p => p.idArea === dbapu.idArea );
          if(progHabilitados && nuevaArea){
            progHabilitados.altaAreaHabilitada( dbapu.idPrograma, new domain.Area(nuevaArea.dataValues) );
    
          }
        })
    
        return salida;
      }
    
}