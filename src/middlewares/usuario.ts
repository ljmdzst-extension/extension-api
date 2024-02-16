import { NextFunction, request, response } from "express";
import { validationResult } from "express-validator";
import { Usuario } from "../models/Usuario";
import sequelizeExtension from "../config/dbConfig";
import { Transaction } from "sequelize";


export const chequearUsuarioNoExistente = async({email} : {email : string}, transaction : Transaction)=>{

    const usuario = await Usuario.initModel(sequelizeExtension).findOne({attributes : ['email','pendiente'],where : { email  },transaction});
    if( usuario !== null ){

        if( usuario.pendiente === 1) {
            throw  { status : 400 , msg : 'Hay un usuario pendiente con ese correo, verifique su bandeja de entrada para confirmar el registro.' }
        }

        throw { status : 400 , msg : 'Ya existe un usuario registrado con ese correo ' }
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

