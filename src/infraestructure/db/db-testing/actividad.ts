import { domain } from "../../../domain"
import Actividad, { ID_ACT, TDataActividad } from "../../../domain/classes/Actividad";

export default class MActividad implements domain.IModelActividad {
    buscarPorId(idActividad: ID_ACT): Promise<Actividad | null> {
        throw new Error("Method not implemented.");
    }
    buscarPor(parametros: TDataActividad): Promise<Actividad | null> {
        throw new Error("Method not implemented.");
    }
    verLista(offset?: number, limit?: number): Promise<Actividad[]> {
        throw new Error("Method not implemented.");
    }
    guardarDatos(actividad: Actividad): Promise<Actividad> {
        throw new Error("Method not implemented.");
    }
    darDeBaja(idActividad: ID_ACT): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}