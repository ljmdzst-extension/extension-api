import { Sequelize } from "sequelize";
import IDataBase from "../IDataBase";
import sequelizeExtension from "./config/dbConfig";
import { Usuario } from "./models/Usuario";
import { Actividad } from "./models/Actividad";
import { Persona } from "./models/Persona";
import { Programa } from "./models/Programa";
import { Area } from "./models/Area";


export namespace MysqlSequelize {

    export const MUsuario = Usuario.initModel(sequelizeExtension);
    export const MActividad = Actividad.initModel(sequelizeExtension);
    export const MPersona = Persona.initModel(sequelizeExtension);
    export const MPrograma = Programa.initModel(sequelizeExtension);
    export const MArea = Area.initModel(sequelizeExtension);
    

    export class Db implements IDataBase {
        private sequelize !: Sequelize;

        constructor(){
            this.sequelize = new Sequelize({
                host : process.env.DB_HOST,
                username : process.env.DB_USER,
                password : process.env.DB_PASS,
                port : Number(process.env.DB_PORT),
                database : process.env.DB_NAME,
                dialect : 'mysql',
                logging : process.env.NODE_ENV === 'development' ? sql => console.log(sql) : undefined,
                timezone : '-03:00'
            });
        }

        public sincronizar(): Promise<any> {
            return this.sequelize.sync();
        }
        public async verificar(): Promise<boolean> {
            await this.sequelize.authenticate();
            return true;
        }

    }
}