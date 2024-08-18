import express from 'express';

const RouterEvaluaciones = express.Router();

RouterEvaluaciones.get('/',/* controllers/evaluaciones.verProEvaluaciones */);

export default RouterEvaluaciones;