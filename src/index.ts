import Server from './infraestructure/Server';
import RouterArea from './infraestructure/Server/Express/router/area';
import RouterProgramas from './infraestructure/Server/Express/router/programa';
import RouterUsuario from './infraestructure/Server/Express/router/usuario';

import {mysql} from './infraestructure/db/';
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


const server = new Server(  '/api/v1', new mysql.MUsuario(), new validators.VUsuario());
 
server.agregarRouter( 
    new RouterUsuario(
        `${server.verRootPath()}/usr`, 
        new mysql.MUsuario(),
        new mysql.MPersona(),
        new validators.VUsuario(),
        new validators.VPersona()
    ) 
);

server.agregarRouter( new RouterProgramas(`${server.verRootPath()}/metas/programa`,new mysql.MPrograma()) )
server.agregarRouter( new RouterArea(`${server.verRootPath()}/metas/area`,new mysql.MArea(),new mysql.MActividad()) )

server.iniciar();



