
import { Router } from "express";
import { validarIdArea } from "../middlewares/area";
import { validarPermisoGestionMetas } from "../middlewares/permisos";
import { verListaActividades, verListaAreas, verResumenArea } from "../controllers/area";

const routerArea = Router();

routerArea.get('/:idPrograma',[],verListaAreas);
routerArea.get(
    '/:idArea/actividades/:anio',
    validarPermisoGestionMetas,
    validarIdArea,
    verListaActividades
);
routerArea.get('/resumen/:idArea/:anio',verResumenArea);
export default routerArea;
