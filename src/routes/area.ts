
import { Router } from "express";
import { validarIdArea } from "../middlewares/area";
import { validarPermisoGestionMetas } from "../middlewares/permisos";
import { verListaActividades, verListaAreas } from "../controllers/area";

const routerArea = Router();

routerArea.get('/:idPrograma',[],verListaAreas);
routerArea.get(
    '/:idArea/actividades',
    validarPermisoGestionMetas,
    validarIdArea,
    verListaActividades
);
export default routerArea;
