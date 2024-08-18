
export type TDataCategoria  = {
    idCategoria : number;
    nombre : string;
}


export default class Categoria {

    private idCategoria !: number;
    private nombre !: string;

    constructor( _data : TDataCategoria) {
        this.idCategoria = _data.idCategoria;
        this.nombre = _data.nombre;
    }

    public verDatos(  ) : TDataCategoria {
        return {
            idCategoria : this.idCategoria,
            nombre : this.nombre
        }
    }
 
}