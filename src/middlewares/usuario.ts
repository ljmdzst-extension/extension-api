import { NextFunction, request, response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { BD } from "../config/dbConfig";
import { HttpHelpers } from "../helpers/general";
import { Usuario } from "../models/Usuario";

import * as SUsuario from '../services/usuario';

export const chequearUsuarioNoExistente =  async(req : typeof request, resp : typeof response, next : NextFunction) =>{

    try {
        const { email } = req.body;

        const usuario = await BD.Usuario.findOne({attributes : ['email','pendiente'],where : { email  }});

        if( usuario !== null ){

            if( usuario.pendiente === 1) {
                throw  { status : 400 , message : 'Hay un usuario pendiente con ese correo, verifique su bandeja de entrada para confirmar el registro.' }
            }

            throw { status : 400 , message : 'Ya existe un usuario registrado con ese correo ' }
        }
        next();
    } catch (error : any) {
        resp.status(error.status).json({
            ok : false,
            error : error.message,
            data : null
        })
    }

}


export const obtenerDataUsuario = async(req : any, resp : typeof response, next : NextFunction) =>{
    
    try {

        if((!req.usuario) && (!req.body))  throw { status : 400 , message : 'No se pudo obtener data de la petición'}

        if(req.usuario) {
            req.usuario = await SUsuario.obtenerDataUsuario(req.usuario.idUsuario,undefined)
           
        }
        else if( req.body){
            req.usuario = await SUsuario.obtenerDataUsuario(undefined,req.body.email)
           
        
        }
        
        next();

    } catch (error : any) {
        if(error.status === 500) {
            console.log(`ERROR : ${req.method}-${req.path}-${error.message}`)
        }
        HttpHelpers.responderPeticionError(resp,error.message,error.status || 500);
    }
}

export const validarPass = async(req : any , resp : typeof response, next : NextFunction)=>{
    const { usuario } = req.usuario;
    
    const {pass} = req.body;
    
    if( usuario.pass == pass ) {
        next();
    } else {
        HttpHelpers.responderPeticionError(resp, 'Contraseña errónea' ,403 );
    }

}

export const validarCorreoYContraseña = checkSchema({
    email : {
        exists : {
            errorMessage : 'E-mail obligatorio'
        },
        isEmail : {
            errorMessage : 'E-mail inválido, formato admitido: mail@mail.com'
        },

    },
    pass : {
        exists : {
            errorMessage : 'Ingrese su contraseña'
        },
        isLength: { 
            options : {min : 6}, 
            errorMessage : 'La contraseña debe tener mínimo 6 caracteres.'
        }
    }
},['body']);


export const validarCamposRegistro = checkSchema({
    nroDoc : { 
        exists : {
            errorMessage : 'dni obligatorio'
        },
        isNumeric: {
            errorMessage : 'dni inválido' 
        }, 
        isLength: { 
            options : {min : 8, max : 8}, 
            errorMessage : 'dni de 8 dígitos sin puntos, con 0 adelante si tiene 7 dígitos'
        }
        
    },
    ape : { 
        exists : {
            errorMessage : 'Apellido obligatorio'
        },
        notEmpty : { 
            errorMessage : 'Apellido obligatorio' 
        },
        isLength: { 
            options : {min : 2, max : 255}, 
            errorMessage : 'Apellido, entre 2 y 255 caracteres'
        }
    },
    nom : {
        exists : {
            errorMessage : 'Nombre obligatorio'
        },
        notEmpty : { 
            errorMessage : 'Nombre obligatorio' 
        },
        isLength: { 
            options : {min : 2, max : 255}, 
            errorMessage : 'Nombre, entre 2 y 255 caracteres'
        }
    },
    email : { 
        exists : {
            errorMessage : 'Email obligatorio'
           },
       notEmpty : {
        errorMessage : 'Email obligatorio'
       },
       isEmail :{
            errorMessage : 'Email inválido'
       }
    },
    pass : { 
        exists : {
            errorMessage : 'Contraseña obligatoria'
        },
        notEmpty : {
            errorMessage : 'Contraseña obligatoria'
        },
        isLength: { 
            options : {min : 6, max : 255}, 
            errorMessage : 'Contraseña, debe tener mínimo 6 caracteres.'
        }
    },
    idUnidadAcademica : {
        exists : {
            errorMessage : 'Unidad académica obligatoria'
        },
        isNumeric: {
            errorMessage : 'Unidad académica obligatoria' 
        }, 
        isInt : {
            errorMessage : 'Unidad académica inválida'
        }
    },
    confirmPass : { 
        exists : {
            errorMessage : 'Confirmar contraseña obligatoria'
        },
        notEmpty : {
            errorMessage : 'Confirmar contraseña obligatoria'
        },
        isLength: { 
            options : {min : 6, max : 255}, 
            errorMessage : 'Contraseña, debe tener mínimo 6 caracteres.'
        },
        custom : {
            options : ( value, {req} )=> req.body.pass === value,
            errorMessage : 'Contraseña y Confirmar contraseña deben coincidir'
        }
       
    }
    
},['body']);

export const validarUsuarioNoPendiente = async( req : any , resp : typeof response, next : NextFunction)=>{
    const { usuario } : { usuario : Usuario} = req.usuario;
    
    if( ! usuario.pendiente ) {
        next();
    } else {
        HttpHelpers.responderPeticionError(resp, 'Usuario pendiente de confirmación de registro' ,403 );
    }
}

export const validarSchema = (req : typeof request, resp : typeof response, next : NextFunction) =>{

    const errores = validationResult(req);

    if( errores.isEmpty() ) {
        next();
    } 
    else {
        const listaErrores = errores.mapped();
        HttpHelpers.responderPeticionError(
            resp,
            Object.keys(listaErrores).map( campo => listaErrores[campo].msg ).toString(),
            400
        )
    }

}