

import { aplication } from "../../aplication";
import { domain } from "../../domain";

export default class VUsuario implements aplication.IVUsuario {
    validar(data: domain.TDataUsuario): boolean {
       let salida = false;
       if(data.email ) salida = this.validarEmail(data.email);
       if(data.idUsuario) salida= this.validarIdUsuario(data.idUsuario);
       return salida;
    }
    validarIdUsuario(idUsuario : string) {
        return idUsuario.length > 0;
    }
    validarEmail(email: string): boolean {
        return email.length > 0;
    }
    validarPass(pass: string): boolean {
        return pass.length >= 6;
    }
    validarIdUnidadAcademica(idUnidadAcademica: number): boolean {
        return true;
    }
}