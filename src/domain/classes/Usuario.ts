
import Categoria, { TCategoria } from "./categoria";
import Institucion from "./institucion";
import ProgramasHabilitadosDelUsuario, { TPeriodoDeTrabajo } from "./periodo-de-trabajo"
import Permiso, { TPermiso } from "./permiso";
import Persona from "./persona";
import PersonaFisica , {TPersonaFisica} from "./persona-fisica";
import PersonaJuridica , {TPersonaJuridica} from "./persona-juridica";



export type TUsuario = {
    idUsuario: string,
    email: string,
    pass: string,
    idUnidadAcademica: number,
    pendiente : number,
    persona ?: TPersonaFisica | TPersonaJuridica,
    categoria ?: TCategoria,
    permisos ?: TPermiso[],
    areas ?: TPeriodoDeTrabajo[]
}

export default class Usuario {
    private idUsuario: string;
    private email: string;
    private pass: string;
    private idUnidadAcademica: number;
    private pendiente: number;
    private iPersona !: Persona;
    private iCategoria !: Categoria;
    private cPermisos !: Permiso[];
    private cProgramasHabilitados !: ProgramasHabilitadosDelUsuario[];

    constructor( data : TUsuario, p : Persona , c : Categoria, cPermisos : Permiso[] ) {
        this.idUsuario = data.idUsuario;
        this.email = data.email;
        this.pass = data.pass;
        this.idUnidadAcademica = data.idUnidadAcademica;
        this.pendiente = data.pendiente;
        this.iCategoria = c;
        this.cPermisos = cPermisos;
        this.iPersona = p;
        this.cProgramasHabilitados = [];
    }

    public editar( _data : Partial<TUsuario>) {
        if(_data.idUsuario) this.idUsuario = _data.idUsuario;
        if(_data.email) this.email = _data.email;
        if(_data.pass) this.pass = _data.pass;
        if(_data.idUnidadAcademica) this.idUnidadAcademica = _data.idUnidadAcademica;
        if(_data.pendiente) this.pendiente = _data.pendiente;
   
        if( _data.persona  && Object.keys(_data.persona).some( k => k === 'nroDoc' ) ) this.iPersona = new PersonaFisica(_data.persona as TPersonaFisica) ;
   
        if( _data.persona  && Object.keys(_data.persona).some( k => k === 'institucion' ) ) this.iPersona = new PersonaJuridica(_data.persona as TPersonaJuridica, new Institucion((_data.persona as TPersonaJuridica).institucion)) ;
        
        if(_data.categoria && (this.iCategoria.verDatos().nombre !== _data.categoria.nombre )) {
            this.cambiarCategoria(new Categoria(_data.categoria));
        } 

        if(_data.permisos) {
            _data.permisos.forEach( dataPermiso => {
                if(! this.buscarPermiso(dataPermiso.idPermiso)) {
                    this.altaPermiso(new Permiso(dataPermiso));
                }
            })
        }
    }

    public buscarPermiso( idPermiso : number ) : Permiso | undefined {
        return this.cPermisos.find( permiso => permiso.verDatos().idPermiso === idPermiso );
    }

    public altaProgramasHabilitados( progHabilitados : ProgramasHabilitadosDelUsuario ) {
       this.cProgramasHabilitados.push( progHabilitados );
    }

    public bajaProgramaHabilitado( anio : number, idPrograma : number ) {
       const programasHabilitados = this.cProgramasHabilitados.find( ph => ph.verDatos().anio === anio );

       if(programasHabilitados) {
         programasHabilitados.bajaProgram(idPrograma);
       }
    }
    public altaPermiso ( p : Permiso) {
        if(this.cPermisos.every( _p => _p.verDatos().idPermiso !== p.verDatos().idPermiso )) {
            this.cPermisos.push(p);
        }
    }

    public bajaPermiso( idPermiso : number) {
        this.cPermisos = this.cPermisos.filter( p => p.verDatos().idPermiso !== idPermiso);
    }

    public cambiarCategoria ( nuevaCategoria : Categoria ) {
        this.iCategoria = nuevaCategoria;
    }

    public cambiarPass( pass : string ) {
        this.editar({pass});
    }

    public cambiarANoPendiente( ) { 
        this.editar({pendiente : 0});
    }

    public verDatos() : TUsuario {
        return {
            idUsuario : this.idUsuario,
            email : this.email,
            pass : this.pass,
            idUnidadAcademica : this.idUnidadAcademica,
            pendiente : this.pendiente,
            categoria : this.iCategoria.verDatos(),
            persona  : this.iPersona.verDatos(),
            areas : this.cProgramasHabilitados.map( ph => ph.verDatos()  ),
            permisos : this.cPermisos.map( p => p.verDatos()),
        }
    }
     
    
}