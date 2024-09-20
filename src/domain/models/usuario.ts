import Usuario, { TDataUsuario } from "../classes/Usuario"
import IModel from "./model";

export default interface IModelUsuario extends IModel<Usuario,string> {}