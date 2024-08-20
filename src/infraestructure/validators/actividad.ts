import { aplication } from "../../aplication"
import { domain } from "../../domain"
import { TDataActividad } from "../../domain/classes/Actividad"

export default class VActividad implements aplication.IVActividad {
    validar(data: TDataActividad): boolean {
        throw new Error("Method not implemented.")
    }
    validarIdActividad(idActividad: number): boolean {
        throw new Error("Method not implemented.")
    }
    validarIdArea(idArea: number): boolean {
        throw new Error("Method not implemented.")
    }
    validarNro(nro: number): boolean {
        throw new Error("Method not implemented.")
    }
    validarDesc(desc: string): boolean {
        throw new Error("Method not implemented.")
    }
    validarIdUsuario(idUsuario: string): boolean {
        throw new Error("Method not implemented.")
    }
    validarFechaDesde(fechaDesde: string): boolean {
        throw new Error("Method not implemented.")
    }
    validarFechaHasta(fechaHasta: string): boolean {
        throw new Error("Method not implemented.")
    }
    validarMotivoCancel(motivoCancel: string): boolean {
        throw new Error("Method not implemented.")
    }
}