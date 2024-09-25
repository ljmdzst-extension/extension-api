import * as Sequelize from 'sequelize';
import { domain } from "../../../domain";
import Area from '../../../domain/classes/area';

export default class MArea implements domain.IModelArea {
    constructor(  ){}
  findByPk(pk: number): Promise<Area | null> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Area[]> {
    throw new Error('Method not implemented.');
  }
  findOne(params: any): Promise<Area | null> {
    throw new Error('Method not implemented.');
  }
  findBy(params: any, offset?: number, limit?: number): Promise<Area[]> {
    throw new Error('Method not implemented.');
  }
  save(i: Area): Promise<Area> {
    throw new Error('Method not implemented.');
  }
  destroy(i: Area): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  update(i: Area): Promise<Area> {
    throw new Error('Method not implemented.');
  }
    buscarPorId(idArea: number): Promise<domain.Area | null> {
      throw new Error('Method not implemented.');
    }
  }