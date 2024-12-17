
export type TPermiso = {
    idPermiso: number;
    nombre : string;
}


export default class Permiso{

    private idPermiso!: number;
    private nombre !: string;

    constructor( _data : TPermiso) {
        this.idPermiso= _data.idPermiso;
        this.nombre = _data.nombre;
    }

    public verDatos(  ) : TPermiso{
        return {
            idPermiso: this.idPermiso,
            nombre : this.nombre
        }
    }
 
}