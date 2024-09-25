
type ID_ENLACE = number;

type TDataEnlace = {
    ID : ID_ENLACE,
    desc : string,
    link : string
}

class Enlace {

    private ID !: ID_ENLACE;
    private desc !: string;
    private link !: string;

    constructor (  _data : TDataEnlace ){ 
        this.ID = _data.ID;
        this.desc = _data.desc;
        this.link = _data.link;
    }

    public editar( _data : TDataEnlace){
        this.ID = _data.ID;
        this.desc = _data.desc;
        this.link = _data.link;
    }

    public verDatos() : TDataEnlace  { 
        return {
            ID : this.ID,
            desc : this.desc,
            link : this.link,
        };
    }
 
   
}

export {ID_ENLACE,TDataEnlace}
export default Enlace;