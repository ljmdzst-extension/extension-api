import { Transaction } from "sequelize";
import { ObjetivoEspecifico } from "../models/ObjetivoEspecifico";




export const verActividadesPorObjetivo = async( objetivo : ObjetivoEspecifico, transaction ?: Transaction ) => {

    objetivo.actividadObjetivoEspecificos = await objetivo.getActividadObjetivoEspecificos({transaction});

}