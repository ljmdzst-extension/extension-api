
import IServer from '../IServer';
import IRouter from './router/Router';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

import sequelizeExtension from '../../db/Mysql-Sequelize/config/dbConfig';
import { MiddlewareInformarPeticion } from './middlewares/bases';
import { MiddlewareExtraerToken, MiddlewareValidarToken } from './middlewares/auth';
import { MiddlewareObtenerDataUsuario } from './middlewares/usuario';
import { domain } from '../../../domain';
import { aplication } from '../../../aplication';
import { MiddlewareValidarPermisoAccesoMetas } from './middlewares/permisos';

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
        public verApp() { return this.app;}
        public verRootPath() { return this.rootPath}

        public iniciar() {
            this.app.use(cors());
        
            this.app.use(express.json());
        
            this.app.use(express.static(path.join(__dirname,'./public')));
        
            // login de cada request
            this.app.use('/',new MiddlewareInformarPeticion().usar());

            const midExtraerToken = new MiddlewareExtraerToken().usar();
            const midValidarToken = new MiddlewareValidarToken().usar();
            const midObtenerDataUsuario = new MiddlewareObtenerDataUsuario(this.MUsuario,this.VUsuario).usar();
            const midValidarAccesoAMetas = new MiddlewareValidarPermisoAccesoMetas().usar();
            
            this.app.use( `${this.rootPath}/metas`, midExtraerToken,midValidarToken,midObtenerDataUsuario,midValidarAccesoAMetas  );
            
            // carga de routers agregados 
            this.cRouters.forEach( router => router.usar(this) )
          
            // para cualquier ruta no manejada anteriormente 
            this.app.use('*', async(req : Request, res : Response) => {
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
