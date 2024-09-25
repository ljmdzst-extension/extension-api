
type ID_ENLACE = number;

type TEnlace = {
    ID : ID_ENLACE,
    desc : string,
    link : string
}

class Enlace {

    private ID !: ID_ENLACE;
    private desc !: string;
    private link !: string;

    constructor (  _data : TEnlace ){ 
        this.ID = _data.ID;
        this.desc = _data.desc;
        this.link = _data.link;
    }

    public editar( _data : TEnlace){
        this.ID = _data.ID;
        this.desc = _data.desc;
        this.link = _data.link;
    }

    public verDatos() : TEnlace  { 
        return {
            ID : this.ID,
            desc : this.desc,
            link : this.link,
        };
    }
 
   
}

export {ID_ENLACE,TEnlace}
export default Enlace;