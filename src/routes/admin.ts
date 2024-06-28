
import { Router } from "express";
import { getUsuarios } from "../controllers/admin";

const routerAdmin = Router();

routerAdmin.get('/usr',[],getUsuarios);
routerAdmin.post('/usr',[],/** postUsuario */);
routerAdmin.put('/usr/:id',/** putUsuario */);
routerAdmin.get('/bases',[],/** getBases */);

 
export default routerAdmin;
