

import { Transaction } from "sequelize";
import Programa, { IPrograma } from "../classes/Programa";
import { DataGetProgramas } from "../types/programa";

export class ControllerPrograma {
    static verListaAreas(verListaAreas: any): import("express-serve-static-core").RequestHandlerParams<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
        throw new Error("Method not implemented.");
    }

    public static async verListaProgramasConAreas ( data : DataGetProgramas, transaction : Transaction ) : Promise<IPrograma[]> {

        let salida : IPrograma[] = [];


        const listaProgramas = await Programa.verTodosConAreas( data.anio, data.usuario?.categoria.idCategoria  ,transaction );

        if(listaProgramas.length) {
            salida = listaProgramas.map( prog => prog.verDatos());
        }

        return salida;
    }
    
    
    
}