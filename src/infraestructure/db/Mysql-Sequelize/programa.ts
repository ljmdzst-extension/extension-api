import * as Sequelize from 'sequelize';
import { domain } from '../../../domain';

export class MPrograma implements domain.IModelPrograma {
    constructor( ){}
    async buscarPor(parametros: Partial<domain.TDataPrograma>): Promise<domain.Programa[]> {
      throw new Error('Method not implemented.');
    }
    async verLista(anio: number): Promise<domain.Programa[]> {
      throw new Error('Method not implemented.');
    }
    async verListaConAreas(anio: number): Promise<domain.Programa[]> {
      throw new Error('Method not implemented.');
    }
  }