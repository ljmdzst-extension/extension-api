
type ID_ENLACE = number;

type TDataEnlace = {
    idEnlace : ID_ENLACE,
    desc : string,
    link : string
}

class Enlace {

    private idEnlace !: ID_ENLACE;
    private desc !: string;
    private link !: string;

    constructor (  _data : TDataEnlace ){ 
        this.idEnlace = _data.idEnlace;
        this.desc = _data.desc;
        this.link = _data.link;
    }

    public editar( _data : TDataEnlace){
        this.idEnlace = _data.idEnlace;
        this.desc = _data.desc;
        this.link = _data.link;
    }

    public verDatos() : TDataEnlace  { 
        return {
            idEnlace : this.idEnlace,
            desc : this.desc,
            link : this.link,
        };
    }
 
   
}

export {ID_ENLACE,TDataEnlace}
export default Enlace;