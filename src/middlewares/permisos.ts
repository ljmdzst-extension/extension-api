
import { response, NextFunction } from "express";
import { CategoriaAttributes } from "../models/Categoria";
import { PermisoAttributes } from "../models/Permiso";
import { HttpHelpers } from "../helpers/general";


export const determinarAreasHabilitadas = (req : any, resp : typeof response , next : NextFunction)=>{
    const {categorias}: {categorias : CategoriaAttributes[]} = req.usuario;

    const categoriasHabilitadas = ['ADMIN','EYC','GESTION_EYC','EYC_ECO_FINAN','PROG_EXT' ];
    
    const categEncontrada = categorias.find( c => categoriasHabilitadas.some( nombre => c.nombre !== nombre) ) ;

    if( ! categEncontrada  ) {

        HttpHelpers.responderPeticionError(resp,'Usuario no habilitado para acceder a planificaciones' ,403);
    }
    else {
        req.usuario.areas = categEncontrada.nombre === 'PROG_EXT' ? 'PROG_EXT' : 'TODAS';
       
        next();
    }

}   


export const validarPermisoAccesoMetas = async( req : any, resp : typeof response, next : NextFunction)=>{
    const {categorias, permisos}: {categorias : CategoriaAttributes[], permisos : PermisoAttributes[]} = req.usuario;
      
    if(  categorias.every( c => c.nombre !== 'ADMIN') && permisos.every( permiso => permiso.nombre !== 'METAS_LECTURA') )  {

        HttpHelpers.responderPeticionError(   resp,  'no posee permisos para acceder a planificaciones',  403  );
        
    } 
    else  {
       
        next();

    }
  
}

export const validarPermisoEdicionMetas = async( req : any, resp : typeof response, next : NextFunction)=>{
    const {categorias,permisos}: {categorias : CategoriaAttributes[], permisos : PermisoAttributes[]} = req.usuario;
    
    if( categorias.every( c => c.nombre !== 'ADMIN') && permisos.every( permiso => permiso.nombre !== 'METAS_EDICION') )  {
        
        HttpHelpers.responderPeticionError(  resp, 'no posee permisos para realizar esta acción', 403  );

    } 
    
    else {
        next();
    }

        
}