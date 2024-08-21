import  { Request, Response } from "express";
import { HttpHelpers } from "../helpers/general";
import ServerExpress from "../server/ServerExpress";
import IRouter from "./Router";
import { aplication } from "../../../../aplication";

export default class RouterActividad implements IRouter {
    public async usar(server: ServerExpress): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private getActividad(){
        return async (  req : Request, res: Response ) => {
            try {
                
                const {idActividad} = req.params;

                const iActividad = await aplication.BusquedaActividades.buscarPorId(idActividad, new )

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
                
                const iActividad = await aplication.GestionDeActividades.altaActividad(data,)

                HttpHelpers.responderPeticionOk(res,iActividad.verDatos());
        
        
            } catch (error : any ) {
                
                HttpHelpers.responderPeticionError(res,error.status,error.message);
            }
        }
    }
    private putActividad(){
        return async (  req : Request, res: Response ) => {
            try {
                
                HttpHelpers.responderPeticionOk(res,persona?.verDatos());
        
        
            } catch (error : any ) {
                
                HttpHelpers.responderPeticionError(res,error.status,error.message);
            }
        }
    }
    private putRestoreActividad(){
        return async (  req : Request, res: Response ) => {
            try {
                
                HttpHelpers.responderPeticionOk(res,persona?.verDatos());
        
        
            } catch (error : any ) {
                
                HttpHelpers.responderPeticionError(res,error.status,error.message);
            }
        }
    }
    private putCancelActividad(){
        return async (  req : Request, res: Response ) => {
            try {
                
                HttpHelpers.responderPeticionOk(res,persona?.verDatos());
        
        
            } catch (error : any ) {
                
                HttpHelpers.responderPeticionError(res,error.status,error.message);
            }
        }
    }
    private deleteActividad(){
        return async (  req : Request, res: Response ) => {
            try {
                
                HttpHelpers.responderPeticionOk(res,persona?.verDatos());
        
        
            } catch (error : any ) {
                
                HttpHelpers.responderPeticionError(res,error.status,error.message);
            }
        }
    }
}