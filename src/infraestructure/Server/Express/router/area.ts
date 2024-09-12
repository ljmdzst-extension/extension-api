import { aplication } from "../../../../aplication";
import { domain } from "../../../../domain";
import { HttpHelpers } from "../helpers/general";
import { ERROR } from "../logs/errores";
import { MiddlewareValidarPermisoAccesoMetas } from "../middlewares/permisos";

import {ServerExpress} from "..";
import IRouter from "./Router";
import express,{Request,Response} from 'express'

export default class RouterArea implements IRouter {
    constructor(
        private basePath : string,
        private MArea : domain.IModelArea,
        private MActividad : domain.IModelActividad
    ){}
    async usar(server: ServerExpress.Server): Promise<void> {
        const router = express.Router();

        router.get( '/:anio', [new MiddlewareValidarPermisoAccesoMetas().usar()],  this.getArea());
        
        router.get('/resumen/:idArea/:anio/:offset/:limit/:keyword?',/** verResumenArea */);
 
        server.verApp().use(this.basePath,router);
    }

    private getArea( ) {
        return async (  req : Request, res: Response ) => {
            try {
                const {idArea , anio} = req.params; 

                const Area = await aplication.BusquedaAreas.verListaActividades(Number(idArea),Number(anio),this.MArea,this.MActividad);

                if(!Area) throw ERROR.AREA_INEXISTENTE;
                
                HttpHelpers.responderPeticionOk(res,Area.verDatos());
            
            } catch (error : any) {
                if(!error.status ){
                    console.log(error);
                }
                HttpHelpers.responderPeticionError(res,error.message,error.status);
            }

        }
    }

} 