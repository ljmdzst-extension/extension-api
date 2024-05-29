
import { Router } from "express";
import { verListaProgramasConAreas } from "../controllers/programa";
import { validarPermisoAccesoMetas } from "../middlewares/permisos";



const routerPrograma = Router();

routerPrograma.get( '/:anio',validarPermisoAccesoMetas,verListaProgramasConAreas);

export default routerPrograma;