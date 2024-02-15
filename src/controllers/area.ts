import { Transaction } from "sequelize";
import {  IItemActividad } from "../classes/Actividad";
import Area, { IArea, ID_AREA } from "../classes/Area";
import Programa, { ID_PROG } from "../classes/Programa";
import { DataGetActividades, DataGetAreas } from "../types/area";


class ControllerArea {

    public static async verListaAreas( data : DataGetAreas , transaction : Transaction ) : Promise<IArea[]> {
        let salida : IArea[] = [];

      
        const iPrograma = await Programa.buscarPorID(data.idPrograma,transaction);

        const areas = await iPrograma.verListaAreas(transaction);

        salida = areas.map( area => area.verDatos());
        
        return salida;
    }
   
    public static async verListaActividades ( data : DataGetActividades , transaction : Transaction) : Promise<IItemActividad[]>{
        
        let salida : IItemActividad[] = []


        const listaActividades = await Area.buscarPorIDConAct(data.idArea , transaction);

        if(listaActividades.length){
            salida = listaActividades;
        }

        return salida;
    }

}

export default ControllerArea;