
export type ID_MES = number;
export type ID_FECHA = number; 

export type TDataFecha = {
    idFecha : ID_FECHA;
    fecha : Date;
}

class FechaPuntual{
    private idFecha !: ID_FECHA;
    private fecha !: Date; 
    
    constructor( _data : TDataFecha){
        this.idFecha = _data.idFecha;
        this.fecha = _data.fecha;
    }

    public estaEnRango( desde : Date,  hasta : Date) : boolean {
        const msDesde = Date.parse(desde.toString());
        const msHasta = Date.parse(hasta.toString());
        const msFecha = Date.parse(this.fecha.toString());
        return (   msDesde < msFecha  &&  msFecha < msHasta );
    }
    
    public verDatos (): TDataFecha  {
        return {
            idFecha : this.idFecha,
            fecha : this.fecha,   
        }
    }
   

  
}

export default FechaPuntual;