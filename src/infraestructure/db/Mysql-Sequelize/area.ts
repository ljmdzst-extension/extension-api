import * as Sequelize from 'sequelize';
import { domain } from "../../../domain";

export default class MArea implements domain.IModelArea {
    constructor(  ){}
    buscarPorId(idArea: number): Promise<domain.Area | null> {
      throw new Error('Method not implemented.');
    }
  }