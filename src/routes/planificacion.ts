import express from 'express';
import { editarPlanificacion } from '../controllers/planificacion';

const RouterPlanificacion = express.Router();

RouterPlanificacion.put('/', editarPlanificacion);

export default RouterPlanificacion;