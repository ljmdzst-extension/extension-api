import { Router } from "express";
import { verGraficosGeneral,verGraficosDeArea } from "../controllers/graficos";

const routerGraficos = Router();

routerGraficos.get('/general/:anio',[],verGraficosGeneral);
routerGraficos.get('/area/:anio/:idArea',[],verGraficosDeArea)

export default routerGraficos;
