import express from 'express';
import { verBases } from '../controllers/bases';
import { endpoint } from "../controllers/endpoint";
import ControllerBases from "../controllers/bases";

const RouterBases = express.Router();

RouterBases.get('/', verBases);
RouterBases.get('/instituciones',[],endpoint(ControllerBases.verInstituciones));
RouterBases.get('/instituciones/:query/:offset/:limit',[],endpoint(ControllerBases.verInstituciones));

export default RouterBases;