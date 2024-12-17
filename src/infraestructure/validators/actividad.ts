import { aplication } from "../../aplication"
import { domain } from "../../domain"

export default class VActividad implements aplication.IVActividad {
    validar(data: domain.TDataActividad): boolean {
        let salida = true;
        if( data.idActividad && (! this.validarIdActividad(data.idActividad)) ) salida = salida && false;
        if( data.motivoCancel && (!this.validarMotivoCancel(data.motivoCancel)) ) salida = salida && false;
        return salida;
    }
    validarIdActividad(idActividad ?: number): boolean {
        if(idActividad && idActividad > 0) {
            return true;
        }
        return false;
     }
    validarIdArea(idArea?: number): boolean {
        throw new Error("Method not implemented.")
    }
    validarNro(nro?: number): boolean {
        throw new Error("Method not implemented.")
    }
    validarDesc(desc ?: string): boolean {
        throw new Error("Method not implemented.")
    }
    validarIdUsuario(idUsuario ?: string): boolean {
        throw new Error("Method not implemented.")
    }
    validarFechaDesde(fechaDesde ?: string): boolean {
        throw new Error("Method not implemented.")
    }
    validarFechaHasta(fechaHasta ?: string): boolean {
        throw new Error("Method not implemented.")
    }
    validarMotivoCancel(motivoCancel ?: string): boolean {
        if (motivoCancel && motivoCancel.length > 0 && motivoCancel.length < 501){
            return true;
        }
        return false;
    }
}