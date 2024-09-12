import dotenv from 'dotenv';

dotenv.config();

import Server from './infraestructure/server';
import RouterArea from './infraestructure/server/Express/router/area';
import RouterProgramas from './infraestructure/server/Express/router/programa';
import RouterUsuario from './infraestructure/server/Express/router/usuario';

import {mysql} from './infraestructure/db/';
import sequelizeExtension from './infraestructure/db/Mysql-Sequelize/config/dbConfig';
import { validators } from './infraestructure/validators';


// this.app.use(`${BASE_PATH_METAS}/programas`,routerPrograma);
// this.app.use(`${BASE_PATH_METAS}/areas`,routerArea);
// this.app.use(`${BASE_PATH_METAS}/bases`,RouterBases);
// this.app.use(`${BASE_PATH_METAS}/actividad`,routerActividad);
// this.app.use(`${BASE_PATH_METAS}/graficos`,routerGraficos);

// this.app.use(`${BASE_PATH_METAS}/admin`,routerAdmin);

// // propuestas
        
// const BASE_PATH_PROPUESTAS=`${BASE_PATH}/prop`

// this.app.use(BASE_PATH_PROPUESTAS,extraerToken,validarToken,obtenerDataUsuario);

// this.app.use(`${BASE_PATH_PROPUESTAS}/`,RouterPropuestas);
// this.app.use(`${BASE_PATH_PROPUESTAS}/propuesta`,RouterPropuesta);
// this.app.use(`${BASE_PATH_PROPUESTAS}/evaluacion`,RouterEvaluacion);
// this.app.use(`${BASE_PATH_PROPUESTAS}/evaluaciones`,RouterEvaluaciones);
// this.app.use(`${BASE_PATH_PROPUESTAS}/persona`,RouterPersonas);
// this.app.use(`${BASE_PATH_PROPUESTAS}/integrantes`,RouterIntegrates);
// this.app.use(`${BASE_PATH_PROPUESTAS}/bases`,RouterBases);
// this.app.use(`${BASE_PATH_PROPUESTAS}/instituciones`,RouterInstituciones);
// this.app.use(`${BASE_PATH_PROPUESTAS}/planificacion`,RouterPlanificacion);

const mUsuario =  new mysql.MUsuario();
const mPersona = new mysql.MPersona();
const mPrograma = new mysql.MPrograma();
const mActividad = new mysql.MActividad();
const mArea = new mysql.MArea();
const vUsuario =  new validators.VUsuario();
const vPersona = new validators.VPersona();

const server = new Server(  '/api/v2', mUsuario, vUsuario );

server.agregarRouter(  new RouterUsuario( `${server.verRootPath()}/usr`,mUsuario,mPersona,vUsuario,vPersona  ));

server.agregarRouter( new RouterProgramas(`${server.verRootPath()}/metas/programa`,mPrograma) );
server.agregarRouter( new RouterArea(`${server.verRootPath()}/metas/area`,mArea,mActividad) );

server.iniciar();



