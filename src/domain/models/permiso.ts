import Permiso from "../classes/Permiso";

export default interface IModelPermiso {
    buscarPorIdUsuario(idUsuario : number) : Promise<Permiso[]>;
    verLista(offset ?: number, limit ?: number) : Promise<Permiso[]>;
    guardarDatos( categoria : Permiso ) : Promise<Permiso>;
}