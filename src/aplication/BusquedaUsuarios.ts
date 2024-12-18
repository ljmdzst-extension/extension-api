import { domain } from "../domain";
import IValidatorUsuario from "../domain/validators/usuario";

export default class BusquedaUsuarios {
    public static async buscarPor( parametros : Partial< domain.TDataUsuario> , MUsuario : domain.IModelUsuario) : Promise<domain.Usuario[]>{
        let salida : domain.Usuario[] = [];

        salida = await MUsuario.buscarPor(parametros);

        return salida;
    }

    public static async buscarPorId( idUsuario : string,  MUsuario : domain.IModelUsuario, VUsuario : IValidatorUsuario ) : Promise<domain.Usuario | null> {

        let salida : domain.Usuario | null = null;

        if(VUsuario.validar({idUsuario})) {
           salida = await MUsuario.buscarPorId(idUsuario);
        } 

        return salida;

    }
} 