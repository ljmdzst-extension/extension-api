
import Ubicacion, { TDataUbicacion }  from "./Ubicacion";
import Meta, { TDataMeta } from "./Meta";
import Institucion, { TDataInstitucion } from "./Institucion";
import FechaPuntual, { TDataFecha } from "./FechaPuntual";
import Enlace, { TDataEnlace } from './Enlace';
import Objetivo, { TDataObjetivo } from "./Objetivo";
import ProgramaSIPPE, { TDataProgramaSIPPE } from "./ProgramaSIPPE";



const ACTIVIDAD_NULA = {idActividad : 0, idArea : 0, nro : 0 , desc : ''};
  

type ID_ACT = number;

type TDataActividad = {

    idActividad : number,
    idArea : number,
    desc : string,
    nro ?: number,
    idUsuario ?: string,
    fechaDesde ?: string,
    fechaHasta ?: string,
    motivoCancel ?: string | null,
    listaMetas ?: TDataMeta[],
    listaEnlaces ?: TDataEnlace[],
    listaFechaPuntuales ?: TDataFecha[],
    listaInstituciones ?: TDataInstitucion[],
    listaObjetivos ?: TDataObjetivo[],
    listaProgramaSIPPPEs ?: TDataProgramaSIPPE[],
    listaUbicaciones ?: TDataUbicacion[]

}



class Actividad  {

    private idActividad  !: number;
    private idArea  !: number;
    private desc  !: string;
    private nro  ?: number;
    private idUsuario  ?: string;
    private fechaDesde  ?: Date;
    private fechaHasta  ?: Date;
    private motivoCancel  ?: string | null;

    private cMetas !: Meta[];
    private cUbicaciones !: Ubicacion[];
    private cInstituciones !: Institucion[];
    private cFechasPuntuales !: FechaPuntual[];
    private cEnlaces !: Enlace[];
    private cObjetivos !: Objetivo[];
    private cProgSIPPPE !: ProgramaSIPPE[];

    constructor( _data : TDataActividad ) {

        this.idActividad = _data.idActividad;
        this.idArea = _data.idArea;
        this.desc = _data.desc;
        this.idUsuario = _data.idUsuario;
        
        if(_data.nro) this.nro = _data.nro;
        if(_data.fechaDesde) this.fechaDesde = new Date(_data.fechaDesde);
        if(_data.fechaHasta) this.fechaHasta = new Date(_data.fechaHasta);
        if(_data.motivoCancel) this.motivoCancel = _data.motivoCancel;

        this.cMetas = [];
        this.cUbicaciones = [];
        this.cInstituciones = [];
        this.cFechasPuntuales = [];
        this.cEnlaces = [];
        this.cObjetivos = [];
        this.cProgSIPPPE = [];

    }
    
    public editar( data : Partial<TDataActividad> ) {
        if(data.desc) { this.desc = data.desc;}
        if(data.nro) { this.nro = data.nro;}
        if(data.idUsuario) { this.idUsuario = data.idUsuario;}
        if(data.fechaDesde) { this.fechaDesde = new Date( data.fechaDesde );}
        if(data.fechaHasta) { this.fechaHasta = new Date(data.fechaHasta);}
        if(data.motivoCancel) { this.motivoCancel = data.motivoCancel;}
    }

    public altaEnlace( e : Enlace){ this.cEnlaces.push( e ) ; }
    public altaFechaPuntual( fp : FechaPuntual){ this.cFechasPuntuales.push(fp);  }
    public altaInstitucion( i : Institucion){ this.cInstituciones.push(i) ; }
    public altaMeta(m : Meta){ this.cMetas.push( m);  }
    public altaObjetivo( o : Objetivo){ this.cObjetivos.push(o);  }
    public altaProgramaSIPPPE( ps : ProgramaSIPPE){ this.cProgSIPPPE.push(ps);  }
    public altaUbicacion( u : Ubicacion ){ this.cUbicaciones.push(u);  }
    
