
import { Router } from "express";
import { ControllerPrograma } from "../controllers/programa";
import { endpoint } from "../controllers/endpoint";
import { validarPermisoGestionMetas } from "../middlewares/permisos";
import { extraerToken } from "../middlewares/auth";

const routerPrograma = Router();

routerPrograma.get( '/:anio',extraerToken,validarPermisoGestionMetas, endpoint( ControllerPrograma.verListaProgramasConAreas ) );

export default routerPrograma;