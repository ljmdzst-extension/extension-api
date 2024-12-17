export default interface IModel<T,PK> {
    buscarPorId( pk : PK) : Promise<T | null>;
    buscarPor( params : any , offset ?: number , limit ?: number ) : Promise<Array<T>>;
    guardarDatos( t : T ) : Promise<T>;
    darDeBaja( t : T) : Promise<boolean>;
    editar( t : T ) : Promise< T >;

} 