
import { Router } from "express";
import { verListaProgramasConAreas } from "../controllers/programa";
import { determinarAreasHabilitadas, validarPermisoAccesoMetas } from "../middlewares/permisos";



const routerPrograma = Router();

routerPrograma.get( 
    '/:anio',
    validarPermisoAccesoMetas,
    determinarAreasHabilitadas,
    verListaProgramasConAreas
);

export default routerPrograma;