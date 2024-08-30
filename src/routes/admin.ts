
import { Router } from "express";
import { getUsuarios,postUsuario, putUsuario,getUsuario, deleteUsuario } from "../controllers/admin";
import { revisionValidatorBodyUsuario, validarBodyPutUsuario, validarUsuarioAdmin, validarUsuarioRepetidoPorNroDoc } from "../middlewares/admin";

const routerAdmin = Router();

routerAdmin.get('/usr',getUsuarios);
routerAdmin.get('/usr/:idUsuario',getUsuario);
routerAdmin.post('/usr',[validarUsuarioRepetidoPorNroDoc],postUsuario);
routerAdmin.put('/usr',[...revisionValidatorBodyUsuario,validarBodyPutUsuario],putUsuario);
routerAdmin.delete('/usr/:idUsuario',deleteUsuario);

 
export default routerAdmin;
