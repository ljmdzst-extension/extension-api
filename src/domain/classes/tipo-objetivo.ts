

type TDataTipoObjetivo =  {
    ID : number,  
    nom : string,
}



class TipoObjetivo  {   

    private ID !: number;
    private nom !: string;

    constructor   ( _data : TDataTipoObjetivo  ){ 
        this.ID = _data.ID;
        this.nom = _data.nom;
    }

    public verDatos () : TDataTipoObjetivo  {
        return {
            ID : this.ID,
            nom : this.nom
        }
    }
}
    


export {  
    TDataTipoObjetivo 
}

export default TipoObjetivo;