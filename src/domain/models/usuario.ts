import Usuario, { TDataUsuario } from "../classes/Usuario"

export default interface IModelUsuario {
    buscarPorId( idUsuario : string) : Promise<Usuario | null>;
    buscarPor( parametros : Partial<TDataUsuario> ) : Promise<Usuario | null>;
    verLista(  parametros ?: Partial<TDataUsuario>, offset ?: number, limit ?: number ) : Promise<Usuario | null>;
    guardarDatos( usuario : Usuario ) : Promise<Usuario>;
    darDeBaja( usuario : Usuario ) : Promise<boolean>;
}