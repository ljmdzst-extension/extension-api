import express from 'express';
import { buscar } from '../controllers/personas';

const RouterPersonas = express.Router();

RouterPersonas.get('/:nroDoc', buscar);

export default RouterPersonas;