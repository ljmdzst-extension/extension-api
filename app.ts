import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import fs from 'fs';
import RouterPropuesta from './routes/propuesta';
import RouterPropuestas from './routes/propuestas';



const app = express();

const accesLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags : 'a'});

app.use(cors);
app.use(morgan('dev',{stream : accesLogStream}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.use('/propuesta',RouterPropuesta);
app.use('/propuestas',RouterPropuestas);

app.listen( process.env.PORT , async()=>{
    console.log(' propuestas ON..');
    console.log(`PUERTO : ${process.env.PORT}`);
    
} )
