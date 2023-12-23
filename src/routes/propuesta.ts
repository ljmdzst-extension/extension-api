import express from 'express';
import { bajaPropuesta, crearPropuesta, editarPropuesta, verPropuesta } from '../controllers/propuesta';

const RouterPropuesta = express.Router();

RouterPropuesta.get('/:codigoPropuesta', verPropuesta);
RouterPropuesta.post('/', crearPropuesta);
RouterPropuesta.put('/:codigoPropuesta',editarPropuesta);
RouterPropuesta.delete('/:idUsuario/:codigoPropuesta',bajaPropuesta);

export default RouterPropuesta;