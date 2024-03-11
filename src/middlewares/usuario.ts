import { NextFunction, request, response } from "express";
import { checkSchema, validationResult } from "express-validator";
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
            options : {min : 6, max : 6}, 
            errorMessage : 'Contraseña, debe tener 6 caracteres.'
        }
    }
},['body']);


export const validarCamposRegistro = checkSchema({
    nroDoc : { 
        exists : {
            errorMessage : 'nroDoc obligatorio'
        },
        isNumeric: {
            errorMessage : 'nroDoc inválido' 
        }, 
        isLength: { 
            options : {min : 8, max : 8}, 
            errorMessage : 'nroDoc de 8 dígitos sin puntos, con 0 adelante si tiene 7 dígitos'
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
            options : {min : 6, max : 6}, 
            errorMessage : 'Contraseña, debe tener 6 caracteres.'
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
            options : {min : 6, max : 6}, 
            errorMessage : 'Contraseña, debe tener 6 caracteres.'
        },
        custom : {
            options : ( value, {req} )=> req.body.pass === value,
            errorMessage : 'Contraseña y Confirmar contraseña deben coincidir'
        }
       
    }
    
},['body']);
