import Actividad, { ID_ACT, TDataActividad } from "../classes/Actividad";


export default interface IModelActividad {
    
    buscarPorId( idActividad : ID_ACT  ) : Promise<Actividad | null>;
    buscarPor( parametros : TDataActividad ) : Promise<Actividad | null>;
    verLista( params : TDataActividad ) : Promise<Actividad[]>;
    guardarDatos( actividad : Actividad) : Promise<Actividad>;

    darDeBaja( idActividad : ID_ACT ) : Promise<boolean>;
}   