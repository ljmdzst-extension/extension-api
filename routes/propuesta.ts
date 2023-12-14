import express from 'express';
import { verPropuesta } from '../controllers/propuesta';

const RouterPropuesta = express.Router();

RouterPropuesta.get('/:codigoPropuesta',verPropuesta);
RouterPropuesta.post('/',/**usrAuth ,controllers/propuesta.crearPropuesta */);
RouterPropuesta.put('/:codigoPropuesta',/**usrAuth ,controllers/propuesta.editarPropuesta */);
RouterPropuesta.delete('/:codigoPropuesta',/**usrAuth ,controllers/propuesta.bajaPropuesta */);

export default RouterPropuesta;