
export type TCategoria  = {
    ID : number;
    nombre : string;
}


export default class Categoria {

    private ID !: number;
    private nombre !: string;

    constructor( _data : TCategoria) {
        this.ID = _data.ID;
        this.nombre = _data.nombre;
    }

    public verDatos(  ) : TCategoria {
        return {
            ID : this.ID,
            nombre : this.nombre
        }
    }
 
}