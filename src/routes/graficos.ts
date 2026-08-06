import { Router } from "express";
import { verGraficosGeneral,verGraficosDeArea, verGraficoGantt } from "../controllers/graficos";

const routerGraficos = Router();

routerGraficos.get('/general/:anio',[],verGraficosGeneral);
routerGraficos.get('/area/:anio/:idArea',[],verGraficosDeArea);
routerGraficos.get('/gantt/:anio/:idArea',[],verGraficoGantt);

export default routerGraficos;
