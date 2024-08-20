import { TDataUsuario } from "../../domain/classes/Usuario";

export default interface IValidatorUsuario {
    validar( data : TDataUsuario) : boolean;
    validarEmail( email : string) : boolean;
    validarPass( pass : string) : boolean;
    validarIdUnidadAcademica( idUnidadAcademica : number) : boolean;
}