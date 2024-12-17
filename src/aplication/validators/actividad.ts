import { domain } from "../../domain";

export default interface IValidatorActividad {
    validar( data : Partial<domain.TDataActividad>) : boolean;
    validarIdActividad( idActividad : number) : boolean;
    validarIdArea( idArea : number) : boolean;
    validarNro( nro : number) : boolean;
    validarDesc( desc : string) : boolean;
    validarIdUsuario( idUsuario : string) : boolean;
    validarFechaDesde( fechaDesde : string) : boolean;
    validarFechaHasta( fechaHasta : string) : boolean;
    validarMotivoCancel( motivoCancel : string) : boolean;

}