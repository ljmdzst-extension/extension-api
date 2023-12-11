import express from 'express';
import { usrAuth } from '../middlewares/auth';

const RouterPropuesta = express.Router();

RouterPropuesta.get('/:idPropuesta',/**usrAuth ,controllers/propuesta.verPropuesta */);
RouterPropuesta.post('/',/**usrAuth ,controllers/propuesta.crearPropuesta */);
RouterPropuesta.put('/:idPropuesta',/**usrAuth ,controllers/propuesta.editarPropuesta */);
RouterPropuesta.delete('/:idPropuesta',/**usrAuth ,controllers/propuesta.bajaPropuesta */);

export default RouterPropuesta;