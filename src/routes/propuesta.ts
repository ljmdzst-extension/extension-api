import express from 'express';
import { editarPropuesta, verPropuesta } from '../controllers/propuesta';

const RouterPropuesta = express.Router();

RouterPropuesta.get('/:codigoPropuesta', verPropuesta);
RouterPropuesta.post('/', /** */);
RouterPropuesta.put('/:codigoPropuesta',editarPropuesta);
RouterPropuesta.delete('/:codigoPropuesta',/**usrAuth ,controllers/propuesta.bajaPropuesta */);

export default RouterPropuesta;