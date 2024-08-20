
export type TDataPersona = {
    nroDoc: string;
    tipoDoc: number;
    ape: string;
    nom: string;
    tel?: string;
    dom?: string;
    email?: string;
    ciudad?: string;
    provincia?: string;
    pais?: string;
}

export default class Persona {
    private nroDoc !: string;
    private tipoDoc!: number;
    private ape !: string;
    private nom !: string;
    private tel ?: string;
    private dom ?: string;
    private email ?: string;
    private ciudad ?: string;
    private provincia ?: string;
    private pais ?: string;

    constructor ( data : TDataPersona ){ 
        this.nroDoc = data.nroDoc;
        this.tipoDoc = data.tipoDoc;
        this.ape = data.ape;
        this.nom = data.nom;
        this.tel = data.tel;
        this.dom = data.dom;
        this.email = data.email;
        this.ciudad = data.ciudad;
        this.provincia = data.provincia;
        this.pais = data.pais;
    }

    public editar( data : Partial<TDataPersona> ) {
        if(data.nroDoc) this.nroDoc = data.nroDoc;
        if(data.tipoDoc) this.tipoDoc = data.tipoDoc;
        if(data.ape) this.ape = data.ape;
        if(data.nom) this.nom = data.nom;
        if(data.tel) this.tel = data.tel;
        if(data.dom) this.dom = data.dom;
        if(data.email) this.email = data.email;
        if(data.ciudad) this.ciudad = data.ciudad;
        if(data.provincia) this.provincia = data.provincia;
        if(data.pais) this.pais = data.pais;
    }

    public verDatos() : TDataPersona{ 
        return {
            nroDoc : this.nroDoc,
            tipoDoc : this.tipoDoc,
            ape : this.ape,
            nom : this.nom,
            tel : this.tel,
            dom : this.dom,
            email : this.email,
            ciudad : this.ciudad,
            provincia : this.provincia,
            pais : this.pais
        }
    }
}