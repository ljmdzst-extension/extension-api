import express from 'express';
import { 
    deleteProyecto,
    getProyecto, 
    postProyecto, 
    putProyecto 
} from '../controllers/proyecto';
import { validarCodigoPropuesta } from '../middlewares/propuesta';

const RouterProyecto = express.Router();

RouterProyecto.get('/:codigoPropuesta',validarCodigoPropuesta ,getProyecto);
RouterProyecto.post('/', postProyecto);
RouterProyecto.put('/:codigoPropuesta',validarCodigoPropuesta,putProyecto);
RouterProyecto.delete('/:idUsuario/:codigoPropuesta',validarCodigoPropuesta,deleteProyecto);

export default RouterProyecto;