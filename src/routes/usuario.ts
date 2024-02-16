import { Router } from "express";
import { 
    authUsuario, 
    loginUsuario, 
    registerUsuario, 
    validarRegistro, 
    verListaUsuarios
} from "../controllers/usuario";
import { endpoint } from "../controllers/endpoint";
import { checkSchema } from "express-validator";
import { chequearUsuarioNoExistente, validarSchema } from "../middlewares/usuario";
import { middleware } from "../middlewares/middleware";



const usuarioRouter = Router();

usuarioRouter.post('/login',[
    ...checkSchema({
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
    },['body']),
    validarSchema
],endpoint( loginUsuario ) )
usuarioRouter.post('/register',
[
    ...checkSchema({
        dni : { 
            exists : {
                errorMessage : 'DNI obligatorio'
            },
            isNumeric: {
                errorMessage : 'DNI inválido' 
            }, 
            isLength: { 
                options : {min : 8, max : 8}, 
                errorMessage : 'DNI de 8 dígitos sin puntos, con 0 adelante si tiene 7 dígitos'
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
        
    },['body']),
    validarSchema,
    middleware(chequearUsuarioNoExistente)
],endpoint(registerUsuario))
usuarioRouter.post('/auth',endpoint(authUsuario))
usuarioRouter.put('/validar/:idUsuario',endpoint(validarRegistro));
usuarioRouter.get('/',endpoint(verListaUsuarios))

export default usuarioRouter;