    public bajaEnlace( id : number)  {  
        this.cEnlaces = this.cEnlaces.filter( e => e.verDatos().idEnlace !== id) 
    }
    public bajaFechaPuntual( id : number)  {  
        this.cFechasPuntuales = this.cFechasPuntuales.filter( e => e.verDatos().idFecha !== id) 
    }
    public bajaInstitucion( id : number)  {  
        this.cInstituciones = this.cInstituciones.filter( e => e.verDatos().idInstitucion !== id) 
    }
    public bajaMeta( id : number)  {  
        this.cMetas = this.cMetas.filter( m => m.verDatos().idMeta !== id) 
    }
    public bajaObjetivo( id : number)  {  
        this.cObjetivos = this.cObjetivos.filter( o => o.verDatos().idObjetivo !== id) 
    }
    public bajaProgramaSIPPPE( id : number)  {  
        this.cProgSIPPPE = this.cProgSIPPPE.filter( e => e.verDatos().idProgramaSippe !== id) 
    }
    public bajaUbicacion( id : number)  {  
        this.cUbicaciones = this.cUbicaciones.filter( u => u.verDatos().idUbicacion !== id) 
    }

    public editarMeta( id : number, _data : TDataMeta) : boolean { 
        let salida = false;
        const m = this.verMetas().find( m => m.verDatos().idMeta === id) ;
        if( m ) {
            m.editarDatos(_data);
            salida = true;
        }   
        return salida;
     }

    public editarInstitucion( id : number , _data : TDataInstitucion) : boolean {
        let salida = false; 
        const i = this.verInstitucions().find( i => i.verDatos().idInstitucion === id);
        if( i ) {
            i.editarDatos( _data );
            salida = true;
        }

        return salida;

    }

    public editarEnlace( id : number, _data : TDataEnlace) : boolean {
        let salida = false;

        const e = this.findEnlace(id);
        if(e) {
            e.editar(_data);
            salida = true;
        }

        return salida;
    }
        
    public verEnlaces( ) : Enlace [] { return this.cEnlaces; }
    public verFechaPuntuals( ) : FechaPuntual [] { return this.cFechasPuntuales; }
    public verInstitucions( ) : Institucion [] { return this.cInstituciones; }
    public verMetas( ) : Meta [] { return this.cMetas; }
    public verObjetivos( ) : Objetivo [] { return this.cObjetivos; }
    public verProgramaSIPPPEs( ) : ProgramaSIPPE [] { return this.cProgSIPPPE; }
    public verUbicacions( ) : Ubicacion [] { return this.cUbicaciones; }

    public findEnlace( id : number ) { return this.cEnlaces.find( item => item.verDatos().idEnlace === id)}
    public findFechaPuntual( id : number ) { return this.cFechasPuntuales.find( item => item.verDatos().idFecha === id)}
    public findInstitucion( id : number ) { return this.cInstituciones.find( item => item.verDatos().idInstitucion === id)}
    public findMeta( id : number ) { return this.cMetas.find( item => item.verDatos().idMeta === id)}
    public findObjetivo( id : number ) { return this.cObjetivos.find( item => item.verDatos().idObjetivo === id)}
    public findProgramaSIPPPE( id : number ) { return this.cProgSIPPPE.find( item => item.verDatos().idProgramaSippe === id)}
    public findUbicacion( id : number ) { return this.cUbicaciones.find( item => item.verDatos().idUbicacion === id)}


    public verDatos() : TDataActividad {
        return {
            idActividad : this.idActividad,
            idArea : this.idArea,
            nro : this.nro,
            desc : this.desc,
            idUsuario : this.idUsuario,
            fechaDesde : this.fechaDesde?.toString(),
            fechaHasta : this.fechaHasta?.toString(),
            motivoCancel : this.motivoCancel,
            listaMetas : this.cMetas.map( m => m.verDatos()),
            listaEnlaces : this.cEnlaces.map( e => e.verDatos()),
            listaFechaPuntuales : this.cFechasPuntuales.map( f =>f.verDatos()),
            listaInstituciones : this.cInstituciones.map( i => i.verDatos()),
            listaObjetivos : this.cObjetivos.map( o => o.verDatos()),
            listaProgramaSIPPPEs : this.cProgSIPPPE.map( ps => ps.verDatos()),
            listaUbicaciones : this.cUbicaciones.map(  u => u.verDatos())
        }
    }
    
}
   

export { ID_ACT,ACTIVIDAD_NULA,TDataActividad}

export default Actividad;