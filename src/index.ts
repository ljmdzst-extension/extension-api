import dotenv from 'dotenv';

dotenv.config();

import express, { request, response } from 'express';
import cors from 'cors';
import path from 'path';
import busboyBodyParser from 'busboy-body-parser';
import sequelizeExtension from './config/dbConfig';
import RouterBases from './routes/bases';
import routerPrograma from './routes/programa';
import routerArea from './routes/area';
import routerActividad from './routes/actividad';
import routerAdmin from './routes/admin';

import usuarioRouter from './routes/usuario';

import routerGraficos from './routes/graficos';
import { informarPeticion } from './middlewares/bases';
import { extraerToken, validarToken } from './middlewares/auth';
import { informarUsuario, obtenerDataUsuario } from './middlewares/usuario';
import { validarUsuarioAdmin } from './middlewares/admin';


const app = express();

app.use(cors());

app.use(busboyBodyParser({limit : '5mb'}));

app.use(express.json());

app.use(express.static(path.join(__dirname,'./public')));

// login de cada request



const BASE_PATH = '/api/v2';

app.use(informarPeticion);

app.use( `${BASE_PATH}/usr`, usuarioRouter  );
app.use( `${BASE_PATH}/usr/bases`, RouterBases  ) ;

const BASE_PATH_METAS=`${BASE_PATH}/metas`;


// funcionando
app.use(BASE_PATH_METAS,extraerToken,validarToken,obtenerDataUsuario,informarUsuario);


app.use(`${BASE_PATH_METAS}/admin`,[validarUsuarioAdmin],routerAdmin);

app.use(`${BASE_PATH_METAS}/programas`,routerPrograma);  
app.use(`${BASE_PATH_METAS}/areas`,routerArea);
app.use(`${BASE_PATH_METAS}/bases`,RouterBases);
app.use(`${BASE_PATH_METAS}/actividad`,routerActividad);
app.use(`${BASE_PATH_METAS}/graficos`,routerGraficos);


// propuestas

/*
const BASE_PATH_PROPUESTAS=`${BASE_PATH}/prop`

app.use(BASE_PATH_PROPUESTAS,extraerToken,validarToken,obtenerDataUsuario,informarUsuario);
app.use(`${BASE_PATH_PROPUESTAS}/bases`,RouterBases);
app.use(`${BASE_PATH_PROPUESTAS}/instituciones`,RouterInstituciones);
*/

app.use('*', async(req : typeof request , res : typeof response) => {
    res.sendFile(path.join(__dirname , './public/index.html'));
});

app.listen( process.env.PORT , async()=>{
    try {
        await sequelizeExtension.authenticate();
        console.log(`${sequelizeExtension.getDatabaseName()} conectada`)
    } catch (error : any) {
        console.log(error);
    }
    console.log(`propuestas corriendo en PUERTO : ${process.env.PORT}`);
    
} )
