

import { Transaction } from "sequelize";
import Programa, { IPrograma } from "../classes/Programa";
import { DataGetProgramas } from "../types/programa";
import { request, response } from "express";
import transaction from "sequelize/types/transaction";


export const verListaProgramasConAreas = async( req : any, resp : typeof response) => {

    let salida : IPrograma[] = [];

    const { anio } = req.params;
    const { usuario } = req;


    const listaProgramas = await Programa.verTodosConAreas( Number(anio), usuario?.categoria.idCategoria  );

    if(listaProgramas.length) {
        salida = listaProgramas.map( prog => prog.verDatos());
    }

    return salida;

}
