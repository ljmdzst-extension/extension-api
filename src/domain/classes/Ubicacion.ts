
type ID_UBICACION= number;

type TUbicacion = {
    idUbicacion : ID_UBICACION,
    enlace : string
}


class Ubicacion {

    private idUbicacion !: ID_UBICACION;
    private enlace !: string;

    constructor (  _data : TUbicacion ){
        this.idUbicacion = _data.idUbicacion;
        this.enlace = _data.enlace;
    }

    public editar( _data : Partial<TUbicacion> ) {
        if(_data.idUbicacion) this.idUbicacion = _data.idUbicacion;
        if(_data.enlace) this.enlace = _data.enlace;
    }

    public verDatos() : TUbicacion { 
        return {
            idUbicacion : this.idUbicacion,
            enlace : this.enlace
        }
    }
    
  
}

export {ID_UBICACION,TUbicacion }
export default Ubicacion;