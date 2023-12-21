import express from 'express';
import { verIntegrates } from '../controllers/integrantes';

const RouterIntegrates = express.Router();

RouterIntegrates.get('/:codigoPropuesta', verIntegrates);
RouterIntegrates.post('/', /**usrAuth ,controllers/Integrates.altaIntegrate */);
RouterIntegrates.put('/:codigoPropuesta',/**usrAuth ,controllers/Integrates.editarIntegrate */);
RouterIntegrates.delete('/:codigoPropuesta',/**usrAuth ,controllers/Integrates.bajaIntegrate */);

export default RouterIntegrates;