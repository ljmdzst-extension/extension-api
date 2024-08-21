import { domain } from "../domain";
import IModelActividad from "../domain/models/actividad";
import IValidatorActividad from "./validators/actividad";

export default class BusquedaActividades {


    public static async buscarPorId( idActividad : number , MActividad : IModelActividad, VActividad : IValidatorActividad) : Promise<domain.Actividad | null> {
        let salida : domain.Actividad | null = null;

        if(VActividad.validarIdActividad(idActividad)) {

            salida = await MActividad.buscarPorId(idActividad);

        }

        return salida;
    } 
}