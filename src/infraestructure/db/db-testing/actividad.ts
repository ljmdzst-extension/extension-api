import { domain } from "../../../domain"
import Actividad from "../../../domain/classes/Actividad";

export default class MActividad implements domain.IModelActividad {
    buscarPorArea(idArea: number): Promise<Actividad[]> {
        throw new Error("Method not implemented.");
    }
    async buscarPorId(idActividad: number): Promise<domain.Actividad | null> {
        throw new Error("Method not implemented.");
    }
    async buscarPor(parametros: domain.TDataActividad): Promise<domain.Actividad[]> {
        throw new Error("Method not implemented.");
    }
    async verLista(offset?: number, limit?: number): Promise<domain.Actividad[]> {
        throw new Error("Method not implemented.");
    }
    async guardarDatos(actividad: domain.Actividad): Promise<domain.Actividad> {
        throw new Error("Method not implemented.");
    }
    async darDeBaja(idActividad: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}