import Area, { ID_AREA,TDataArea }  from "./Area";

export type ID_PROG = number;

export type TDataPrograma = {
    idPrograma : number,
    nom : string,
    listaAreas : TDataArea[]
}

 class Programa {
    private idPrograma !: number;
    private nom !: string;
    private listaAreas !: Area[];

    constructor(  _data : TDataPrograma ){
        
        this.idPrograma = _data.idPrograma;
        this.nom = _data.nom;
        this.listaAreas = [];
    }

    public verListaAreas (  ) : Area[]{
   
        return this.listaAreas;
    }
    
    public verDatos () : TDataPrograma{
        return {
            idPrograma : this.idPrograma,
            nom : this.nom,
            listaAreas :  this.listaAreas.map(iArea => iArea.verDatos())
        }
    }


}


export default Programa;