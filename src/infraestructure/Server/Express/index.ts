import dotenv from 'dotenv';

dotenv.config();

import express, { Express, request, response } from 'express';
import cors from 'cors';
import path from 'path';
import sequelizeExtension from '../../db/Mysql-Sequelize/config/dbConfig';
import RouterBases from './routes/bases';
import routerPrograma from './routes/programa';
import routerArea from './routes/area';
import routerActividad from './routes/actividad';
import routerAdmin from './routes/admin';

import usuarioRouter from './routes/usuario';

import routerGraficos from './routes/graficos';
import { informarPeticion } from './middlewares/bases';
import IServer from '../IServer';
import IRouter from './router/Router';
import { MiddlewareExtraerToken, MiddlewareValidarToken } from './middlewares/auth';
import { MiddlewareObtenerDataUsuario } from './middlewares/usuario';
import { domain } from '../../../domain';
import { aplication } from '../../../aplication';

export namespace ServerExpress {

    export class Server implements IServer {
        private app !: Express;
        private cRouters !: IRouter[];
        constructor(
            private rootPath : string,
            private MUsuario : domain.IModelUsuario,
            private VUsuario : aplication.IVUsuario,
        ){
            this.app = express(); 
            this.cRouters = [];
        }
        
        agregarRouter( router : IRouter ) {
            this.cRouters.push( router );
        }
      
        public verRootPath() { return this.rootPath}

        public iniciar() {
            this.app.use(cors());
        
            this.app.use(express.json());
        
            this.app.use(express.static(path.join(__dirname,'./public')));
        
            // login de cada request
            this.app.use(informarPeticion);
        
            this.app.use( `${this.rootPath}/usr`, usuarioRouter  );
            this.app.use( `${this.rootPath}/usr/bases`, RouterBases  ) ;
        
            this.app.use(
                `${this.rootPath}/metas`,
                new MiddlewareExtraerToken().usar(),
                new MiddlewareValidarToken().usar(),
                new MiddlewareObtenerDataUsuario(this.MUsuario,this.VUsuario).usar()
            );
        
            this.cRouters.forEach( router => router.usar(this) )
          
        
            this.app.use('*', async(req : typeof request , res : typeof response) => {
                res.sendFile(path.join(__dirname , './public/index.html'));
            });

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
