import { Router } from "express";
import { verGraficosGeneral,verGraficosDeArea, verGraficoGantt,verInstituciones } from "../controllers/graficos";

const routerGraficos = Router();

routerGraficos.get('/general/:anio',[],verGraficosGeneral);
routerGraficos.get('/area/:anio/:idArea',[],verGraficosDeArea);
routerGraficos.get('/gantt/:anio',[],verGraficoGantt);
routerGraficos.get('/instituciones',[],verInstituciones);
export default routerGraficos;
