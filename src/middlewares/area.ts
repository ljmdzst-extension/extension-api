import { Transaction } from "sequelize";
import { BD } from "../config/dbConfig";
import { INVALIDO } from "../logs/validaciones";


export const validarIdArea = async(data : {idArea : string}, transaction ?: Transaction,transactionInsituciones ?: Transaction)=>{
    if(! await BD.Area.findByPk(data.idArea,{transaction}) ){
        throw INVALIDO.ID_AREA_ACT;
    }
}