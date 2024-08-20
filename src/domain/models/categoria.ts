import Categoria from "../classes/Categoria";

export default interface IModelCategoria {
    buscarPorIdUsuario(idUsuario : number) : Promise<Categoria[]>;
    verLista(offset ?: number, limit ?: number) : Promise<Categoria[]>;
    guardarDatos( categoria : Categoria ) : Promise<Categoria>;
}