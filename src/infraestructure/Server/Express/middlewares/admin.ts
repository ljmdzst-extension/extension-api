import { NextFunction,  response } from "express";
import { CategoriaAttributes } from "../../../models/init-models";
import { BD } from "../../../Mysql-Sequelize/config/dbConfig";
import { HttpHelpers } from "../helpers/general";



export const validarUsuarioAdmin =  async(req : any, resp : typeof response , next : NextFunction)=>{
    const { categorias }  = req.usuario;

    if( categorias.every( (c : CategoriaAttributes) => c.nombre !== 'ADMIN') ){
        resp.status(403).json({
            ok : false,
            error : 'No posee permisos de administrador'
        });
    } else {
        next();
    }
}

export const validarUsuarioRepetidoPorNroDoc = async(req : any, resp : typeof response , next : NextFunction)=>{

    const {persona} = req.body;

    if( persona && (await BD.Usuario.findOne({where : {nroDoc : persona.nroDoc}})) === null ) {
        next();
    } else {
        HttpHelpers.responderPeticionError(resp,'ya existe un usuario con ese dni',400);
    }

}