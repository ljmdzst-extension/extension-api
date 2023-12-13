import express from 'express';
import { verPropuestas } from '../controllers/propuestas';

const RouterPropuestas = express.Router();

RouterPropuestas.get('/:idUsuario', verPropuestas);

export default RouterPropuestas;