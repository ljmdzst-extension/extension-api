import express, { Request, Response } from "express";
import { HttpHelpers } from "../helpers/general";

import { ServerExpress } from "..";
import IRouter from "./Router";

import { aplication } from "../../../../aplication";
import { domain } from "../../../../domain";

export default class RouterBases implements IRouter {

    constructor(
        private basePath : string,
        private MActividad : domain.IModelActividad,
        private MArea : domain.IModelArea,
        private MUsuario : domain.IModelUsuario,
        private VActividad : aplication.IVActividad
    ){}

    
    public async usar(server: ServerExpress.Server): Promise<void> {
        const router = express.Router();
        
        router.get(    '/',    [],    this.getBases   );

        router.get(
            '/instituciones',  [  ],    this.getInstituciones   );

        router.get(
            '/instituciones/:query/:offset/:limit',    [  ],      this.getInstituciones
        );

     
        server.verApp().use(this.basePath,router);
    }

    

    private async getBases  (  req : Request, res: Response ) {
        try {
            
         
            HttpHelpers.responderPeticionOk(res,{});
    
        } catch (error : any ) {
            
            HttpHelpers.responderPeticionError(res,error.status,error.message);
        }
    }
    private async getInstituciones(  req : Request, res: Response ) {
        try {

            const data = req.body;
            
            const iActividad = await aplication.GestionDeActividades.altaActividad(data,this.MActividad,this.MArea,this.MUsuario,this.VActividad )

            HttpHelpers.responderPeticionOk(res,iActividad.verDatos());
    
    
        } catch (error : any ) {
            
            HttpHelpers.responderPeticionError(res,error.status,error.message);
        }
    }



}