
export type TPermiso = {
    ID: number;
    nombre : string;
}


export default class Permiso{

    private ID!: number;
    private nombre !: string;

    constructor( _data : TPermiso) {
        this.ID = _data.ID;
        this.nombre = _data.nombre;
    }

    public verDatos(  ) : TPermiso{
        return {
            ID: this.ID,
            nombre : this.nombre
        }
    }
 
}