import Programa, { IPrograma } from "../../../../domain/classes/Programa";
import sequelizeExtension from "../config/dbConfig";



export const verListaProgramasConAreas = async( usuario : any, anio : number )=>{
    const t = await sequelizeExtension.transaction({ logging : process.env.NODE_ENV === 'development' ? sql => console.log(sql) : undefined})
    try {
        let salida  : IPrograma[] = [];
        let listaProgramas : Programa[] = []; 

        if(usuario.areas === 'TODAS') {
            listaProgramas = await Programa.verTodosConAreas( anio);
        }

        if(usuario.areas === 'PROG_EXT') {
            listaProgramas = await Programa.verHabilitadosConAreas(anio , usuario.usuario.idUsuario, usuario.categorias[0].idCategoria,t  );
        }
    
        if(listaProgramas.length) {
            salida = listaProgramas.map( prog => prog.verDatos());
        }
        await t.commit();
        return salida;
    } catch (error) {
        await t.rollback();
        throw error;
    }
    
}