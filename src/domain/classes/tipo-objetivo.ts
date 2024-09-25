

type TTipoObjetivo =  {
    ID : number,  
    nom : string,
}



class TipoObjetivo  {   

    private ID !: number;
    private nom !: string;

    constructor   ( _data : TTipoObjetivo  ){ 
        this.ID = _data.ID;
        this.nom = _data.nom;
    }

    public verDatos () : TTipoObjetivo  {
        return {
            ID : this.ID,
            nom : this.nom
        }
    }
}
    


export {  
    TTipoObjetivo 
}

export default TipoObjetivo;