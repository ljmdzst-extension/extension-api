
type ID_UBICACION= number;

type TDataUbicacion = {
    idUbicacion : ID_UBICACION,
    enlace : string
}


class Ubicacion {

    private idUbicacion !: ID_UBICACION;
    private enlace !: string;

    constructor (  _data : TDataUbicacion ){
        this.idUbicacion = _data.idUbicacion;
        this.enlace = _data.enlace;
    }

    public editar( _data : Partial<TDataUbicacion> ) {
        if(_data.idUbicacion) this.idUbicacion = _data.idUbicacion;
        if(_data.enlace) this.enlace = _data.enlace;
    }

    public verDatos() : TDataUbicacion { 
        return {
            idUbicacion : this.idUbicacion,
            enlace : this.enlace
        }
    }
    
  
}

export {ID_UBICACION,TDataUbicacion }
export default Ubicacion;