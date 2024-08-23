import { aplication } from "../../../../aplication";
import { domain } from "../../../../domain";
import { HttpHelpers } from "../helpers/general";
import { MiddlewareDeterminarAreasHabilitadas, MiddlewareValidarPermisoAccesoMetas } from "../middlewares/permisos";
import { MiddlewareValidarAnio } from "../middlewares/programa";
import ServerExpress from "../server/ServerExpress";
import IRouter from "./Router";
import express,{Request,Response} from 'express'

export default class RouterProgramas implements IRouter {
    constructor(
        private basePath : string,
        private MProgramas : domain.IModelPrograma
    ){}
    async usar(server: ServerExpress): Promise<void> {
        const router = express.Router();

        router.get(
            '/:anio',
            [
                new MiddlewareValidarPermisoAccesoMetas().usar(),
                new MiddlewareDeterminarAreasHabilitadas().usar(),
                new MiddlewareValidarAnio().usar()
            ],
            this.getProgramas());

        server.express.use(this.basePath,router);
    }

    private getProgramas( ) {
        return async (  req : Request, res: Response ) => {
            try {
                
                const programas = await aplication.BusquedaProgramas.verListaConAreas(Number(req.params.anio),this.MProgramas);

                HttpHelpers.responderPeticionOk(res,programas.map( p => p.verDatos() ))
            
            } catch (error : any) {
                if(!error.status ){
                    console.log(error);
                }
                HttpHelpers.responderPeticionError(res,error.message,error.status);
            }

        }
    }

} 