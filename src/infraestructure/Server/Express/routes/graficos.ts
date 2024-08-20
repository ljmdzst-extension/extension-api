import { Router } from "express";
import { verGraficosDeAnio } from "../controllers/graficos";

const routerGraficos = Router();

routerGraficos.get('/general/:anio',[],verGraficosDeAnio);


export default routerGraficos;
