import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import RouterPropuesta from './routes/propuesta';
import RouterPropuestas from './routes/propuestas';
import RouterEvaluacion from './routes/evaluacion';
import RouterEvaluaciones from './routes/evaluaciones';
import { accesLogStream, combinedLogStream } from './config/logsConfig';
import sequelizePropuestas from './config/dbConfig';
import RouterPersonas from './routes/personas';
import RouterIntegrates from './routes/integrantes';
import RouterBases from './routes/bases';
import RouterInstituciones from './routes/instituciones';
import RouterPlanificacion from './routes/planificacion';
import routerPrograma from './routes/programa';
import routerArea from './routes/area';
import routerActividad from './routes/actividad';



const app = express();

// app.use(cors());

app.use(morgan('dev',{stream : accesLogStream}));
app.use(morgan('combined',{stream : combinedLogStream}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/v2/propuesta',RouterPropuesta);
app.use('/api/v2/propuestas',RouterPropuestas);
app.use('/api/v2/evaluacion',RouterEvaluacion);
app.use('/api/v2/evaluaciones',RouterEvaluaciones);
app.use('/api/v2/persona',RouterPersonas);
app.use('/api/v2/integrantes',RouterIntegrates);
app.use('/api/v2/bases',RouterBases);
app.use('/api/v2/instituciones',RouterInstituciones);
app.use('/api/v2/planificacion',RouterPlanificacion);
app.use('/api/v2/metas/programas',routerPrograma);
app.use('/api/v2/metas/areas',routerArea);
app.use('/api/v2/metas/bases',RouterBases);
app.use('/api/v2/metas/actividad',routerActividad);

app.listen( process.env.PORT , async()=>{
    try {
        await sequelizePropuestas.authenticate();
        console.log('db_propuestas conectada..')
    } catch (error : any) {
        console.log(error);
    }
    console.log(`propuestas corriendo en PUERTO : ${process.env.PORT}`);
    
} )
