import express from 'express';
import { bajaIntegrante, editarIntegrantes, verIntegrates } from '../controllers/integrantes';
import { validarCodigoPropuesta } from '../middlewares/propuesta';

const RouterIntegrates = express.Router();

RouterIntegrates.get('/:codigoPropuesta',validarCodigoPropuesta, verIntegrates);
RouterIntegrates.put('/',editarIntegrantes);
RouterIntegrates.delete('/:codigoPropuesta/:nroDoc',validarCodigoPropuesta,bajaIntegrante);

export default RouterIntegrates;