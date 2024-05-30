
import { response, NextFunction } from "express";
import { CategoriaAttributes } from "../models/Categoria";
import { PermisoAttributes } from "../models/Permiso";
import { HttpHelpers } from "../helpers/general";


export const determinarAreasHabilitadas = (req : any, resp : typeof response , next : NextFunction)=>{
    const {categorias}: {categorias : CategoriaAttributes[]} = req.usuario;
   
    if( categorias.some( c => ['ADMIN','EYC','GESTION_EYC','EYC_ECO_FINAN' ].some( nombre => c.nombre === nombre) )) {
        req.usuario.areas = 'TODAS';
        next();
    }
    else if(categorias.some(c => c.nombre === 'PROG_EXT')){
        req.usuario.areas = 'PROG_EXT';
        next();
    }
    else {
        
        HttpHelpers.responderPeticionError(resp,'Usuario no habilitado para acceder a planificaciones' ,403);
    }
   
}   


export const validarPermisoAccesoMetas = async( req : any, resp : typeof response, next : NextFunction)=>{
    try {
        const {categorias, permisos}: {categorias : CategoriaAttributes[], permisos : PermisoAttributes[]} = req.usuario;
      
        if(categorias.some( c => c.nombre === 'ADMIN'))  {
                
            next();
    
        } 
        else if(  ( permisos.length > 0 )  && permisos.some( permiso => permiso.nombre === 'METAS_LECTURA') ) {
           
       
            next();
    
        }
        else throw { status : 403 , message : 'no posee permisos para acceder a planificaciones'}
    
    } catch (error :  any) {
        if(error.status === 500) {
            console.log(`ERROR : ${req.method}-${req.path}-${error.message}`)
        }
        HttpHelpers.responderPeticionError(resp,error.message,error.status);
    }
    
    
    
    }

export const validarPermisoEdicionMetas = async( req : any, resp : typeof response, next : NextFunction)=>{
    try {
        const {categorias,permisos}: {categorias : CategoriaAttributes[], permisos : PermisoAttributes[]} = req.usuario;
    
        if(categorias.some( c => c.nombre === 'ADMIN'))  {
            
            next();
    
        } 
        
        else if( permisos.length > 0 && permisos.some( permiso => permiso.nombre === 'METAS_EDICION') )  {
            
            next();
    
        }

        else  throw { status : 403 , message : 'no posee permisos para realizar esta acción'}
       
    } catch (error :  any) {
        
        if(error.status === 500) {
            console.log(`ERROR : ${req.method}-${req.path}-${error.message}`)
        }
         HttpHelpers.responderPeticionError(resp,error.message,error.status);
    }
        
}