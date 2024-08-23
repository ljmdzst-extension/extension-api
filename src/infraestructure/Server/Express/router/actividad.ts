import express, { Request, Response } from "express";
import { HttpHelpers } from "../helpers/general";
import ServerExpress from "../server/ServerExpress";
import IRouter from "./Router";
import { aplication } from "../../../../aplication";
import { domain } from "../../../../domain";
import { MiddlewareValidarActividadExistente, MiddlewareValidarActividadSuspendida, MiddlewareValidarCamposActividad, MiddlewareValidarMotivoSuspension } from "../middlewares/actividad";
import { MiddlewareValidarPermisoAccesoMetas, MiddlewareValidarPermisoEdicionMetas } from "../middlewares/permisos";

export default class RouterActividad implements IRouter {

    constructor(
        private basePath : string,
        private MActividad : domain.IModelActividad,
        private VActividad : aplication.IVActividad
    ){}

    private getActividad(){
        return async (  req : Request, res: Response ) => {
            try {
                
                const {idActividad} = req.params;

                const iActividad = await aplication.BusquedaActividades.buscarPorId(Number(idActividad),this.MActividad,this.VActividad );

                if(!iActividad) throw { status : 400 , message : 'no se encontró actividad con ese id'}

                HttpHelpers.responderPeticionOk(res,iActividad.verDatos());
        
            } catch (error : any ) {
                
                HttpHelpers.responderPeticionError(res,error.status,error.message);
            }
        }
    }
    private postActividad(){
        return async (  req : Request, res: Response ) => {
            try {

                const data = req.body;
                
                const iActividad = await aplication.GestionDeActividades.altaActividad(data,this.MActividad,this.VActividad )

                HttpHelpers.responderPeticionOk(res,iActividad.verDatos());
        
        
            } catch (error : any ) {
                
                HttpHelpers.responderPeticionError(res,error.status,error.message);
            }
        }
    }
    private putActividad(){
        return async (  req : Request, res: Response ) => {
            try {
                const data = req.body;
                const iActividad = await aplication.GestionDeActividades.editarActividad(data,this.MActividad,this.VActividad);

                HttpHelpers.responderPeticionOk(res,iActividad.verDatos());
        
        
            } catch (error : any ) {
                
                HttpHelpers.responderPeticionError(res,error.status,error.message);
            }
        }
    }
    private putRestoreActividad(){
        return async (  req : Request, res: Response ) => {
            try {
                const {idActividad} = req.body; 
                const iActividad = await aplication.GestionDeActividades.editarActividad({idActividad : Number(idActividad) , motivoCancel : ''},this.MActividad,this.VActividad);
                
                HttpHelpers.responderPeticionOk(res,iActividad.verDatos());
        
        
            } catch (error : any ) {
                
                HttpHelpers.responderPeticionError(res,error.status,error.message);
            }
        }
    }
    private putCancelActividad(){
        return async (  req : Request, res: Response ) => {
            try {

                const {idActividad,motivoCancel} = req.body; 
                await aplication.GestionDeActividades.editarActividad({idActividad : Number(idActividad) , motivoCancel : motivoCancel},this.MActividad,this.VActividad);
                
                
                HttpHelpers.responderPeticionOk(res,true);
        
        
            } catch (error : any ) {
                
                HttpHelpers.responderPeticionError(res,error.status,error.message);
            }
        }
    }
    private deleteActividad(){
        return async (  req : Request, res: Response ) => {
            try {
                const {idActividad} = req.body;

                await aplication.GestionDeActividades.bajaActividad(Number(idActividad),this.MActividad,this.VActividad);
                
                HttpHelpers.responderPeticionOk(res,true);
        
        
            } catch (error : any ) {
                
                HttpHelpers.responderPeticionError(res,error.status,error.message);
            }
        }
    }

    public async usar(server: ServerExpress): Promise<void> {
        const router = express.Router();
        
        router.get(
            '/:idActividad',
            [
                new MiddlewareValidarPermisoAccesoMetas().usar(),
                new MiddlewareValidarCamposActividad(this.VActividad).usar()
            ],
            this.getActividad()
        );

        router.post(
            '/',
            [
                new MiddlewareValidarPermisoEdicionMetas().usar(),
                new MiddlewareValidarCamposActividad(this.VActividad).usar()
            ],
            this.postActividad()
        );

        router.put(
            '/',
            [
                new MiddlewareValidarPermisoEdicionMetas().usar(),
                new MiddlewareValidarActividadExistente(this.MActividad,this.VActividad).usar(),
                new MiddlewareValidarCamposActividad(this.VActividad).usar()
            ],
            this.putActividad()
        );

        router.put(
            '/restore',
            [
                new MiddlewareValidarPermisoEdicionMetas().usar(),
                new MiddlewareValidarActividadSuspendida(this.MActividad,this.VActividad).usar(),

            ],
            this.putRestoreActividad()
        );

        router.put(
            '/cancel',
            [
                new MiddlewareValidarPermisoEdicionMetas().usar(),
                new MiddlewareValidarActividadExistente(this.MActividad,this.VActividad).usar(),
                new MiddlewareValidarMotivoSuspension(this.VActividad).usar()
            ],
            this.putCancelActividad()
        );

        router.delete(
            '/',
            [
                new MiddlewareValidarPermisoEdicionMetas().usar(),
                new MiddlewareValidarActividadExistente(this.MActividad,this.VActividad).usar(),
            ],
            this.deleteActividad()
        );

        server.express.use(this.basePath,router);
    }

    

}