import { NextFunction, request, response } from "express";
import { checkSchema, validationResult } from "express-validator";
import sequelizeExtension, { BD } from "../config/dbConfig";
import { HttpHelpers } from "../helpers/general";
import { Usuario } from "../models/Usuario";



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
    const transaction = await sequelizeExtension.transaction({ logging : process.env.NODE_ENV === 'development' ? sql => console.log(sql) : undefined});
    try {

        let iUsuario : Usuario | null= null;

        if(req.body && req.body.email){

            iUsuario = await BD.Usuario.findOne({where : {email : req.body.email}, transaction});
        }
        if(req.usuario && req.usuario.idUsuario){

            iUsuario = await BD.Usuario.findByPk(req.usuario.idUsuario, {transaction});
        } 
    
        if(!iUsuario) throw {status : 400 , message: 'no existe un usuario con ese id'}
        
        const lCategoriasUsuario = await BD.CategoriaUsuario.findAll({where : {idUsuario : iUsuario.idUsuario}, transaction});
        
        if(!lCategoriasUsuario) throw { status : 500 , message : 'usuario sin categoría'}

        const categorias = await BD.Categoria.findAll({where : {idCategoria : lCategoriasUsuario.map( cu => cu.idCategoria)} , transaction});
        
        const permisosCategorias = await BD.PermisoCategoria.findAll({ where : {idCategoria : lCategoriasUsuario.map(cu => cu.idCategoria)} , transaction});
        if(permisosCategorias.length < 1) throw { status : 500 , message : 'usuario sin permisos asignados'}
        const permisos = await BD.Permiso.findAll({where : { idPermiso : permisosCategorias.map( pc => pc.idPermiso) } , transaction});
        
        await transaction.commit();

        req.usuario = {
            usuario : iUsuario,
            categorias : categorias.map( c => c.dataValues),
            permisos : permisos.map( p => p.nombre)
        }

        next();
        
    } catch (error : any) {
        await transaction.rollback();
        let status = 500;
        let message = 'error de servidor';

        if(error.status && error.message) {
            status = error.status
            message = error.message
        } else {
            console.log(error);
            console.log(`ERROR : ${req.method}-${req.path}-${message}`)
        }
        
        resp.status(status).json({
            ok : false,
            data : null,
            error : message
        })
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