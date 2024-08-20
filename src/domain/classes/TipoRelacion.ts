

type ID_TIPO_REL = number;

type TDataTipoRelacion =  {
    idTipoRelacion : ID_TIPO_REL,  
    nom : string,
}



class TipoRelacion  {   

    private idTipoRelacion !: ID_TIPO_REL;
    private nom !: string;

    constructor   ( _data : TDataTipoRelacion  ){ 
        this.idTipoRelacion = _data.idTipoRelacion;
        this.nom = _data.nom;
    }

    public verDatos () : TDataTipoRelacion  {
        return {
            idTipoRelacion : this.idTipoRelacion,
            nom : this.nom
        }
    }
}
    


export {  
    TDataTipoRelacion , 
    ID_TIPO_REL
}

export default TipoRelacion;