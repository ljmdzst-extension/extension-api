import sequelizeExtension, { BD } from "../config/dbConfig";
import { Usuario } from "../models/Usuario";

import * as baseHelpers from '../helpers/bases';

export const obtenerDataUsuario = async( idUsuario ?: string, email ?: string)=>{
    const transaction = await sequelizeExtension.transaction({ logging : process.env.NODE_ENV === 'development' ? sql => console.log(sql) : undefined});
    try {
    
    let iUsuario : Usuario | null= null;

    if(email){

        iUsuario = await BD.Usuario.findOne({where : {email : email}, transaction});
    }
    
    else if(idUsuario){

        iUsuario = await BD.Usuario.findByPk(idUsuario, {transaction});
    } 
 
    if(!iUsuario) throw {status : 400 , message: 'no existe un usuario con ese id o ese email'}
    

    const persona = await BD.Persona.findByPk(iUsuario.nroDoc,{transaction});

    if(!persona) throw {status : 400 , message: 'no exite persona con ese nroDoc'}
    

    const lCategoriasUsuario = await BD.CategoriaUsuario.findAll({where : {idUsuario : iUsuario.idUsuario}, transaction});
    
    if(!lCategoriasUsuario) throw { status : 500 , message : 'usuario sin categoría'}

    const categorias = await BD.Categoria.findAll({where : {idCategoria : lCategoriasUsuario.map( cu => cu.idCategoria)} , transaction});

    const permisosUsuario = await BD.PermisoUsuario.findAll({where : {idUsuario : iUsuario.idUsuario},transaction});

    const permisos = await BD.Permiso.findAll({where : { idPermiso : permisosUsuario.map( pc => pc.idPermiso) } , transaction});
    
    const areasHabilitadas = await BD.AreaProgramaUsuario.findAll({ where : {idUsuario : iUsuario.idUsuario },  transaction  });
    
    const programas = await BD.Programa.findAll({ 
        where : {
            idPrograma : areasHabilitadas.map( ah => ah.idPrograma)
        },
        transaction
    })
    
    const areas = await BD.Area.findAll({
        where : {
            idArea : [...new Set([...areasHabilitadas.map( ah => ah.idArea)]).values()]
        },
        transaction
        
    });
    
    await transaction.commit();

    return  {
        persona : persona.dataValues,
        usuario : iUsuario.dataValues,
        categorias : categorias.map( c => c.dataValues),
        permisos : permisos.map( p => p.dataValues),
        areas : baseHelpers.mapearAnioProgramasAreas( programas,areas,areasHabilitadas )
        }
    
    } catch (error) {
        await transaction.rollback();
        throw error;
    }

    
}   