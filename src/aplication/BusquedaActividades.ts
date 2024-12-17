import { domain } from "../domain";
import IValidatorActividad from "./validators/actividad";

export default class BusquedaActividades {


    public static async buscarPorId( idActividad : number , MActividad : domain.IModelActividad, VActividad : IValidatorActividad) : Promise<domain.Actividad | null> {
        let salida : domain.Actividad | null = null;

        if(VActividad.validarIdActividad(idActividad)) {

            salida = await MActividad.findByPk(idActividad);

        }

        return salida;
    } 

    public static async buscarPor( parametros : Partial<domain.TActividad> ,  MActividad : domain.IModelActividad, VActividad : IValidatorActividad ) : Promise<domain.Actividad[]> {
        let salida : domain.Actividad[] = [];

        if(!VActividad.validar(parametros)) throw new Error('Revise los parámetros ingresados');

        salida = await MActividad.findAll();

        return salida;
    }
}