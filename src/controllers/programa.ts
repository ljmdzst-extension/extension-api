


import Programa, { IPrograma } from "../classes/Programa";


import cli from 'cli-color'
import {  response } from "express";
import { HttpHelpers } from "../helpers/general";

export const verListaProgramasConAreas = async( req : any, resp : typeof response) => {
    try {
        let salida : IPrograma[] = [];

        const { anio } = req.params;
        const { categorias,usuario } = req.usuario;

        const listaProgramas = await Programa.verTodosConAreas( Number(anio), usuario.idUsuario ,categorias[0].idCategoria  );

        if(listaProgramas.length) {
            salida = listaProgramas.map( prog => prog.verDatos());
        }

         HttpHelpers.responderPeticionOk(resp, salida);

        } catch (error : any) {
            if(!error.status) console.log(cli.red(error));
            
            HttpHelpers.responderPeticionError(resp, error.message,error.status );
        }

}
