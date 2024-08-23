import Area from "../classes/Area";

export default interface IModelArea {

    buscarPorId( idArea : number ) : Promise<Area | null>;
    
}