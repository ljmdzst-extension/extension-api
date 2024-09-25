
export type ID_FECHA = number; 

export type TFecha = {
    ID : ID_FECHA;
    fecha : Date;
}

class FechaPuntual{
    private ID !: ID_FECHA;
    private fecha !: Date; 
    
    constructor( _data : TFecha){
        this.ID = _data.ID;
        this.fecha = _data.fecha;
    }

    public estaEnRango( desde : Date,  hasta : Date) : boolean {
        const msDesde = desde.getUTCMilliseconds();
        const msHasta = hasta.getUTCMilliseconds();
        const msFecha = this.fecha.getUTCMilliseconds();
        return (   msDesde < msFecha  &&  msFecha < msHasta );
    }
    
    public verDatos (): TFecha  {
        return {
            ID : this.ID,
            fecha : this.fecha,   
        }
    }
   

  
}

export default FechaPuntual;