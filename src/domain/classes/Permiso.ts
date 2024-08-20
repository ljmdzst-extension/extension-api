
export type TDataPermiso = {
    idPermiso: number;
    nombre : string;
}


export default class Permiso{

    private idPermiso!: number;
    private nombre !: string;

    constructor( _data : TDataPermiso) {
        this.idPermiso= _data.idPermiso;
        this.nombre = _data.nombre;
    }

    public verDatos(  ) : TDataPermiso{
        return {
            idPermiso: this.idPermiso,
            nombre : this.nombre
        }
    }
 
}