import { aplication } from "../../aplication";
import { TDataPersona } from "../../domain/classes/persona";

export default class VPersona implements aplication.IVPersona {
    validar(data: TDataPersona): boolean {
        return true;
    }
    validarNroDoc(nroDoc: string): boolean {
        throw new Error("Method not implemented.");
    }
    validarTipoDoc(tipoDoc: string): boolean {
        throw new Error("Method not implemented.");
    }
    validarApe(ape: string): boolean {
        throw new Error("Method not implemented.");
    }
    validarNom(nom: string): boolean {
        throw new Error("Method not implemented.");
    }
    validarTel(tel: string): boolean {
        throw new Error("Method not implemented.");
    }
    validarDom(dom: string): boolean {
        throw new Error("Method not implemented.");
    }
    validarEmail(email: string): boolean {
        throw new Error("Method not implemented.");
    }
    validarCiudad(ciudad: string): boolean {
        throw new Error("Method not implemented.");
    }
    validarProvincia(provincia: string): boolean {
        throw new Error("Method not implemented.");
    }
    validarPais(pais: string): boolean {
        throw new Error("Method not implemented.");
    }
}