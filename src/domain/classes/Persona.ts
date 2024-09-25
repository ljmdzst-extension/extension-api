import Usuario from "./usuario";

export type TDataPersona = {
    ID : number;
    nom: string;
    tel?: string;
    dom?: string;
    email?: string;
    ciudad?: string;
    provincia?: string;
    pais?: string;
}

export default abstract class Persona {
    protected ID !: number;
    protected nom !: string;
    protected tel ?: string;
    protected dom ?: string;
    protected email ?: string;
    protected ciudad ?: string;
    protected provincia ?: string;
    protected pais ?: string;

    protected cUsuarios ?: Usuario[];

    constructor ( data : TDataPersona ){ 
        this.ID;
        this.nom = data.nom;
        this.tel = data.tel;
        this.dom = data.dom;
        this.email = data.email;
        this.ciudad = data.ciudad;
        this.provincia = data.provincia;
        this.pais = data.pais;
    
        this.cUsuarios = [];
    }

    public altaUsuario( u : Usuario) { this.cUsuarios?.push(u);}

    public bajaUsuario( idUsuario : string) {
        const usr = this.cUsuarios?.find( u => u.verDatos().idUsuario === idUsuario )
        if(usr) {
            this.cUsuarios = this.cUsuarios?.filter( u => u.verDatos().idUsuario !== idUsuario);
        }
    }

    public abstract editar( data : Partial<TDataPersona> ) : void ;

    public abstract verDatos() : TDataPersona ; 

    public abstract esJuridica () : boolean;
    public abstract esFisica () : boolean;
}