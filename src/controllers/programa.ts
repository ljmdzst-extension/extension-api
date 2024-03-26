

import { Transaction } from "sequelize";
import Programa, { IPrograma } from "../classes/Programa";
import { DataGetProgramas } from "../types/programa";

import cli from 'cli-color'
import { request, response } from "express";
import { HttpHelpers } from "../helpers/general";

export const verListaProgramasConAreas = async( req : any, resp : typeof response) => {
    try {
        let salida : IPrograma[] = [];

        const { anio } = req.params;
        const { categoria } = req.usuario;

        const listaProgramas = await Programa.verTodosConAreas( Number(anio), categoria.idCategoria  );

        if(listaProgramas.length) {
            salida = listaProgramas.map( prog => prog.verDatos());
        }

         HttpHelpers.responderPeticionOk(resp, salida);

        } catch (error : any) {
            if(!error.status) console.log(cli.red(error));
            
            HttpHelpers.responderPeticionError(resp, error.message,error.status );
        }

}
