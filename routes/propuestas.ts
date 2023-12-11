import express from 'express';

const RouterPropuestas = express.Router();

RouterPropuestas.get('/',/* controllers/propuestas.verPropuestas */);

export default RouterPropuestas;