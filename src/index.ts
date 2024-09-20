import dotenv from 'dotenv';

dotenv.config();

import Server from './infraestructure/server';
import RouterArea from './infraestructure/server/express/router/area';
import RouterProgramas from './infraestructure/server/express/router/programa';
import RouterUsuario from './infraestructure/server/express/router/usuario';
import RouterBases from './infraestructure/server/express/router/bases';

import {mysql} from './infraestructure/db/';

import { validators } from './infraestructure/validators';
import RouterActividad from './infraestructure/server/express/router/actividad';


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
const mBases = new mysql.MBases();
const vUsuario =  new validators.VUsuario();
const vPersona = new validators.VPersona();
const vActividad = new validators.VActividad();
const BASE_PATH= '/api/v2';

const server = new Server( BASE_PATH , mUsuario, vUsuario );



server.agregarRouter( new RouterUsuario( `${BASE_PATH}/usr`,mUsuario,mPersona,vUsuario,vPersona  ));

const BASE_PATH_METAS = `${BASE_PATH}/metas`;

server.agregarRouter( new RouterActividad(`${BASE_PATH_METAS}/actividad`, mActividad,mArea,mUsuario,vActividad));
server.agregarRouter( new RouterBases(`${BASE_PATH_METAS}/bases`, mBases )  );
server.agregarRouter( new RouterProgramas(`${BASE_PATH_METAS}/programa`,mPrograma) );
server.agregarRouter( new RouterArea(`${BASE_PATH_METAS}/area`,mArea,mActividad) );

server.iniciar();



