
import { Router } from "express";
import { validarIdArea } from "../middlewares/area";
import { validarPermisoAccesoMetas } from "../middlewares/permisos";
import { descargarPresupuesto, subirPrespuesto, verListaActividades, verListaAreas, verResumenArea } from "../controllers/area";

const routerArea = Router();

routerArea.get('/:idPrograma',[],verListaAreas);
routerArea.get(
    '/:idArea/:anio',
    validarPermisoAccesoMetas,
    validarIdArea,
    verListaActividades
);

routerArea.get('/resumen/:idArea/:anio/:offset/:limit/:keyword?',verResumenArea);
routerArea.get('/descargar/presupuesto/:anio/:idPrograma/:idArea',descargarPresupuesto);
routerArea.post('/subir/presupuesto/:anio/:idPrograma/:idArea',subirPrespuesto);

 
export default routerArea;
