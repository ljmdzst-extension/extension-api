import { Router } from "express";
import { 
    authUsuario, 
    loginUsuario, 
    registerUsuario, 
    validarRegistro, 
    verListaUsuarios
} from "../controllers/usuario";
import { endpoint } from "../controllers/endpoint";
import { chequearUsuarioNoExistente, validarCamposRegistro, validarCorreoYContraseña, validarSchema } from "../middlewares/usuario";
import { middleware } from "../middlewares/middleware";
import { extraerToken } from "../middlewares/auth";



const usuarioRouter = Router();

usuarioRouter.post('/login', [...validarCorreoYContraseña,validarSchema], endpoint( loginUsuario ) );

usuarioRouter.post('/register',[...validarCamposRegistro, validarSchema ],middleware(chequearUsuarioNoExistente), endpoint(registerUsuario) );

usuarioRouter.post('/auth', extraerToken , endpoint(authUsuario) );

usuarioRouter.put('/validar/:idUsuario', validarRegistro );

usuarioRouter.get('/', endpoint(verListaUsuarios) );

export default usuarioRouter;