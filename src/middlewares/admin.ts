import { NextFunction,  response } from "express";
import { CategoriaAttributes } from "../models/init-models";
import { BD } from "../config/dbConfig";
import { HttpHelpers } from "../helpers/general";
import * as express_validator from 'express-validator'


export const validarUsuarioAdmin =  async(req : any, resp : typeof response , next : NextFunction)=>{
    const { categorias }  = req.usuario;

    if( categorias.every( (c : CategoriaAttributes) => c.nombre !== 'ADMIN') ){
        resp.status(403).json({
            ok : false,
            error : 'No posee permisos de administrador'
        });
    } else {
        next();
    }
}

export const validarUsuarioRepetidoPorNroDoc = async(req : any, resp : typeof response , next : NextFunction)=>{

    const {persona} = req.body;

    if( persona && (await BD.Usuario.findOne({where : {nroDoc : persona.nroDoc}})) === null ) {
        next();
    } else {
        HttpHelpers.responderPeticionError(resp,'ya existe un usuario con ese dni',400);
    }

}

export const validarBodyPutUsuario = async(req : any, resp : typeof response , next : NextFunction)=>{

    const errores = express_validator.validationResult( req );
    if( errores.isEmpty() ){
        next();
    } else {
        const messages  = errores.array().map( e => e.msg);
        HttpHelpers.responderPeticionError(resp,`${messages.join(';')}`,400);
    }

}

export const revisionValidatorBodyPutUsuario = express_validator.checkSchema( {
    'persona.nroDoc' : { isNumeric : true, errorMessage : 'nroDoc inválido'},
    'persona.ape' : { isLength : { options : {min : 2, max : 255 } , errorMessage : 'persona.ape min 1 , max 255'}},
    'persona.nom' : { isLength : { options : {min : 2, max : 255 } , errorMessage : 'persona.nom min 1 , max 255'}},
    'persona.tel' : { optional : true, isLength : { options : { max : 255 } , errorMessage : 'persona.tel max 255'} },
    'persona.email' : { optional : true, isLength : { options : { max : 255 } , errorMessage : 'persona.email  max 255'} },
    'persona.ciudad' : { optional : true, isLength : { options : { max : 255 } , errorMessage : 'persona.ciudad  max 255'} },
    'persona.provincia' : { optional : true, isLength : { options : { max : 255 } , errorMessage : 'persona.provincia  max 255'} },
    'persona.pais' : { optional : true,  isLength : { options : { max : 255 } , errorMessage : 'persona.pais max 255'}}, 
    'usuario.idUsuario' : { isLength : { options :{min : 1} , errorMessage : 'usuario.idUsuario obligatoriao '} },
    'usuario.pendiente' : { isNumeric : {errorMessage : 'idUnidadAcadémica inválido'} },
    'usuario.pass' : {
        isLength : { options : { min : 6 , max : 255} , errorMessage : ' pass min 6 , max 255' }
    },
    'usuario.email' : { 
        isEmail : { errorMessage : 'email inválido' },
        isLength : {  options : { max : 255 } , errorMessage : 'email  max 255'}
    },
    'usuario.idUnidadAcademica' : { 
        optional : true,
        isNumeric : {errorMessage : 'idUnidadAcadémica inválido'}
    }
  
} ,['body'])