



type TTipoInstitucion =  {
    ID : number,  
    nom : string,
}



class TipoInstitucion  {   

    private ID !: number;
    private nom !: string;

    constructor   ( _data : TTipoInstitucion  ){ 
        this.ID = _data.ID;
        this.nom = _data.nom;
    }

    public verDatos () : TTipoInstitucion  {
        return {
            ID : this.ID,
            nom : this.nom
        }
    }
}
    


export {  
    TTipoInstitucion 
}

export default TipoInstitucion;