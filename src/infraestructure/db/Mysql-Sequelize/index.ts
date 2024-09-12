import { Sequelize } from "sequelize";
import IDataBase from "../IDataBase";
import { MActividad } from "./actividad";
import MArea from "./area";
import { MPersona } from "./persona";
import { MPrograma } from "./programa";
import MUsuario from "./usuario";

const _MUsuario = MUsuario;
const _MActividad = MActividad;
const _MPersona = MPersona;
const _MPrograma = MPrograma;
const _MArea = MArea;


export namespace MysqlSequelize {

    export const MUsuario = _MUsuario;
    export const MActividad = _MActividad;
    export const MPersona = _MPersona;
    export const MPrograma = _MPrograma;
    export const MArea = _MArea;
    

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