import * as Sequelize from "sequelize";
import { BD } from "../config/dbConfig";


export type ICategoria = {idCategoria : number , nombre : string}


export default class Categoria {
    constructor(){}

    public static async verListaBD( transaction ?: Sequelize.Transaction) : Promise<ICategoria[]> {
        let salida : ICategoria[] = [];

        try {
            
            const cBDCategorias = await BD.Categoria.findAll({transaction});

            if(cBDCategorias.length > 0) {
                salida = cBDCategorias.map( cat => cat.dataValues);
            }

        } catch (error) {
            throw error;
        }

        return salida;
    }
}