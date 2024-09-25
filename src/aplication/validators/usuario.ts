import { TDataUsuario } from "../../domain/classes/usuario";

export default interface IValidatorUsuario {
    validar( data : Partial<TDataUsuario>) : boolean;
    validarEmail( email : string) : boolean;
    validarPass( pass : string) : boolean;
    validarIdUnidadAcademica( idUnidadAcademica : number) : boolean;
}