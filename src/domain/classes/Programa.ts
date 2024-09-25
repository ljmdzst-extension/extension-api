import Area, { TArea }  from "./area";

export type ID_PROG = number;

export type TPrograma = {
    ID : number,
    nom : string,
    listaAreas : TArea[]
}

 class Programa {
    private ID !: number;
    private nom !: string;
    private cAreas !: Area[];

    constructor(  _data : TPrograma, _cAreas : Area[]  ){
        
        this.ID = _data.ID;
        this.nom = _data.nom;
        this.cAreas = _cAreas;
    }

    public verListaAreas (  ) : Area[]{
   
        return this.cAreas;
    }

    public altaArea( a : Area ) {
        if(!this.cAreas.find( _a => _a.verID() === a.verID())) { 
            this.cAreas.push( a );
        }
    }
    public bajaArea( idArea : number) {
        this.cAreas = this.cAreas.filter( a => a.verID() !== idArea );
    }
    public verID(){return this.ID;}
    
    public verDatos ( ) : TPrograma{
        return {
            ID : this.ID,
            nom : this.nom,
            listaAreas :  this.cAreas.map(ap => ap.verDatos())
        }
    }


}


export default Programa;