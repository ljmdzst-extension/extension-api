import Persona, { TDataPersona } from "./persona";

export type TDataPersonaFisica = TDataPersona & {
    nroDoc : string;
    tipoDoc : number;
    ape : string;
}

export default class PersonaFisica extends Persona {
    
    private nroDoc !: string;
    private tipoDoc!: number;
    private ape !: string;

    constructor ( data : TDataPersonaFisica ){ 
        super(data);
        this.nroDoc = data.nroDoc;
        this.tipoDoc = data.tipoDoc;
        this.ape = data.ape;
      
    }

    public editar( data : Partial<TDataPersonaFisica> ) {
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

    public verDatos() : TDataPersonaFisica { 
        return {
            ID : this.ID,
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

    public esJuridica(): boolean {
       return false;
    }
    public esFisica(): boolean {
       return true;
    }
}