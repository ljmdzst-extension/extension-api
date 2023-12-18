import express from 'express';
import { verPropuesta } from '../controllers/propuesta';

const RouterPropuesta = express.Router();

RouterPropuesta.get('/:codigoPropuesta', verPropuesta);
RouterPropuesta.post('/', /** */);
RouterPropuesta.put('/:codigoPropuesta',/**usrAuth ,controllers/propuesta.editarPropuesta */);
RouterPropuesta.delete('/:codigoPropuesta',/**usrAuth ,controllers/propuesta.bajaPropuesta */);

export default RouterPropuesta;