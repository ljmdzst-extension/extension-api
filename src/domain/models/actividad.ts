import Actividad, { ID_ACT, TDataActividad } from "../classes/Actividad";
import ITransaction from "./transaction";

export default interface IModelActividad {
    
    buscarPorId( idActividad : ID_ACT , transaction ?: ITransaction ) : Promise<Actividad | null>;
    buscarPor( parametros : TDataActividad , transaction ?: ITransaction) : Promise<Actividad | null>;
    verLista( params : TDataActividad , transaction ?: ITransaction) : Promise<Actividad[]>;
    guardarDatos( actividad : Actividad, transaction ?: ITransaction) : Promise<Actividad>;

    darDeBaja( idActividad : ID_ACT , transaction ?: ITransaction) : Promise<boolean>;
}   