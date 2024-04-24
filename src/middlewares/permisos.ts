
import { response, NextFunction } from "express";
import { BD } from "../config/dbConfig";
import { CategoriaAttributes } from "../models/Categoria";

export const validarPermisoAccesoMetas = async( req : any, resp : typeof response, next : NextFunction)=>{
    try {
        const {categorias}: {categorias : CategoriaAttributes[]} = req.usuario;
    
        if(categorias.some( c => c.nombre === 'ADMIN'))  {
            
            next();
    
        } else {
            const permisosAsignados = await BD.PermisoCategoria.findAll({where : { idCategoria : categorias.map(c => c.idCategoria) }});
    
            if(!permisosAsignados.length)  throw { status : 500 , message : 'el usuario no tiene permisos asignados'}
    
            const permisos = await BD.Permiso.findAll({where : { idPermiso : permisosAsignados.map(permisoAsignado => permisoAsignado.idPermiso)}});
    
            if( ! permisos.some( permiso => permiso.nombre === 'METAS_LECTURA') ) throw { status : 403 , message : 'no posee permisos para realizar esta acción'}
    
            next();
    
        }
    
    } catch (error :  any) {
        if(error.status === 500) {
            console.log(`ERROR : ${req.method}-${req.path}-${error.message}`)
        }
        resp.status(error.status || 500).json({
            ok : false,
            data : null,
            error : !error.status  ? 'error de servidor' : error.message
        })
    }
    
    
    
    }

export const validarPermisoEdicionMetas = async( req : any, resp : typeof response, next : NextFunction)=>{
        try {
            const {categorias}: {categorias : CategoriaAttributes[]} = req.usuario;
        
            if(categorias.some( c => c.nombre === 'ADMIN'))  {
                
                next();
        
            } else {
                const permisosAsignados = await BD.PermisoCategoria.findAll({where : { idCategoria : categorias.map(c => c.idCategoria) }});
        
                if(!permisosAsignados.length)  throw { status : 500 , message : 'el usuario no tiene permisos asignados'}
        
                const permisos = await BD.Permiso.findAll({where : { idPermiso : permisosAsignados.map(permisoAsignado => permisoAsignado.idPermiso)}});
        
                if( ! permisos.some( permiso => permiso.nombre === 'METAS_EDICION') ) throw { status : 403 , message : 'no posee permisos para realizar esta acción'}
        
                next();
        
            }
        
        } catch (error :  any) {
          
            if(error.status === 500) {
                console.log(`ERROR : ${req.method}-${req.path}-${error.message}`)
            }
            resp.status(error.status || 500).json({
                ok : false,
                data : null,
                error : !error.status  ? 'error de servidor' : error.message
            })
        }
        
        
        
        }