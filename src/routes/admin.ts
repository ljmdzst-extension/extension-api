
import { Router } from "express";
import { getUsuarios,postUsuario, putUsuario,getUsuario, deleteUsuario } from "../controllers/admin";
import { revisionValidatorBodyUsuario, validarBodyPutUsuario, validarUsuarioRepetidoPorNroDoc } from "../middlewares/admin";

const routerAdmin = Router();
const routerAdminUsr = Router();
const routerAdminCateg = Router();
const routerAdminPermiso = Router();
const routerAdminAreas = Router();
const routerAdminProg = Router();

routerAdminUsr.get('/',getUsuarios);
routerAdminUsr.get('/:idUsuario',getUsuario);
routerAdminUsr.post('/',[validarUsuarioRepetidoPorNroDoc],postUsuario);
routerAdminUsr.put('/',[...revisionValidatorBodyUsuario,validarBodyPutUsuario],putUsuario);
routerAdminUsr.delete('/:idUsuario',deleteUsuario);

routerAdminCateg.get('/');
routerAdminCateg.post('/');
routerAdminCateg.put('/:idCategoria');
routerAdminCateg.delete('/:idCategoria');

routerAdminPermiso.get('/');
routerAdminPermiso.post('/');
routerAdminPermiso.put('/:idPermiso');
routerAdminPermiso.delete('/:idPermiso');

routerAdminAreas.get('/');
routerAdminAreas.post('/');
routerAdminAreas.put('/:idArea');
routerAdminAreas.delete('/:idArea');

routerAdminProg.get('/');
routerAdminProg.get('/:idPrograma');
routerAdminProg.post('/');
routerAdminProg.put('/:idPrograma');
routerAdminProg.delete('/:idPrograma');


routerAdmin.use('/usr',routerAdminUsr);
routerAdmin.use('/categoria',routerAdminCateg);
routerAdmin.use('/permiso',routerAdminPermiso);
routerAdmin.use('/area',routerAdminAreas);

export default routerAdmin;
