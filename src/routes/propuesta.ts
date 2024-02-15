import express from 'express';
import { bajaPropuesta, crearPropuesta, editarPropuesta, verPropuesta } from '../controllers/propuesta';
import { validarCodigoPropuesta } from '../middlewares/propuesta';

const RouterPropuesta = express.Router();

RouterPropuesta.get('/:codigoPropuesta',validarCodigoPropuesta ,verPropuesta);
RouterPropuesta.post('/', crearPropuesta);
RouterPropuesta.put('/:codigoPropuesta',validarCodigoPropuesta,editarPropuesta);
RouterPropuesta.delete('/:idUsuario/:codigoPropuesta',validarCodigoPropuesta,bajaPropuesta);

export default RouterPropuesta;