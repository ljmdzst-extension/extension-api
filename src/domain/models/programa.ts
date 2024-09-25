import Programa, { TDataPrograma } from "../classes/programa";
import IModel from "./model";

export interface IModelPrograma extends IModel<Programa,number> {
    verListaConAreas(anio: number) : Promise<Programa[]>;
}