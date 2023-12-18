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



const app = express();

app.use(cors());

app.use(morgan('dev',{stream : accesLogStream}));
app.use(morgan('combined',{stream : combinedLogStream}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/v2/propuesta',RouterPropuesta);
app.use('/api/v2/propuestas',RouterPropuestas);
app.use('/api/v2/evaluacion',RouterEvaluacion);
app.use('/api/v2/evaluaciones',RouterEvaluaciones);
app.use('/api/v2/persona',RouterPersonas);


app.listen( process.env.PORT , async()=>{
    try {
        await sequelizePropuestas.authenticate();
        console.log('db_propuestas conectada..')
    } catch (error : any) {
        console.log(error);
    }
    console.log(`propuestas corriendo en PUERTO : ${process.env.PORT}`);
    
} )
