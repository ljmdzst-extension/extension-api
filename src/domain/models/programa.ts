import Programa, { TDataPrograma } from "../classes/Programa";
import IModel from "./model";

export interface IModelPrograma extends IModel<Programa,number> {
    verListaConAreas(anio: number) : Promise<Programa[]>;
}