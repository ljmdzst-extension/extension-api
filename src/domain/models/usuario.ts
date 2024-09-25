import Usuario, { TDataUsuario } from "../classes/usuario"
import IModel from "./model";

export default interface IModelUsuario extends IModel<Usuario,string> {}