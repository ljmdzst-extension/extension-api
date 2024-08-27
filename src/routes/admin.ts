
import { Router } from "express";
import { getUsuarios,postUsuario, putUsuario,getUsuario } from "../controllers/admin";
import { revisionValidatorBodyPutUsuario, validarBodyPutUsuario, validarUsuarioAdmin, validarUsuarioRepetidoPorNroDoc } from "../middlewares/admin";

const routerAdmin = Router();

routerAdmin.get('/usr',[validarUsuarioAdmin],getUsuarios);
routerAdmin.get('/usr/:idUsuario',[validarUsuarioAdmin],getUsuario);
routerAdmin.post('/usr',[validarUsuarioAdmin,validarUsuarioRepetidoPorNroDoc],postUsuario);
routerAdmin.put('/usr',[validarUsuarioAdmin,...revisionValidatorBodyPutUsuario,validarBodyPutUsuario],putUsuario);
routerAdmin.get('/bases',[],/** getBases */);

 
export default routerAdmin;
