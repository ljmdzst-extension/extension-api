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

    const usuario = await BD.Usuario.findOne({where : {nroDoc : req.body.persona.nroDoc}});

    if( !usuario ) {
        next();
    } else {
        HttpHelpers.responderPeticionError(resp,'ya existe un usuario asociado a esa persona',400);
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

export const revisionValidatorBodyUsuario = express_validator.checkSchema( {
    'persona.nroDoc' : { 
        isNumeric : { errorMessage : 'nroDoc inválido'},
        isLength : { options : {min : 7 , max : 8} , errorMessage : 'nroDoc 8 dígitos, con 0 adelante si son 7' }
    },
    'persona.ape' : { isLength : { options : {min : 2, max : 255 } , errorMessage : 'persona.ape min 1 , max 255'}},
    'persona.nom' : { isLength : { options : {min : 2, max : 255 } , errorMessage : 'persona.nom min 1 , max 255'}},
    'persona.tel' : { optional : true, isLength : { options : { max : 255 } , errorMessage : 'persona.tel max 255'} },
    'persona.email' : { optional : true, isLength : { options : { max : 255 } , errorMessage : 'persona.email  max 255'} },
    'persona.ciudad' : { optional : true, isLength : { options : { max : 255 } , errorMessage : 'persona.ciudad  max 255'} },
    'persona.provincia' : { optional : true, isLength : { options : { max : 255 } , errorMessage : 'persona.provincia  max 255'} },
    'persona.pais' : { optional : true ,isLength : { options : { max : 255 } , errorMessage : 'persona.pais max 255'}}, 
    'usuario.idUsuario' : { isLength : { options :{min : 1} , errorMessage : 'usuario.idUsuario obligatoriao '} },
    'usuario.pass' : { isLength : { options : { min : 6 , max : 255} , errorMessage : ' pass min 6 , max 255' } },
    'usuario.email' : { 
        trim : true,
        normalizeEmail : {
            options : {  all_lowercase : true  }
        },
        isEmail : { errorMessage : 'email inválido' },
        isLength : {  options : { max : 255 } , errorMessage : 'email  max 255'}
    },
    'usuario.pendiente' : { optional : true, isNumeric : {errorMessage : 'usuario.pendiente inválido'} },
    'usuario.idUnidadAcademica' : {   optional : true, isNumeric : { errorMessage : 'usuario.idUnidadAcadémica inválido'}  },
    'categorias' : { isArray : { options :{ min : 1} , errorMessage : 'categorias debe ser un array [{idCategoria , nom}] con al menos 1'  } },
    'categorias.*.idCategoria' : { isNumeric : { errorMessage : 'categoria.idCategoría inválido' } },
    'categorias.*.nombre' : { isLength : { options : { min : 1 , max :255 }, errorMessage : 'categoria.nombre max 255' } },
    'permisos' : { isArray : {  options: {min : 1} , errorMessage : 'permisos debe ser un array [{idPermiso , nom}] con al menos 1' }},
    'permisos.*.idPermiso' : { isNumeric : { errorMessage : 'permiso.idPermiso inválido' } },
    'permisos.*.nombre' : { isLength : { options : { min : 1 , max :255 }, errorMessage : 'permiso.nombre max 255' } },
    'areas' : { isArray : { options :{ min : 1} , errorMessage : 'areas debe ser un array [{anio , listaProgramas : [{ idPrograma , nom , listaAreas : [ { idArea , nom} ]}}]] con al menos 1'  } },
    'areas.*.anio' : { isNumeric : true, errorMessage : 'areas[i].anio debe ser un año ( mayor a 2023) ' },
    'areas.*.listaProgramas' : { isArray : {  options :{ min : 1}  , errorMessage : 'listaProgramas debe tener el formato [{ idPrograma , nom , listaAreas : [ { idArea , nom} ] }] con al menos 1'  }  },
    'areas.*.listaProgramas.*.idPrograma' : { isNumeric : { errorMessage : 'areas[i].listaProgramas[i].idPrograma debe ser un número' } },
    'areas.*.listaProgramas.*.nom' : { isLength : { options : { min : 1 , max :255 }, errorMessage : 'areas[i].listaProgramas[i].nom max 255' }},
    'areas.*.listaProgramas.*.listaAreas' : { isArray : {  options :{ min : 1}  , errorMessage : 'areas[i].listaProgramas[i].listaAreas debe tener el formato [ { idArea , nom} ] }] con al menos 1'  }  },
    'areas.*.listaProgramas.*.listaAreas.*.idArea' : { isNumeric : { errorMessage : 'areas[i].listaProgramas[i].listaAreas[i].idArea debe ser un número' } },
    'areas.*.listaProgramas.*.listaAreas.*.nom' : { isLength : { options : { min : 1 , max :255 }, errorMessage : 'areas[i].listaProgramas[i].listaAreas[i].nom max 255' }}
} ,['body']);

