

import  Actividad, { TActividad } from "./actividad";


 type ID_AREA = number;

 type TArea = {
    ID : ID_AREA,
    nom : string,
    cActividades ?: TActividad[]
}


class Area {
    private ID !: ID_AREA;
    private nom !: string;
    private cActividades !: Array<Actividad>;

    constructor(_data : TArea){
        this.ID = _data.ID,
        this.nom = _data.nom;
        this.cActividades = new Array<Actividad>(0);
    }

    public altaActividad( a : Actividad) { this.cActividades.push( a );}
    public bajaActividad( id : number ) { this.cActividades.filter(a => a.verDatos().ID !== id);}
    
    public verDatos() : TArea 
    {
        return {
            ID : this.ID,
            nom : this.nom,
            cActividades : this.cActividades.map( a => a.verDatos())
        }
    }

    public verID() : ID_AREA { return this.ID; }



   

    
}

export { TArea, ID_AREA }
export default Area;