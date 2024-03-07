
import { Router } from "express";
import { ControllerPrograma } from "../controllers/programa";
import { endpoint } from "../controllers/endpoint";


const routerPrograma = Router();

routerPrograma.get( '/:anio', endpoint( ControllerPrograma.verListaProgramasConAreas ) );

export default routerPrograma;