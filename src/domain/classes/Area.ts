

import  Actividad, { TDataActividad } from "./Actividad";


 type ID_AREA = number;

 type TDataArea = {
    idArea : ID_AREA,
    nom : string,
    cActividades ?: TDataActividad[]
}


class Area {
    private idArea !: ID_AREA;
    private nom !: string;
    private cActividades !: Array<Actividad>;

    constructor(_data : TDataArea){
        this.cActividades = [];
    }

    public altaActividad( a : Actividad) { this.cActividades.push( a );}
    public bajaActividad( id : number ) { this.cActividades.filter(a => a.verDatos().idActividad !== id);}
    
    public verDatos() : TDataArea 
    {
        return {
            idArea : this.idArea,
            nom : this.nom,
            cActividades : this.cActividades.map( a => a.verDatos())
        }
    }

    public verID() : ID_AREA { return this.idArea; }



   

    
}

export { TDataArea, ID_AREA }
export default Area;