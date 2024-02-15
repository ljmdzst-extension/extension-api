import { Transaction } from "sequelize";
import { INVALIDO } from "../logs/validaciones";
import Programa from "../classes/Programa";


export const validarAnio = async(data : {idAnio : string}, transaction ?: Transaction,transactionInsituciones ?: Transaction)=>{
    if( Number(data.idAnio) < 2022 ) throw INVALIDO.ANIO_PROG;
    if(! await Programa.validarAnio(Number(data.idAnio),transaction) ){
        throw INVALIDO.ANIO_PROG;
    }
}