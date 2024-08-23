import { domain } from "../domain";

export default class BusquedaAreas {

    static async verListaActividades( idArea : number , anio : number , MArea : domain.IModelArea, Mactividad : domain.IModelActividad ) : Promise<domain.Area | null> {
        let salida : domain.Area | null  = null;

        salida = await MArea.buscarPorId(idArea);

        if( salida ) {
            const actividades = await Mactividad.buscarPorArea(idArea);
            if(actividades.length > 0) {
                actividades.forEach(a => salida.altaActividad(a) );
            }
        }

        return salida;


    }
}