

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


export const getUsuario = async(req : typeof request , resp : typeof response)=>{
   
    try {
        
        const { idUsuario } = req.params;
  
        const usuario = await SAdmin.verUsuario(idUsuario);

        HttpHelpers.responderPeticionOk(resp,usuario);

    } catch (error : any) {
        HttpHelpers.responderPeticionError(resp,error.message);
    }
}

export const postUsuario = async(req : any, resp : typeof response )=>{
    try {
        
        const usuario = await SAdmin.altaUsuario(req.body);

        HttpHelpers.responderPeticionOk(resp,usuario);
        
    } catch (error : any) {
        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}

export const putUsuario = async( req : any , resp : typeof response) => {
    try {
        const usuario = await SAdmin.editarUsuario(req.body);

        HttpHelpers.responderPeticionOk(resp,usuario);
        
    } catch (error : any) {
        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}