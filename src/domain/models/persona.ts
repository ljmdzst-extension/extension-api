import Persona, { TPersona } from "../classes/persona";
import IModel from "./model";

export default interface IModelPersona extends IModel<Persona,string> {
    buscarPorNroDoc( nroDoc : string) : Promise<Persona>;
}