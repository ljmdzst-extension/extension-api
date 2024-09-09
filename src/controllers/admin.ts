

import { request, response } from "express";
import * as SAdmin from '../services/admin';
import { HttpHelpers } from "../helpers/general";


export const getUsuarios = async(req : typeof request , resp : typeof response)=>{
   
    try {
        
  
        const usuarios = await SAdmin.verListaUsuarios();
 
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
        HttpHelpers.responderPeticionError(resp,error.message,error.status);
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

export const deleteUsuario = async( req : any , resp : typeof response) => {
    try {
        await SAdmin.bajaUsuario( req.params.idUsuario );
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {
        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}


export const getCategorias = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}
export const getCategoria = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}
export const postCategoria = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}
export const putCategoria = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}
export const deleteCategoria = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}


export const getPermisos = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}
export const getPermiso = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}
export const postPermiso = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}
export const putPermiso = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}
export const deletePermiso = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}

export const getAreas = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}
export const getArea = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}
export const postArea = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}
export const putArea = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}
export const deleteArea = async( req : any, resp : typeof response)=>{
    try {
        
        HttpHelpers.responderPeticionOk(resp,true);
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.message,error.status)
    }
}