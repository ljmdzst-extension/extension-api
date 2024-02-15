import Actividad, { IActividad } from "../classes/Actividad";
import { INVALIDO } from "../logs/validaciones";
import { BD } from "../config/dbConfig";
import { Transaction } from 'sequelize';
import { ERROR } from "../logs/errores";
import { NextFunction, request, response } from "express";
import {validationResult} from 'express-validator'
export const validarCamposActividad = async(data : IActividad, transaction ?: Transaction, transactionInsituciones ?: Transaction)=> {
 
    console.log('validando campos actividad ..')
    await Actividad.validar(data,transaction);
}

export const validarActividadExistente = async(data : IActividad, transaction ?: Transaction,transactionInsituciones ?: Transaction)=>{
    if(!await BD.Actividad.findByPk(Number(data.idActividad),{attributes : ['idActividad'], transaction})){
        throw ERROR.ACTIVIDAD_INEXISTENTE;
    }
}

export const validarParametros = async( data : {idActividad : string}, transaction ?: Transaction, transactionInsituciones ?: Transaction) => {
 
    if((!Number(data.idActividad)) || (Number(data.idActividad) < 1)) throw INVALIDO.ID_ACT;
   
}

export const validarMotivoSuspension = async( data : IActividad,  transaction ?: Transaction, transactionInsituciones ?: Transaction )=>{

    console.log('validando motivo cancel');

    if( ! data.motivoCancel) throw INVALIDO.MOT_CANCEL_ACT;

    if( data.motivoCancel.length < 1 || data.motivoCancel.length > 500  ) {
        throw INVALIDO.MOT_CANCEL_ACT;
    }

}

export const validarSchema = (req : typeof request, resp : typeof response, next : NextFunction) =>{

    const errores = validationResult(req);

    if( ! errores.isEmpty() ) {
        const listaErrores = errores.mapped();
        return resp.status(400).json({
            ok: false,
            data : null,
            error : Object.keys(listaErrores).map( campo => listaErrores[campo].msg ),
        })
    }

    next();
}