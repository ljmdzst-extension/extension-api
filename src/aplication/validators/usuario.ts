import { TUsuario } from "../../domain/classes/ususario";

export default interface IValidatorUsuario {
    validar( data : Partial<TUsuario>) : boolean;
    validarEmail( email : string) : boolean;
    validarPass( pass : string) : boolean;
    validarIdUnidadAcademica( idUnidadAcademica : number) : boolean;
}