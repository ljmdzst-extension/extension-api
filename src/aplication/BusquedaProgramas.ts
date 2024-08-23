import { domain } from "../domain";

export default class BusquedaProgramas {

    static async buscarPor( parametros : domain.TDataPrograma, MPrograma : domain.IModelPrograma) : Promise<domain.Programa[]> {

        return await MPrograma.buscarPor(parametros);
    }

    static async verListaConAreas( anio : number ,MPrograma : domain.IModelPrograma ) : Promise<domain.Programa[]> {

        return await MPrograma.verListaConAreas(anio);

    } 
} 