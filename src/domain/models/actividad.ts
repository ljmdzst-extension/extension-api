import Actividad, { ID_ACT, TDataActividad } from "../classes/Actividad";

export default interface IModelActividad {
    
    findByPk( pk : ID_ACT  ) : Promise<Actividad | null>;
    findOne( params : TDataActividad ) : Promise<Actividad | null>;
    findAll( params : TDataActividad ) : Promise<Actividad[]>;
    save( actividad : Actividad ) : Promise<Actividad>;
    destroy(actividad : Actividad) : Promise<boolean>;
}   