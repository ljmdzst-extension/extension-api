import Programa, { TDataPrograma } from "../classes/Programa";

export interface IModelPrograma {

    buscarPor( parametros : Partial<TDataPrograma>) : Promise<Programa[]>;
    verLista( anio: number ) : Promise<Programa[]>;
    verListaConAreas(anio: number) : Promise<Programa[]>;
}