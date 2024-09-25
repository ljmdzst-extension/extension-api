



type TDataTipoInstitucion =  {
    ID : number,  
    nom : string,
}



class TipoInstitucion  {   

    private ID !: number;
    private nom !: string;

    constructor   ( _data : TDataTipoInstitucion  ){ 
        this.ID = _data.ID;
        this.nom = _data.nom;
    }

    public verDatos () : TDataTipoInstitucion  {
        return {
            ID : this.ID,
            nom : this.nom
        }
    }
}
    


export {  
    TDataTipoInstitucion 
}

export default TipoInstitucion;