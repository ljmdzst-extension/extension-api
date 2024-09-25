
export type TDataCategoria  = {
    idCategoria : number;
    nombre : string;
}


export default class Categoria {

    private ID !: number;
    private nombre !: string;

    constructor( _data : TDataCategoria) {
        this.ID = _data.idCategoria;
        this.nombre = _data.nombre;
    }

    public verDatos(  ) : TDataCategoria {
        return {
            idCategoria : this.ID,
            nombre : this.nombre
        }
    }
 
}