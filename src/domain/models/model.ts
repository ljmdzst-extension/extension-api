export default interface IModel<T,PK> {
    findByPk( pk : PK ) : Promise<T | null>;
    findAll() : Promise<Array<T>>;
    findOne( params : any ) : Promise<T | null>;
    findBy( params : any,offset?: number, limit?: number) : Promise<Array<T>>;
    save( i : T ) : Promise<T>;
    destroy( i : T ) : Promise<boolean>;
    update( i : T ) : Promise<T>;

} 