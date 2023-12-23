import express from 'express';
import { buscar } from '../controllers/personas';
import { verBases } from '../controllers/bases';

const RouterBases = express.Router();

RouterBases.get('/', verBases);

export default RouterBases;