import { BD } from "../config/dbConfig";
import { ColaDeTareas } from "../helpers/tareas";
import * as SUsuario from './usuario';

export const verListaUsuarios = async() => {
   
    
    try {
        let salida : any = [];
        
        const usuarios = await BD.Usuario.findAll();
        
        const tareas = new ColaDeTareas();

        usuarios.forEach( u => tareas.push( ()=> SUsuario.obtenerDataUsuario(u.idUsuario,u.email).then( data => salida.push(data)) ) )
        
        await tareas.resolverSinDelay();

        return salida;

    } catch (error) {
       

        throw error;
    }
    
}