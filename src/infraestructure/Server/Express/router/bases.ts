import express, {  Response } from "express";
import { HttpHelpers } from "../helpers/general";

import { ServerExpress } from "..";
import IRouter from "./Router";

import { aplication } from "../../../../aplication";
import { domain } from "../../../../domain";

export default class RouterBases implements IRouter {

    constructor(
        private basePath : string,
        private MBases : domain.IModelBases
    ){}

    private  getBases () {
        return async (  req : any, res: Response ) => {
            try {
                const bases = await aplication.GestionDeBases.mostrarBases(this.MBases);
                
                HttpHelpers.responderPeticionOk(res,bases);
        
            } catch (error : any ) {
                
                HttpHelpers.responderPeticionError(res,error.message,error.status);
            }
        }
    }  
    private async getInstituciones(  req : any, res: Response ) {
        try {

     
            HttpHelpers.responderPeticionOk(res,{});
    
    
        } catch (error : any ) {
            
            HttpHelpers.responderPeticionError(res,error.status,error.message);
        }
    }

    public async usar(server: ServerExpress.Server): Promise<void> {
        const router = express.Router();

        router.get( '/',[ ], this.getBases()   );

        router.get( '/instituciones',[  ],this.getInstituciones   );

        router.get( '/instituciones/:query/:offset/:limit',[  ], this.getInstituciones);

     
        server.verApp().use(this.basePath,router);
    }


}