import { Router } from "express";

import { 
    authUsuario, 
    loginUsuario, 
    registerUsuario, 
    validarRegistro, 
    verListaUsuarios
} from "../controllers/usuario";

import { 
    chequearUsuarioNoExistente, 
    obtenerDataUsuario, 
    validarCamposRegistro, 
    validarCorreoYContraseña, 
    validarPass, 
    validarSchema, 
    validarUsuarioNoPendiente 
} from "../middlewares/usuario";

import { extraerToken, validarToken } from "../middlewares/auth";



const usuarioRouter = Router();

usuarioRouter.post('/login', [...validarCorreoYContraseña,validarSchema], obtenerDataUsuario,validarPass,validarUsuarioNoPendiente,loginUsuario );

usuarioRouter.post('/register',[...validarCamposRegistro, validarSchema ],chequearUsuarioNoExistente, registerUsuario );

usuarioRouter.post('/auth', extraerToken, validarToken, authUsuario );

usuarioRouter.put('/validar/:idUsuario', validarRegistro );

usuarioRouter.get('/',verListaUsuarios );

export default usuarioRouter;