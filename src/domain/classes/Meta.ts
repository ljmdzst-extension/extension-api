

type ID_META = number;

type TMeta = {
    idMeta : ID_META; 
    descripcion : string; 
    resultado ?: string; 
    observaciones ?: string; 
    valoracion ?: number;
}

class Meta {
    
    private idMeta !: ID_META;
    private descripcion !: string;
    private resultado ?: string;
    private observaciones ?: string;
    private valoracion ?: number;

    constructor ( _data : TMeta ){
        this.descripcion = _data.descripcion;
        this.resultado = _data.resultado;
        this.observaciones = _data.observaciones;
        this.valoracion = _data.valoracion;
        this.idMeta = _data.idMeta;
    }

    public editarDatos( _data : Partial<TMeta> ){
        if(_data.idMeta) this.idMeta = _data.idMeta;
        if(_data.descripcion) this.descripcion = _data.descripcion;
        if(_data.resultado) this.resultado = _data.resultado;
        if(_data.observaciones) this.observaciones = _data.observaciones;
        if(_data.valoracion) this.valoracion = _data.valoracion;
       
    }
  
    public verDatos(): TMeta
    {
        return {
            idMeta : this.idMeta, 
            descripcion : this.descripcion, 
            resultado  : this.resultado, 
            observaciones  : this.observaciones,
            valoracion : this.valoracion
        };
    }

    
    
  

}

export {TMeta,ID_META}
export default Meta;




























































































































































































