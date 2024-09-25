import { domain } from "../../../domain"
import Usuario, { TDataUsuario } from "../../../domain/classes/usuario";

export default class MUsuario implements domain.IModelUsuario {
    buscarPorId(idUsuario: string): Promise<Usuario | null> {
        throw new Error("Method not implemented.");
    }
    buscarPor(parametros: Partial<TDataUsuario>): Promise<Usuario []> {
        throw new Error("Method not implemented.");
    }
    verLista(offset?: number, limit?: number): Promise<Usuario[]> {
        throw new Error("Method not implemented.");
    }
    guardarDatos(usuario: Usuario): Promise<Usuario> {
        throw new Error("Method not implemented.");
    }
    darDeBaja(usuario: Usuario): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}