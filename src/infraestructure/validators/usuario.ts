import { aplication } from "../../aplication";
import { TDataUsuario } from "../../domain/classes/Usuario";

export default class VUsuario implements aplication.IVUsuario {
    validar(data: TDataUsuario): boolean {
        throw new Error("Method not implemented.");
    }
    validarEmail(email: string): boolean {
        throw new Error("Method not implemented.");
    }
    validarPass(pass: string): boolean {
        throw new Error("Method not implemented.");
    }
    validarIdUnidadAcademica(idUnidadAcademica: number): boolean {
        throw new Error("Method not implemented.");
    }
}