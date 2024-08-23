import Area, { ID_AREA,TDataArea }  from "./Area";
import AreaPrograma from "./AreaPrograma";

export type ID_PROG = number;

export type TDataPrograma = {
    idPrograma : number,
    nom : string,
    listaAreas : TDataArea[]
}

 class Programa {
    private idPrograma !: number;
    private nom !: string;
    private cAreaPrograma !: AreaPrograma[];

    constructor(  _data : TDataPrograma ){
        
        this.idPrograma = _data.idPrograma;
        this.nom = _data.nom;
        this.cAreaPrograma = [];
    }

    public verListaAreas (  ) : Area[]{
   
        return this.cAreaPrograma.map( ap => ap.verArea());
    }
    public verID(){return this.idPrograma;}
    
    public verDatos ( anio : number) : TDataPrograma{
        return {
            idPrograma : this.idPrograma,
            nom : this.nom,
            listaAreas :  this.cAreaPrograma.filter( ap => ap.verAnio() === anio).map(ap => ap.verArea().verDatos())
        }
    }


}


export default Programa;