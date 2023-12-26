import express from 'express';
import { bajaInstitucion, crearInstitucion, editarInstitucion, verInstituciones } from '../controllers/instituciones';

const RouterInstituciones = express.Router();

RouterInstituciones.get('/:codigoPropuesta', verInstituciones);
RouterInstituciones.post('/', crearInstitucion);
RouterInstituciones.put('/',editarInstitucion);
RouterInstituciones.delete('/:codigoPropuesta/:nroDoc',bajaInstitucion);

export default RouterInstituciones;