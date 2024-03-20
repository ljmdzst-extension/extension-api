import express from 'express';
import {verBases,verInstituciones} from "../controllers/bases";

const RouterBases = express.Router();

RouterBases.get('/', verBases);
RouterBases.get('/instituciones',[],verInstituciones);
RouterBases.get('/instituciones/:query/:offset/:limit',[],verInstituciones);

export default RouterBases;