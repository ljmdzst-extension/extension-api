import { domain } from "../domain";

export default class BusquedaActividades {


    public static async buscarPorId( idActividad : number , MActividad : domain.IModelActividad, VActividad : domain.IValidatorActividad) : Promise<domain.Actividad | null> {
        let salida : domain.Actividad | null = null;

        if(VActividad.validarIdActividad(idActividad)) {

            salida = await MActividad.buscarPorId(idActividad);

        }

        return salida;
    } 

    public static async buscarPor( parametros : Partial<domain.TDataActividad> ,  MActividad : domain.IModelActividad, VActividad : domain.IValidatorActividad ) : Promise<domain.Actividad[]> {
        let salida : domain.Actividad[] = [];

        if(!VActividad.validar(parametros)) throw new Error('Revise los parámetros ingresados');

        salida = await MActividad.verLista();

        return salida;
    }
}