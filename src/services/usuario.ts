import sequelizeExtension, { BD } from "../config/dbConfig";
import { Usuario } from "../models/Usuario";

import * as baseHelpers from '../helpers/bases';

export const obtenerDataUsuario = async( idUsuario ?: string, email ?: string)=>{
    const transaction = await sequelizeExtension.transaction({ logging : process.env.NODE_ENV === 'development' ? sql => console.log(sql) : undefined});
    let iUsuario : Usuario | null= null;

    if(email){

        iUsuario = await BD.Usuario.findOne({where : {email : email}, transaction});
    }

    if(idUsuario){

        iUsuario = await BD.Usuario.findByPk(idUsuario, {transaction});
    } 

    if(!iUsuario) throw {status : 400 , message: 'no existe un usuario con ese id'}
    
    const lCategoriasUsuario = await BD.CategoriaUsuario.findAll({where : {idUsuario : iUsuario.idUsuario}, transaction});
    
    if(!lCategoriasUsuario) throw { status : 500 , message : 'usuario sin categoría'}

    const categorias = await BD.Categoria.findAll({where : {idCategoria : lCategoriasUsuario.map( cu => cu.idCategoria)} , transaction});
    
    const permisosCategorias = await BD.PermisoCategoria.findAll({ where : {idCategoria : lCategoriasUsuario.map(cu => cu.idCategoria)} , transaction});
    
    if(permisosCategorias.length < 1) throw { status : 403 , message : 'usuario sin permisos asignados'}
    
    const permisos = await BD.Permiso.findAll({where : { idPermiso : permisosCategorias.map( pc => pc.idPermiso) } , transaction});
    
    const areasHabilitadas = await BD.AreaProgramaCategoriaUsuario.findAll({
        where : {
            idUsuario : iUsuario.idUsuario,
            idCategoria : categorias.map(c => c.idCategoria)
        },
        transaction
    });
    
    const programas = await BD.Programa.findAll({ 
        where : {
            idPrograma : areasHabilitadas.map( ah => ah.idPrograma)
        },
        transaction
    })
    
    const areas = await BD.Area.findAll({
        where : {
            idArea : areasHabilitadas.map( ah => ah.idArea)
        },
        transaction
    });
    

    try {
        
        await transaction.commit();
    
    
    } catch (error) {
        await transaction.rollback();
        throw error;
    }

    return  {
        usuario : iUsuario.dataValues,
        categorias : categorias.map( c => c.dataValues),
        areas : baseHelpers.mapearAnioProgramasAreas( programas,areas,areasHabilitadas ),
        permisos : permisos.map( p => p.dataValues)
    }
}   