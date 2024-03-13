
import { Router } from "express";
import { verListaProgramasConAreas } from "../controllers/programa";



const routerPrograma = Router();

routerPrograma.get( '/:anio',verListaProgramasConAreas);

export default routerPrograma;