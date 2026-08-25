import express from 'express';
import {verBases,verInstituciones, verInstitucionesByName} from "../controllers/bases";

const RouterBases = express.Router();

RouterBases.get('/', verBases);
RouterBases.get('/instituciones',[],verInstituciones);
RouterBases.get('/instituciones/:query/:offset/:limit',[],verInstituciones);

RouterBases.get('/institucionesByName/:name/:offset/:limit',[],verInstitucionesByName);


export default RouterBases;