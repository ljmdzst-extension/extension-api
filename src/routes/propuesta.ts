import express from 'express';
import { crearPropuesta, editarPropuesta, verPropuesta } from '../controllers/propuesta';

const RouterPropuesta = express.Router();

RouterPropuesta.get('/:codigoPropuesta', verPropuesta);
RouterPropuesta.post('/', crearPropuesta);
RouterPropuesta.put('/:codigoPropuesta',editarPropuesta);
RouterPropuesta.delete('/:codigoPropuesta',/**usrAuth ,controllers/propuesta.bajaPropuesta */);

export default RouterPropuesta;