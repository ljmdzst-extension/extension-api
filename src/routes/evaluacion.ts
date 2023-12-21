import express from 'express';

const RouterEvaluacion = express.Router();

RouterEvaluacion.get('/:idEvaluacion', /**controllers/evaluacion.verEvaluacion */);
RouterEvaluacion.post('/', /**controllers/evaluacion.crearEvaluacion */);
RouterEvaluacion.put('/:idEvaluacion', /**controllers/evaluacion.editarEvaluacion */);
RouterEvaluacion.delete('/:idEvaluacion', /**controllers/evaluacion.bajaEvaluacion */);

export default RouterEvaluacion;