import jwt from 'jsonwebtoken';
import { Transaction } from "sequelize";
import { BD } from "../config/dbConfig";
import { INVALIDO } from "../logs/validaciones";
import { request, response, NextFunction } from "express";

export const validarIdArea = async(data : {idArea : string}, transaction ?: Transaction,transactionInsituciones ?: Transaction)=>{
    if(! await BD.Area.findByPk(data.idArea,{transaction}) ){
        throw INVALIDO.ID_AREA_ACT;
    }
}

export const validarPermisoGestionMetas = async( req : typeof request, resp : typeof response, next : NextFunction)=>{
try {
    const  token  = req.header('Authorization')?.split(' ')[1] ;

    if(!token) throw {status : 403, message : 'token inválido'}

    const { idUsuario }= jwt.verify(token,process.env.HASH_KEY || '' ) as jwt.JwtPayload;

    const iUsuario = await BD.Usuario.findByPk(idUsuario);
    
    if(!iUsuario) throw {status : 400 , message: 'no existe un usuario con ese id'}

    const categoria = await BD.Categoria.findByPk(iUsuario.idCategoria);

    if(!categoria) throw { status : 500 , message : 'usuario sin categoría'}

    const permisosAsociados = await BD.PermisoCategoria.findAll({where : {idCategoria : categoria.idCategoria}});

    const permisos = await BD.Permiso.findAll({where : {idPermiso : permisosAsociados.map(permAsoc => permAsoc.idPermiso)}})

    if( permisos.find( permiso => permiso.nombre === 'METAS_GESTION') ){
        next();
    } else {
        throw { status : 403 , message : 'no posee permisos para realizar esta acción'}
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
    resp.status(status).json({
        ok : false,
        data : null,
        error : message
    })
}



}