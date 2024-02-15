
import { Router } from "express";
import { endpoint } from "../controllers/endpoint";
import ControllerArea from "../controllers/area";
import { middleware } from "../middlewares/middleware";
import { validarIdArea } from "../middlewares/area";

const routerArea = Router();

routerArea.get('/:idPrograma',[],endpoint(ControllerArea.verListaAreas));
routerArea.get('/:idArea/actividades',[middleware(validarIdArea)],endpoint(ControllerArea.verListaActividades))
export default routerArea;