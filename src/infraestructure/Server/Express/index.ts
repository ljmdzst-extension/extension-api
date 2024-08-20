import dotenv from 'dotenv';

dotenv.config();

import express, { Express, request, response } from 'express';
import cors from 'cors';
import path from 'path';
import RouterPropuesta from './routes/propuesta';
import RouterPropuestas from './routes/propuestas';
import RouterEvaluacion from './routes/evaluacion';
import RouterEvaluaciones from './routes/evaluaciones';
import sequelizeExtension from '../../db/Mysql-Sequelize/config/dbConfig';
import RouterPersonas from './routes/personas';
import RouterIntegrates from './routes/integrantes';
import RouterBases from './routes/bases';
import RouterInstituciones from './routes/instituciones';
import RouterPlanificacion from './routes/planificacion';
import routerPrograma from './routes/programa';
import routerArea from './routes/area';
import routerActividad from './routes/actividad';
import routerAdmin from './routes/admin';

import usuarioRouter from './routes/usuario';

import routerGraficos from './routes/graficos';
import { informarPeticion } from './middlewares/bases';
import { extraerToken, validarToken } from './middlewares/auth';
import { obtenerDataUsuario } from './middlewares/usuario';
import IServer from '../IServer';

export namespace ServerExpress {

    export class Server implements IServer {
        private app !: Express;

        constructor(){
            this.app = express();

            this.app.use(cors());
        
            this.app.use(express.json());
        
            this.app.use(express.static(path.join(__dirname,'./public')));
        
            // login de cada request
        
        
        
            const BASE_PATH = '/api/v2';
        
            this.app.use(informarPeticion);
        
            this.app.use( `${BASE_PATH}/usr`, usuarioRouter  );
            this.app.use( `${BASE_PATH}/usr/bases`, RouterBases  ) ;
        
            const BASE_PATH_METAS=`${BASE_PATH}/metas`;
        
            this.app.use(BASE_PATH_METAS,extraerToken,validarToken,obtenerDataUsuario);
        
            this.app.use(`${BASE_PATH_METAS}/programas`,routerPrograma);
            this.app.use(`${BASE_PATH_METAS}/areas`,routerArea);
            this.app.use(`${BASE_PATH_METAS}/bases`,RouterBases);
            this.app.use(`${BASE_PATH_METAS}/actividad`,routerActividad);
            this.app.use(`${BASE_PATH_METAS}/graficos`,routerGraficos);
        
            this.app.use(`${BASE_PATH_METAS}/admin`,routerAdmin);
        
            // propuestas
        
            const BASE_PATH_PROPUESTAS=`${BASE_PATH}/prop`
        
            this.app.use(BASE_PATH_PROPUESTAS,extraerToken,validarToken,obtenerDataUsuario);
        
            this.app.use(`${BASE_PATH_PROPUESTAS}/`,RouterPropuestas);
            this.app.use(`${BASE_PATH_PROPUESTAS}/propuesta`,RouterPropuesta);
            this.app.use(`${BASE_PATH_PROPUESTAS}/evaluacion`,RouterEvaluacion);
            this.app.use(`${BASE_PATH_PROPUESTAS}/evaluaciones`,RouterEvaluaciones);
            this.app.use(`${BASE_PATH_PROPUESTAS}/persona`,RouterPersonas);
            this.app.use(`${BASE_PATH_PROPUESTAS}/integrantes`,RouterIntegrates);
            this.app.use(`${BASE_PATH_PROPUESTAS}/bases`,RouterBases);
            this.app.use(`${BASE_PATH_PROPUESTAS}/instituciones`,RouterInstituciones);
            this.app.use(`${BASE_PATH_PROPUESTAS}/planificacion`,RouterPlanificacion);
        
            this.app.use('*', async(req : typeof request , res : typeof response) => {
                res.sendFile(path.join(__dirname , './public/index.html'));
            });
        }


        iniciar() {
            return this.app.listen( process.env.PORT , async()=>{
                try {
                    await sequelizeExtension.authenticate();
                    console.log(`${sequelizeExtension.getDatabaseName()} conectada`)
                } catch (error : any) {
                    console.log(error);
                }
                console.log(`propuestas corriendo en PUERTO : ${process.env.PORT}`);
                
            } )
        }

    }
}
