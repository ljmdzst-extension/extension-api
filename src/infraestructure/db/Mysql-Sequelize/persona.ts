import * as Sequelize from 'sequelize';
import { domain } from "../../../domain";
import { BD } from './config/dbConfig';

export class MPersona implements domain.IModelPersona {
    constructor(  ){}
  
    async buscarPorUsuario( nroDoc : string, transaction ?: Sequelize.Transaction ) : Promise<domain.Persona | null>{
      const dataP = await BD.Persona.findByPk( nroDoc ,{transaction} );
      if(dataP) {
        return new domain.Persona(dataP);
      }
      return null;
    }
  
    async buscarPorNroDoc(nroDoc: string): Promise<domain.Persona | null> {
      let salida: domain.Persona | null = null;
      const dataP = await BD.Persona.findByPk( nroDoc  );
      if(dataP) {
        salida = new domain.Persona(dataP);
      }
      return salida;
    }
  
    buscarPor(parametros: domain.TDataPersona): Promise<domain.Persona | null> {
      throw new Error('Method not implemented.');
    }
    verLista(offset?: number, limit?: number): Promise<domain.Persona[]> {
      throw new Error('Method not implemented.');
    }
    guardarDatos(persona: domain.Persona): Promise<domain.Persona> {
      throw new Error('Method not implemented.');
    }
    darDeBAja(nroDoc: string): Promise<domain.Persona> {
      throw new Error('Method not implemented.');
    }
  }