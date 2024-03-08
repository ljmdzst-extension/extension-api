import { Transaction } from "sequelize";
import { INVALIDO } from "../logs/validaciones";
import { AreaPrograma } from "../models/AreaPrograma";


export const validarAnio = async(data : {idAnio : string}, transaction ?: Transaction,transactionInsituciones ?: Transaction)=>{
    if( Number(data.idAnio) < 2022 ) throw INVALIDO.ANIO_PROG;
    if(! await AreaPrograma.findOne({where : {anio : data.idAnio},transaction}) ){
        throw INVALIDO.ANIO_PROG;
    }
}
