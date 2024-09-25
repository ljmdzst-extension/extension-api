import { TDataPersona } from "../../domain/classes/persona";

export default interface IValidatorPersona {
    validar(data : TDataPersona) : boolean;
    validarNroDoc( nroDoc : string) : boolean;
    validarTipoDoc( tipoDoc  : string) : boolean;
    validarApe( ape  : string) : boolean;
    validarNom( nom  : string) : boolean;
    validarTel( tel  : string) : boolean;
    validarDom( dom  : string) : boolean;
    validarEmail( email  : string) : boolean;
    validarCiudad( ciudad  : string) : boolean;
    validarProvincia( provincia  : string) : boolean;
    validarPais( pais  : string) : boolean;
}