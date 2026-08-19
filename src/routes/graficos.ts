import { Router } from "express";
import { verGraficosGeneral,verGraficosDeArea, verGraficoGantt,verUbicacionesActividadPorAnio, verInstitucionesPorAnio } from "../controllers/graficos";

const routerGraficos = Router();

routerGraficos.get('/general/:anio',[],verGraficosGeneral);
routerGraficos.get('/area/:anio/:idArea',[],verGraficosDeArea);
routerGraficos.get('/gantt/:anio',[],verGraficoGantt);
routerGraficos.get('/instituciones/:anio',[],verInstitucionesPorAnio);
routerGraficos.get('/ubicaciones/:anio',[],verUbicacionesActividadPorAnio);

export default routerGraficos;
