
export type TCategoria  = {
    idCategoria : number;
    nombre : string;
}


export default class Categoria {

    private ID !: number;
    private nombre !: string;

    constructor( _data : TCategoria) {
        this.ID = _data.idCategoria;
        this.nombre = _data.nombre;
    }

    public verDatos(  ) : TCategoria {
        return {
            idCategoria : this.ID,
            nombre : this.nombre
        }
    }
 
}