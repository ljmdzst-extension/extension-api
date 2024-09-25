import Institucion, { TDataInstitucion } from "./institucion";
import Persona, { TDataPersona } from "./persona";

export type TDataPersonaJuridica = TDataPersona & {
    institucion : TDataInstitucion
}

export default class PersonaJuridica extends Persona {
    
    private institucion !: Institucion;

    constructor ( data : TDataPersonaJuridica , i : Institucion ){ 
        super(data);
        this.institucion = i;
      
    }

    public editar( data : Partial<TDataPersonaJuridica> ) {
        if(data.nom) this.nom = data.nom;
        if(data.tel) this.tel = data.tel;
        if(data.dom) this.dom = data.dom;
        if(data.email) this.email = data.email;
        if(data.ciudad) this.ciudad = data.ciudad;
        if(data.provincia) this.provincia = data.provincia;
        if(data.pais) this.pais = data.pais;
    }

    public verDatos() : TDataPersonaJuridica { 
        return {
            ID : this.ID,
            nom : this.nom,
            tel : this.tel,
            dom : this.dom,
            email : this.email,
            ciudad : this.ciudad,
            provincia : this.provincia,
            pais : this.pais,
            institucion : this.institucion.verDatos()
        }
    }

    public esJuridica(): boolean {
       return false;
    }
    public esFisica(): boolean {
       return true;
    }
}