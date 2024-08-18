
type TDataUsuario = {
    idUsuario: string
    nroDoc: string
    email: string
    pass: string
    idUnidadAcademica: number
    pendiente : number
}

export default class Usuario {
    private idUsuario: string;
    private nroDoc: string;
    private email: string;
    private pass: string;
    private idUnidadAcademica: number;
    private pendiente: number;

    constructor( data : TDataUsuario ) {
        this.idUsuario = data.idUsuario;
        this.nroDoc = data.nroDoc;
        this.email = data.email;
        this.pass = data.pass;
        this.idUnidadAcademica = data.idUnidadAcademica;
        this.pendiente = data.pendiente;
    }

    public editar( _data : Partial<TDataUsuario>) {
        if(_data.idUsuario) this.idUsuario = _data.idUsuario;
        if(_data.nroDoc) this.nroDoc = _data.nroDoc;
        if(_data.email) this.email = _data.email;
        if(_data.pass) this.pass = _data.pass;
        if(_data.idUnidadAcademica) this.idUnidadAcademica = _data.idUnidadAcademica;
        if(_data.pendiente) this.pendiente = _data.pendiente;
    }

    public cambiarPass( pass : string ) {
        this.editar({pass});
    }

    public cambiarANoPendiente( ) { 
        this.editar({pendiente : 0});
    }

    public verDatos() : TDataUsuario {
        return {
            idUsuario : this.idUsuario,
            nroDoc : this.nroDoc,
            email : this.email,
            pass : this.pass,
            idUnidadAcademica : this.idUnidadAcademica,
            pendiente : this.pendiente
        }
    }
     
    
}