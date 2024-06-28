import sequelizeExtension, { BD } from "../config/dbConfig";
import { AreaProgramaCategoriaUsuario, AreaProgramaCategoriaUsuarioAttributes } from "../models/AreaProgramaCategoriaUsuario";
import { CategoriaUsuario } from "../models/CategoriaUsuario";
import { UsuarioAttributes, UsuarioId } from "../models/Usuario";

type TDataListaUsuarios  = UsuarioAttributes & {
    areas ?: AreaProgramaCategoriaUsuarioAttributes[],
    categoria ?:  string
}
export const verListaUsuarios = async() : Promise<TDataListaUsuarios[]>=>{
    const transaction = await sequelizeExtension.transaction( { logging : process.env.NODE_ENV === 'development' ? sql => console.log(sql) : undefined});
    let salida : TDataListaUsuarios[] = [];
    try {
        const categorias  = await BD.Categoria.findAll({transaction});
        const areas = await BD.Area.findAll({transaction});
        const programas = await BD.Programa.findAll({transaction});

        const categoriasUsuarios : Map<UsuarioId,CategoriaUsuario> = new Map();
        const areasCategUsuarios :  Map<UsuarioId,AreaProgramaCategoriaUsuario[]> = new Map();
        
        const usuarios = await BD.Usuario.findAll({transaction});

        await Promise.all( 
            usuarios.map( u => BD.CategoriaUsuario.findAll({where : {idUsuario : u.idUsuario} , transaction} )
                                                  .then( resp => { categoriasUsuarios.set(u.idUsuario,resp[0])}  )
            ) 
        );

        await Promise.all( 
            [...categoriasUsuarios.values()].map( 
                cu => BD.AreaProgramaCategoriaUsuario
                        .findAll({
                            where : {
                                idUsuario : cu.idUsuario,
                                idCategoria : cu.idCategoria
                            } , 
                            transaction
                        } )
                        .then( resp => {areasCategUsuarios.set(cu.idUsuario,resp)}  )
            ) 
        );
        
        await transaction.commit();

        salida = usuarios.map( u => ({
            ...u.dataValues,
            categoria : categorias.find( c => c.idCategoria === categoriasUsuarios.get(u.idUsuario)?.idCategoria)?.nombre,
            areas : areasCategUsuarios.get(u.idUsuario)?.map( cu => cu.dataValues)
        }))
        
        return salida;

    } catch (error) {
        await transaction.rollback();

        throw error;
    }
    
}