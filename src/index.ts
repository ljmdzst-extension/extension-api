import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import RouterPropuesta from './routes/propuesta';
import RouterPropuestas from './routes/propuestas';
import RouterEvaluacion from './routes/evaluacion';
import RouterEvaluaciones from './routes/evaluaciones';
import sequelizePropuestas from './config/dbConfig';
import RouterPersonas from './routes/personas';
import RouterIntegrates from './routes/integrantes';
import RouterBases from './routes/bases';
import RouterInstituciones from './routes/instituciones';
import RouterPlanificacion from './routes/planificacion';
import routerPrograma from './routes/programa';
import routerArea from './routes/area';
import routerActividad from './routes/actividad';
import usuarioRouter from './routes/usuario';
import RouterProyecto from './routes/proyecto';
import { informarPeticion } from './middlewares/bases';
import { extraerToken, validarToken } from './middlewares/auth';
import { obtenerDataUsuario } from './middlewares/usuario';


const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

// login de cada request
app.use(informarPeticion);


const BASE_PATH = '/api/v2';

app.use( `${BASE_PATH}/usr`, usuarioRouter  ) 
app.use( `${BASE_PATH}/usr/bases`, RouterBases  ) 

const BASE_PATH_METAS=`${BASE_PATH}/metas`;

app.use(BASE_PATH_METAS,extraerToken,validarToken,obtenerDataUsuario);

app.use(`${BASE_PATH_METAS}/programas`,routerPrograma);
app.use(`${BASE_PATH_METAS}/areas`,routerArea);
app.use(`${BASE_PATH_METAS}/bases`,RouterBases);
app.use(`${BASE_PATH_METAS}/actividad`,routerActividad);


// propuestas

const BASE_PATH_PROPUESTAS=`${BASE_PATH}/prop`

app.use(BASE_PATH_PROPUESTAS,extraerToken,validarToken,obtenerDataUsuario);

app.use(`${BASE_PATH_PROPUESTAS}/`,RouterPropuestas);
app.use(`${BASE_PATH_PROPUESTAS}/propuesta`,RouterPropuesta);
app.use(`${BASE_PATH_PROPUESTAS}/evaluacion`,RouterEvaluacion);
app.use(`${BASE_PATH_PROPUESTAS}/evaluaciones`,RouterEvaluaciones);
app.use(`${BASE_PATH_PROPUESTAS}/persona`,RouterPersonas);
app.use(`${BASE_PATH_PROPUESTAS}/integrantes`,RouterIntegrates);
app.use(`${BASE_PATH_PROPUESTAS}/bases`,RouterBases);
app.use(`${BASE_PATH_PROPUESTAS}/instituciones`,RouterInstituciones);
app.use(`${BASE_PATH_PROPUESTAS}/planificacion`,RouterPlanificacion);


app.listen( process.env.PORT , async()=>{
    try {
        await sequelizePropuestas.authenticate();
        console.log('db_propuestas conectada..')
    } catch (error : any) {
        console.log(error);
    }
    console.log(`propuestas corriendo en PUERTO : ${process.env.PORT}`);
    
} )
