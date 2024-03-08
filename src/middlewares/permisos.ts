
import { response, NextFunction } from "express";
import { BD } from "../config/dbConfig";

export const validarPermisoGestionMetas = async( req : any, resp : typeof response, next : NextFunction)=>{
    try {
        const {idCategoria,categoria} = req.usuario;
    
        if(categoria === 'admin')  {
            
            next();
    
        } else {
    
            const permisosAsignados = await BD.PermisoCategoria.findAll({where : { idCategoria : idCategoria}});
    
            if(!permisosAsignados.length)  throw { status : 500 , message : 'la categoría del usuario no tiene permisos asignados'}
    
            const permisos = await BD.Permiso.findAll({where : { idPermiso : permisosAsignados.map(permisoAsignado => permisoAsignado.idPermiso)}});
    
            if( ! permisos.some( permiso => permiso.nombre === 'METAS_GESTION') ) throw { status : 403 , message : 'no posee permisos para realizar esta acción'}
    
            next();
    
        }
    
    } catch (error :  any) {
        let status = 500;
        let message = '';
        if(error.status) {
            status = error.status
        }
        if(error.message){
            message = error.message
        }
        if(status === 500) {
            console.log(`ERROR : ${req.method}-${req.path}-${message}`)
        }
        resp.status(status).json({
            ok : false,
            data : null,
            error : status === 500 ? 'error de servidor' : message
        })
    }
    
    
    
    }