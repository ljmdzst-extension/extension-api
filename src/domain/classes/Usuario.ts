

import Categoria, { TDataCategoria } from "./Categoria"
import Permiso, { TDataPermiso } from "./Permiso"
import Persona, { TDataPersona } from "./Persona"
import ProgramasHabilitadosDelUsuario, { TDataPeriodoDeTrabajo } from "./PeriodoDeTrabajo"

export type TDataUsuario = {
    idUsuario: string,
    nroDoc : string,
    email: string,
    pass: string,
    idUnidadAcademica: number,
    pendiente : number,
    persona ?: TDataPersona,
    categoria ?: TDataCategoria,
    permisos ?: TDataPermiso[],
    areas ?: TDataPeriodoDeTrabajo[]
}

export default class Usuario {
    private idUsuario: string;
    private email: string;
    private pass: string;
    private idUnidadAcademica: number;
    private pendiente: number;
    private nroDoc : string;
    private iPersona !: Persona;
    private iCategoria !: Categoria;
    private cPermisos !: Permiso[];
    private cProgramasHabilitados !: ProgramasHabilitadosDelUsuario[];

    constructor( data : TDataUsuario, p : Persona , c : Categoria, cPermisos : Permiso[] ) {
        this.idUsuario = data.idUsuario;
        this.email = data.email;
        this.pass = data.pass;
        this.idUnidadAcademica = data.idUnidadAcademica;
        this.pendiente = data.pendiente;
        this.iCategoria = c;
        this.cPermisos = cPermisos;
        this.iPersona = p;
        this.nroDoc = data.nroDoc;
        this.cProgramasHabilitados = [];
    }

    public editar( _data : Partial<TDataUsuario>) {
        if(_data.idUsuario) this.idUsuario = _data.idUsuario;
        if(_data.nroDoc) this.nroDoc = _data.nroDoc;
        if(_data.email) this.email = _data.email;
        if(_data.pass) this.pass = _data.pass;
        if(_data.idUnidadAcademica) this.idUnidadAcademica = _data.idUnidadAcademica;
        if(_data.pendiente) this.pendiente = _data.pendiente;
        if(_data.persona ) this.iPersona = new Persona(_data.persona) ;
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

    public verDatos() : TDataUsuario {
        return {
            idUsuario : this.idUsuario,
            nroDoc : this.nroDoc,
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