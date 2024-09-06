import * as Sequelize from "sequelize";
import { BD } from "../config/dbConfig";

export type IPermiso = {idPermiso : number , nombre : string}

export default class Permiso {

    constructor(){}


    public static async verListaBD( transaction ?: Sequelize.Transaction) : Promise<IPermiso[]> {
        let salida : IPermiso[] = [];

        
        try {
            
            const cBDPermisos = await BD.Permiso.findAll({transaction});

            if(cBDPermisos.length > 0) {
                salida = cBDPermisos.map( p => p.dataValues);
            }

        } catch (error) {
            throw error;
        }


        return salida;
    }

}