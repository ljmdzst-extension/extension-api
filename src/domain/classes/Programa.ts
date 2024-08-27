import Area, { TDataArea }  from "./Area";

export type ID_PROG = number;

export type TDataPrograma = {
    idPrograma : number,
    nom : string,
    listaAreas : TDataArea[]
}

 class Programa {
    private idPrograma !: number;
    private nom !: string;
    private cAreas !: Area[];

    constructor(  _data : TDataPrograma, _cAreas : Area[]  ){
        
        this.idPrograma = _data.idPrograma;
        this.nom = _data.nom;
        this.cAreas = _cAreas;
    }

    public verListaAreas (  ) : Area[]{
   
        return this.cAreas;
    }

    public altaArea( a : Area ) {
        this.cAreas.push( a );
    }
    public bajaArea( idArea : number) {
        this.cAreas = this.cAreas.filter( a => a.verID() !== idArea );
    }
    public verID(){return this.idPrograma;}
    
    public verDatos ( ) : TDataPrograma{
        return {
            idPrograma : this.idPrograma,
            nom : this.nom,
            listaAreas :  this.cAreas.map(ap => ap.verDatos())
        }
    }


}


export default Programa;