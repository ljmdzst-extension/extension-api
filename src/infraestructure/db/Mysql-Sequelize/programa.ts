import * as Sequelize from 'sequelize';
import { domain } from '../../../domain';
import Programa from '../../../domain/classes/Programa';

export class MPrograma implements domain.IModelPrograma {
    constructor( ){}
  findByPk(pk: number): Promise<Programa | null> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Programa[]> {
    throw new Error('Method not implemented.');
  }
  findOne(params: any): Promise<Programa | null> {
    throw new Error('Method not implemented.');
  }
  findBy(params: any, offset?: number, limit?: number): Promise<Programa[]> {
    throw new Error('Method not implemented.');
  }
  save(i: Programa): Promise<Programa> {
    throw new Error('Method not implemented.');
  }
  destroy(i: Programa): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  update(i: Programa): Promise<Programa> {
    throw new Error('Method not implemented.');
  }
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