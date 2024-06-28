

import { request, response } from "express";
import * as SAdmin from '../services/admin';
import { HttpHelpers } from "../helpers/general";


export const getUsuarios = async(req : typeof request , resp : typeof response)=>{
   
    try {
        
  
        const usuarios = await SAdmin.verListaUsuarios();
        console.log(usuarios.length);
        HttpHelpers.responderPeticionOk(resp,usuarios);

    } catch (error : any) {
        HttpHelpers.responderPeticionError(resp,error.message);
    }
}