import express from 'express';
import { 
    deletePropuesta,
    getPropuesta, 
    postPropuesta, 
    putPropuesta 
} from '../controllers/propuesta';
import { validarCodigoPropuesta } from '../middlewares/propuesta';

const RouterPropuesta = express.Router();

RouterPropuesta.get('/:codigoPropuesta',validarCodigoPropuesta ,getPropuesta);
RouterPropuesta.post('/', postPropuesta);
RouterPropuesta.put('/:codigoPropuesta',validarCodigoPropuesta,putPropuesta);
RouterPropuesta.delete('/:idUsuario/:codigoPropuesta',validarCodigoPropuesta,deletePropuesta);

export default RouterPropuesta;