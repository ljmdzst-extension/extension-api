
import * as Sequelize from 'sequelize'
import IDataBase from '../IDataBase';



export namespace MysqlSequelize {

    export class Db implements IDataBase {
        
        constructor( private sequelize : Sequelize.Sequelize ){ }

        public sincronizar(): Promise<any> {
            return this.sequelize.sync();
        }
        public async verificar(): Promise<boolean> {
            await this.sequelize.authenticate();
            return true;
        }

    }
}