import express from 'express';
import { bajaIntegrante, crearIntegrante, editarIntegrante, verIntegrates } from '../controllers/integrantes';

const RouterIntegrates = express.Router();

RouterIntegrates.get('/:codigoPropuesta', verIntegrates);
RouterIntegrates.post('/', crearIntegrante);
RouterIntegrates.put('/',editarIntegrante);
RouterIntegrates.delete('/:codigoPropuesta/:nroDoc',bajaIntegrante);

export default RouterIntegrates;