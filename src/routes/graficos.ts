import { Router } from "express";
import { verGraficosGeneral,verGraficosDeArea, verGraficoGantt,verInstituciones,verUbicacionesActividadPorAnio } from "../controllers/graficos";

const routerGraficos = Router();

routerGraficos.get('/general/:anio',[],verGraficosGeneral);
routerGraficos.get('/area/:anio/:idArea',[],verGraficosDeArea);
routerGraficos.get('/gantt/:anio',[],verGraficoGantt);
routerGraficos.get('/instituciones',[],verInstituciones);
routerGraficos.get('/ubicaciones/:anio',[],verUbicacionesActividadPorAnio);

export default routerGraficos;
