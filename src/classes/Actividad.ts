
import cli from 'cli-color';
import Ubicacion, { ID_UBICACION, IUbicacion }  from "./Ubicacion";
import validator from 'validator';
import Relacion, { ID_RELACION } from "./Relacion";
import Objetivo, { ID_OBJETIVO } from "./Objetivo";
import Meta, { ID_META, IMeta } from "./Meta";
import ProgramaSIPPE, { ID_PROG_SIPPE } from "./ProgramaSIPPE";
import Institucion, { ID_INSTITUCION, IInstitucion } from "./Institucion";
import FechaPuntual, { ID_FECHA, IFecha } from "./FechaPuntual";
import Enlace, { ID_ENLACE, IEnlace } from './Enlace';
import { ERROR } from "../logs/errores";
import { Op, Transaction, col } from 'sequelize';
import { BD } from '../config/dbConfig';
import { ID_AREA } from './Area';
import { INVALIDO } from '../logs/validaciones';
import { ESTADO_BD } from '../types/general';
import { ColaDeTareas } from '../helpers/tareas';


const ACTIVIDAD_NULA = {idActividad : 0, idArea : 0, nro : 0 , desc : ''};
  

type ID_ACT = number;

type IActividad = {
    idActividad : number,
    idArea : number,
    desc : string,
    nro ?: number,
    idUsuario ?: string,
    fechaDesde ?: string,
    fechaHasta ?: string,
    motivoCancel ?: string | null
}

type IRequestActividad = IActividad & {
    listaRelaciones      ?: Array<ID_RELACION>,
    listaObjetivos       ?: Array<ID_OBJETIVO>,
    listaProgramasSIPPE  ?: Array<ID_PROG_SIPPE>,
    listaMetas           ?: Array<IMeta>,
    listaUbicaciones     ?: Array<IUbicacion>,
    listaInstituciones   ?: Array<IInstitucion>,
    listaFechasPuntuales ?: Array<IFecha>,
    listaEnlaces         ?: Array<IEnlace>
}

type IResponseActividad = IRequestActividad;

type IItemActividad = {
    idActividad : ID_ACT,
    desc : string
}


class Actividad  {

    public estadoEnBD !: ESTADO_BD;

    private listaMetas !: Meta[];
    private listaUbicaciones !: Ubicacion[];
    private listaInstituciones !: Institucion[];
    private listaFechasPuntuales !: FechaPuntual[];
    private listaEnlaces !: Enlace[];

    public data !: IActividad & {
        
        listaRelaciones      ?: Map<ID_RELACION,ESTADO_BD>,
        listaObjetivos       ?: Map<ID_OBJETIVO,ESTADO_BD>,
        listaProgramasSIPPE  ?: Map<ID_PROG_SIPPE,ESTADO_BD>,
        listaMetas           ?: Array<IMeta>,
        listaUbicaciones     ?: Array<IUbicacion>,
        listaInstituciones   ?: Array<IInstitucion>,
        listaFechasPuntuales ?: Array<IFecha>,
        listaEnlaces         ?: Array<IEnlace>
    }

    constructor(
        data : IRequestActividad
    ){
        this.listaMetas = [];
        this.listaUbicaciones = [];
        this.listaInstituciones = [];
        this.listaFechasPuntuales = [];
        this.listaEnlaces = [];

        this.data = ACTIVIDAD_NULA;

        this.data.listaProgramasSIPPE = new Map<ID_PROG_SIPPE,ESTADO_BD>();
        this.data.listaObjetivos = new Map<ID_PROG_SIPPE,ESTADO_BD>();
        this.data.listaRelaciones =  new Map<ID_RELACION,ESTADO_BD>();

        if(! Object.is(data,ACTIVIDAD_NULA)){
            this.editar(data)
        }
     

        this.estadoEnBD = ESTADO_BD.A;
    }
    public editar(data : IRequestActividad)
    {   
        // validar antes
        this.data.idActividad = data.idActividad;
        this.data.idArea = data.idArea;
        this.data.nro = data.nro;
        this.data.desc = data.desc;
        this.data.idUsuario = data.idUsuario;
        this.data.fechaDesde = data.fechaDesde;
        this.data.fechaHasta = data.fechaHasta;
        this.data.motivoCancel = data.motivoCancel;

        if(data.listaObjetivos){
            this.cargarObjetivos(data.listaObjetivos);
        }
        if(data.listaProgramasSIPPE){
            this.cargarProgramasSIPPE(data.listaProgramasSIPPE);
        }
        if(data.listaRelaciones){
            this.cargarRelaciones(data.listaRelaciones);
        }
        console.log(data.listaFechasPuntuales)
        this.cargarFechasPuntuales( data.listaFechasPuntuales);
        
        this.cargarInstituciones(data.listaInstituciones);

        this.cargarMetas(data.listaMetas);
        
        this.cargarUbicaciones(data.listaUbicaciones);

        this.cargarEnlaces(data.listaEnlaces);
    };
    public cancelar( motCancel : string){
        this.data.motivoCancel = motCancel;
        this.estadoEnBD = ESTADO_BD.M;
    }
    public restaurar(){
        this.data.motivoCancel = null;
        this.estadoEnBD = ESTADO_BD.M;
    }
    
    public verID() : number 
    {
        return this.data.idActividad;
    }
    public verDatos() : IResponseActividad 
    {
        console.log(this.listaFechasPuntuales.filter(item => !item.estaDeBaja()).map( item => item.verDatos()))
        return {
            ...this.data,
            listaObjetivos : this.data.listaObjetivos? Array.from(this.data.listaObjetivos.keys()).filter( item => this.data.listaObjetivos?.get(item) === ESTADO_BD.A).sort( (a,b) => a-b) : [],
            listaRelaciones : this.data.listaRelaciones? Array.from(this.data.listaRelaciones.keys()).filter( item => this.data.listaRelaciones?.get(item) === ESTADO_BD.A).sort( (a,b) => a-b) : [],
            listaProgramasSIPPE : this.data.listaProgramasSIPPE? Array.from(this.data.listaProgramasSIPPE.keys()).filter( item => this.data.listaProgramasSIPPE?.get(item) === ESTADO_BD.A).sort( (a,b) => a-b) : [],
            listaMetas : this.listaMetas.filter(item => !item.estaDeBaja()).map( item => item.verDatos()),
            listaUbicaciones : this.listaUbicaciones.filter(item => !item.estaDeBaja()).map( item => item.verDatos()),
            listaInstituciones : this.listaInstituciones.filter(item => !item.estaDeBaja()).map( item => item.verDatos()),
            listaFechasPuntuales : this.listaFechasPuntuales.filter(item => !item.estaDeBaja()).map( item => item.verDatos()),
            listaEnlaces : this.listaEnlaces.filter(item => !item.estaDeBaja()).map( item => item.verDatos()),
        };
    }

    public cargarProgramasSIPPE( listaIds : Array<ID_PROG_SIPPE>)
    {   
        if( !listaIds.length ) { 
            if(process.env.NODE_ENV === 'development') 
                    console.log(cli.white(' lista prog SIPPE vacía - omitiendo...')); 
            return; 
        }

        Array.from(this.data.listaProgramasSIPPE?.keys() || [])?.forEach( clave => this.data.listaProgramasSIPPE?.set(clave,ESTADO_BD.B) );
        if(listaIds.length > 0){

            listaIds.forEach( id => this.data.listaProgramasSIPPE?.set(id,ESTADO_BD.A));
        }
        
        
    };
    public cargarRelaciones( listaIds : Array<ID_RELACION> )
    {
        if( !listaIds.length ) { 
            if(process.env.NODE_ENV === 'development') if(process.env.NODE_ENV === "development")console.log(cli.white(' lista relaciones vacía - omitiendo...')); return; }
      
        Array.from(this.data.listaRelaciones?.keys() || [])
            ?.forEach( clave => this.data.listaRelaciones?.set(clave,ESTADO_BD.B) );
        
        if(listaIds.length > 0){
            listaIds.forEach( id => this.data.listaRelaciones?.set(id,ESTADO_BD.A));
        }
        
       
    };
    public cargarObjetivos( listaIds : Array<ID_OBJETIVO> )
    {
        if( !listaIds.length ) { 
            if(process.env.NODE_ENV === 'development') if(process.env.NODE_ENV === "development")console.log(cli.white(' lista objetivos vacía - omitiendo...')); return; }
        
        Array.from(this.data.listaObjetivos?.keys() || [])?.forEach( clave => this.data.listaObjetivos?.set(clave,ESTADO_BD.B) );

        if(listaIds.length > 0){
            listaIds.forEach( id => this.data.listaObjetivos?.set(id,ESTADO_BD.A))
        }

    };
    public cargarFechasPuntuales( listaFechas ?: Array<IFecha> )
    {

        if( !listaFechas?.length) {if(process.env.NODE_ENV === "development")console.log(cli.white(' lista fechas puntuales vacía - omitiendo...')); return;}
        if((!this.data.fechaDesde) || (!this.data.fechaHasta)) {console.log("rango no asignado.. omitiendo"); return;}
        if( listaFechas.length < 1) { 
            this.listaFechasPuntuales.forEach( item => {item.darDeBajaBD();});
            return;
         }

        listaFechas.sort( (a,b) => a.idFecha < 1 ? 1 : a.idFecha - b.idFecha )
        
        if(listaFechas[listaFechas.length -1].idFecha < 1) {
            const fechasNuevas = listaFechas
                .splice( listaFechas.findIndex( fecha => fecha.idFecha < 1 ))
                .map( fecha => new FechaPuntual(fecha,this));
            
            this.listaFechasPuntuales = [...this.listaFechasPuntuales , ...fechasNuevas]
        }

        listaFechas.forEach( fecha => {
            const fechaCargada = this.listaFechasPuntuales.find( item => item.verDatos().idFecha === fecha.idFecha);
            if( !fechaCargada ){
                const iFechaPuntual = new FechaPuntual(fecha,this);
                if(!iFechaPuntual.estaEnRango(new Date(this.data.fechaDesde || Date.now()),new Date(this.data.fechaHasta || Date.now()))) throw ERROR.FECHA_FUERA_DE_RANGO;
                this.listaFechasPuntuales.push(iFechaPuntual);
            } 
        });

        this.listaFechasPuntuales.forEach( item => {
            if( item.verDatos().idFecha > 0 && listaFechas.every( fecha => fecha.idFecha !== item.verDatos().idFecha) ){
                item.darDeBajaBD();
            }
        });
      
    };
    public cargarInstituciones( listaInstituciones ?: Array< IInstitucion> )
    {

        if( !listaInstituciones) {
            if(process.env.NODE_ENV === 'development') if(process.env.NODE_ENV === "development")console.log(cli.white(' lista instituciones vacía - omitiendo...')); 
            return; }
        if(listaInstituciones.length < 1){
            this.listaInstituciones.forEach( item => {item.darDeBajaBD();});
            return;
        }

        listaInstituciones.sort( (a,b) => a.idInstitucion < 1 ? 1 : a.idInstitucion - b.idInstitucion )
        
        if(listaInstituciones[listaInstituciones.length -1].idInstitucion < 1) {
            const insitucionesNuevas = listaInstituciones
                .splice( listaInstituciones.findIndex( institucion => institucion.idInstitucion < 1 ))
                .map( institucion => new Institucion(institucion,this));
            
            this.listaInstituciones = [...this.listaInstituciones , ...insitucionesNuevas]
        }


        listaInstituciones.forEach( institucion => {
            const instCargada = this.listaInstituciones.find( item => item.verDatos().idInstitucion === institucion.idInstitucion)
            if( !instCargada){
               this.listaInstituciones.push(new Institucion(institucion,this));
            }else {
                instCargada.editarDatos(institucion);
            }
        });
        this.listaInstituciones.forEach( item => {
            if(item.verDatos().idInstitucion > 0 && listaInstituciones.every( inst => inst.idInstitucion !== item.verDatos().idInstitucion)){ 
                item.darDeBajaBD();
            }
        }
           
        );
        
    };
    
    public cargarMetas(listaMetas ?: Array<IMeta> )
    {
        if( !listaMetas) {
            if(process.env.NODE_ENV === 'development') if(process.env.NODE_ENV === "development")console.log(cli.white(' lista metas vacía - omitiendo...')); 
            return; }
        if( listaMetas.length < 1) {
            this.listaMetas.forEach( item => {item.estadoEnBD = ESTADO_BD.B;});
            return;
        }
        listaMetas.sort( (a,b) => a.idMeta < 1 ? 1 : a.idMeta - b.idMeta )
        
        if(listaMetas[listaMetas.length -1].idMeta < 1) {
            const metasNuevas = listaMetas
                .splice( listaMetas.findIndex( meta => meta.idMeta < 1 ))
                .map( meta => new Meta(meta,this));
            
            this.listaMetas = [...this.listaMetas , ...metasNuevas]
        }

        listaMetas.forEach( dataMeta => {
            const metaCargada = this.listaMetas.find( item => item.verDatos().idMeta === dataMeta.idMeta );
            if( ! metaCargada ) {

                const nuevaMeta = new Meta(dataMeta,this);

                this.listaMetas.push(nuevaMeta);

            } else {

                metaCargada.editarDatos(dataMeta);
            }
           
        });

        this.listaMetas.forEach( item => {
            if( item.verDatos().idMeta > 0 && listaMetas.every(  meta => meta.idMeta !== item.verDatos().idMeta) ){
               item.estadoEnBD = ESTADO_BD.B;
            }
        });
        
    };
    public cargarUbicaciones( listaUbicaciones ?: Array<IUbicacion>)
    {
       if( !listaUbicaciones ){
            if(process.env.NODE_ENV === 'development') if(process.env.NODE_ENV === "development")console.log(cli.white(' lista ubicaciones vacía - omitiendo...')); 
            return; 
        }
       if( listaUbicaciones.length < 1) { 
            this.listaUbicaciones.forEach( item => {item.estadoEnBD = ESTADO_BD.B;} );
            return;
       }
       
       listaUbicaciones.sort( (a,b) => a.idUbicacion < 1 ? 1 : a.idUbicacion - b.idUbicacion )
       
       if(listaUbicaciones[listaUbicaciones.length -1].idUbicacion < 1) {
            const ubicacionesNuevas = listaUbicaciones
                .splice( listaUbicaciones.findIndex( ubicacion => ubicacion.idUbicacion < 1 ))
                .map( ubicacion => new Ubicacion(ubicacion,this));
            
            this.listaUbicaciones = [...this.listaUbicaciones , ...ubicacionesNuevas]
        }

       listaUbicaciones.forEach( dataUbicacion => {
            const ubicacionCargada = this.listaUbicaciones.find( item => item.verDatos().idUbicacion === dataUbicacion.idUbicacion );
            if(!ubicacionCargada){
                const nuevaUbicacion = new Ubicacion(dataUbicacion,this);
                this.listaUbicaciones.push(nuevaUbicacion);
            }else {
                ubicacionCargada.editarDatos(dataUbicacion);
    
            }
        })
       
        this.listaUbicaciones.forEach( item => {
            if(item.verDatos().idUbicacion > 0 &&  listaUbicaciones.every( ubicacion => ubicacion.idUbicacion !== item.verDatos().idUbicacion) ){
                item.estadoEnBD = ESTADO_BD.B;
            }
        } );
       
    };
    public cargarEnlaces(listaEnlaces ?: Array<IEnlace>)
    {
        if( !listaEnlaces ) {
            if(process.env.NODE_ENV === 'development') if(process.env.NODE_ENV === "development")console.log(cli.white(' lista enlaces vacía - omitiendo...')); 
            return;}
        if( listaEnlaces.length < 1) { 
            this.listaEnlaces.forEach( item => {item.estadoEnBD = ESTADO_BD.B; }) ;
            return;
         }

        listaEnlaces.sort( (a,b) => a.idEnlace < 1 ? 1 : a.idEnlace - b.idEnlace )
       
        if(listaEnlaces[listaEnlaces.length -1].idEnlace < 1) {
             const enlacesNuevos = listaEnlaces
                 .splice( listaEnlaces.findIndex( meta => meta.idEnlace < 1 ))
                 .map( enlace => new Enlace(enlace,this));
             
             this.listaEnlaces = [...this.listaEnlaces , ...enlacesNuevos]
         }
 

        listaEnlaces.forEach( dataEnlace => {
            const enlaceCargado = this.listaEnlaces.find( item => item.verDatos().idEnlace === dataEnlace.idEnlace );
            if(!enlaceCargado){
                this.listaEnlaces.push(new Enlace(dataEnlace,this));
            }else {
                enlaceCargado.editarDatos(dataEnlace);
        
            }
        })
        this.listaEnlaces.forEach( item => {
            if(item.verDatos().idEnlace && listaEnlaces.every( enlace => enlace.idEnlace !== item.verDatos().idEnlace) ){
                item.estadoEnBD = ESTADO_BD.B; 
               }
        }) ;
        
    }

    public static async validar ( data : IActividad & {
        
        listaRelaciones      ?: Map<ID_RELACION,ESTADO_BD>,
        listaObjetivos       ?: Map<ID_OBJETIVO,ESTADO_BD>,
        listaProgramasSIPPE  ?: Map<ID_PROG_SIPPE,ESTADO_BD>,
        listaMetas           ?: Array<IMeta>,
        listaUbicaciones     ?: Array<IUbicacion>,
        listaInstituciones   ?: Array<IInstitucion>,
        listaFechasPuntuales ?: Array<IFecha>,
        listaEnlaces         ?: Array<IEnlace>
    }, transaction ?: Transaction) : Promise<void> {
        await new BD.Actividad(data).validate({ skip : ['createdAt','updatedAt','deletedAt']});
        if(data.fechaDesde && data.fechaHasta  ){
           if(Date.parse(data.fechaDesde.toString()) > Date.parse(data.fechaHasta.toString()) ){
            throw INVALIDO.RANGO_ACT;
           } 
        } 
        if(data.listaEnlaces){
            if(process.env.NODE_ENV === 'development')if(process.env.NODE_ENV === "development")console.log("validando enlaces..")
           await Promise.all( data.listaEnlaces.map( async enlace =>await Enlace.validar(enlace)))
        }
        if(data.listaInstituciones){
            if(process.env.NODE_ENV === 'development')if(process.env.NODE_ENV === "development")console.log("validando instituciones..")
            data.listaInstituciones.forEach(institucion => Institucion.validar(institucion))
        }
        if(data.listaMetas){
            if(process.env.NODE_ENV === 'development')if(process.env.NODE_ENV === "development")console.log("validando metas..")
           await Promise.all( data.listaMetas.map( async meta =>await Meta.validar(meta)))
        }
        if(data.listaObjetivos){
            if(process.env.NODE_ENV === 'development')if(process.env.NODE_ENV === "development")console.log("validando objetivos..")
            await Promise.all( Array.from(data.listaObjetivos.values()).map( async (id: any) => await Objetivo.validar({idObjetivo : id},transaction) ) )
        }
        if(data.listaProgramasSIPPE){
            if(process.env.NODE_ENV === 'development')if(process.env.NODE_ENV === "development")console.log("validando programas sippe..")
            await Promise.all( Array.from(data.listaProgramasSIPPE.values()).map( async (id: any) => await ProgramaSIPPE.validar({idProgramaSippe : id},transaction) ) )
        }
        if(data.listaRelaciones){
           if(process.env.NODE_ENV === 'development') if(process.env.NODE_ENV === "development")console.log("validando relaciones..")
            await Promise.all( Array.from(data.listaRelaciones.values()).map( async (id: any) => await Relacion.validar({idRelacion : id},transaction) ) )
        }

        if(data.listaUbicaciones){
           if(process.env.NODE_ENV === 'development')if(process.env.NODE_ENV === "development")console.log("validando ubicaciones..")
            await Promise.all(data.listaUbicaciones.map( async ubi => await Ubicacion.validar(ubi)))
        }
        
        if(data.listaFechasPuntuales ){
           if(process.env.NODE_ENV === 'development') if(process.env.NODE_ENV === "development")console.log("validando fechas puntuales..")
           
            data.listaFechasPuntuales.forEach( fecha => 
                FechaPuntual.validar(
                    fecha,
                    new Date(data.fechaDesde || ''),
                    new Date(data.fechaHasta || '')
                ))
        }
        
        
    }

    /* Conexion BD */

    
    
    public async guardarEnBD( transaction ?: Transaction, transactionInsituciones ?: Transaction) : Promise<void> {
        if(process.env.NODE_ENV === "development")console.log('Actividad.guardarEnBD...');

        switch (this.estadoEnBD) {
            case ESTADO_BD.A:
                await this.darDeAltaBD(transaction);
                break;
            case ESTADO_BD.M:
                await this.modificarBD(transaction);
                break;
            case ESTADO_BD.B:
                await this.darDeBajaBD(transaction)
            default:
                break;
        }

        if(this.listaEnlaces.length){
            if(process.env.NODE_ENV === "development")console.log('guardando enlaces..')
            await Promise.all( this.listaEnlaces.map( async enlace => await enlace.guardarEnBD(transaction) ) )
        }
       
        if(this.listaFechasPuntuales.length){
            if(process.env.NODE_ENV === "development")console.log('guardando fecha puntuales..')
            await Promise.all( this.listaFechasPuntuales.map( async fechaPuntual => await fechaPuntual.guardarEnBD(transaction) ) )
        }
        if(this.listaInstituciones.length){
            if(process.env.NODE_ENV === "development")console.log('guardando instituciones ..');
        
            await Promise.all( this.listaInstituciones.map(  async institucion => await institucion.guardarEnBD(transaction) ) );
          
        }
        if(this.listaMetas.length){
            if(process.env.NODE_ENV === "development")console.log('guardando metas ..')
            await Promise.all( this.listaMetas.map( async meta => await meta.guardarEnBD(transaction) ) )
        }
        if(this.listaUbicaciones?.length){
            if(process.env.NODE_ENV === "development")console.log('guardando ubicaciones ..')
            await Promise.all( this.listaUbicaciones.map( async ubicacion => await ubicacion.guardarEnBD(transaction)  ));
        }
        if(this.data.listaObjetivos?.size){
            if(process.env.NODE_ENV === "development")console.log('guardando objetivos ..')
            await Objetivo.guardarPorActBD(this,this.data.listaObjetivos,transaction);

        }
        if(this.data.listaProgramasSIPPE?.size){
            if(process.env.NODE_ENV === "development")console.log('guardando programas ..')
            await ProgramaSIPPE.guardarPorActBD(this,this.data.listaProgramasSIPPE,transaction)

        }
        if(this.data.listaRelaciones?.size){
            if(process.env.NODE_ENV === "development")console.log('guardando relaciones ..')
            await Relacion.guardarPorActBD(this,this.data.listaRelaciones,transaction)

        }
       
    }
    public async darDeAltaBD(transaction?: Transaction): Promise<void> {

        this.data.idActividad = (await BD.Actividad.create(this.data,{transaction})).idActividad;
        
    }
    public async darDeBajaBD(transaction?: Transaction): Promise<void> {
        
        const resp = await BD.Actividad.destroy({
            where : {idActividad : this.verID()},
            transaction
        });
        if(resp < 1) throw ERROR.ACTIVIDAD_BAJA_BD;

        if(this.listaEnlaces.length) {
            this.listaEnlaces.forEach( item => item.estadoEnBD = ESTADO_BD.B);
        }
        if(this.listaFechasPuntuales.length) {
            this.listaFechasPuntuales.forEach( item => item.estadoEnBD = ESTADO_BD.B);
        }
        if(this.listaInstituciones.length) {
            this.listaInstituciones.forEach( item => item.estadoEnBD = ESTADO_BD.B);
        }
        if(this.listaUbicaciones.length) {
            this.listaUbicaciones.forEach( item => item.estadoEnBD = ESTADO_BD.B);
        }
        if(this.data.listaObjetivos) {
            Array.from(this.data.listaObjetivos.keys()).forEach( item => this.data.listaObjetivos?.set(item,ESTADO_BD.B)  )
        }
        if(this.data.listaRelaciones) {
            Array.from(this.data.listaRelaciones.keys()).forEach( item => this.data.listaRelaciones?.set(item,ESTADO_BD.B)  )
        }
        if(this.data.listaProgramasSIPPE) {
            Array.from(this.data.listaProgramasSIPPE.keys()).forEach( item => this.data.listaProgramasSIPPE?.set(item,ESTADO_BD.B)  )
        }
        if(this.listaMetas) {
            this.listaMetas.forEach( meta => meta.estadoEnBD = ESTADO_BD.B);
        }
        
    }
    public async modificarBD(transaction?: Transaction): Promise<void> {


       const resp = await BD.Actividad.update( 
        this.data, 
        { 
            where : {idActividad : this.verID()}, 
            transaction 
        }
        );
    
        if(resp[0] < 1 ) throw ERROR.ACTIVIDAD_MOD_BD;

    }
    public static async buscarPorIDBD(id: number): Promise<Actividad> { 
        if(process.env.NODE_ENV === "development")console.log('buscando actividad..',id)

        let salida : Actividad = new Actividad(ACTIVIDAD_NULA);
        
        const bdActividad  = await BD.Actividad.findByPk(id);

        if(!bdActividad) throw ERROR.ACTIVIDAD_INEXISTENTE;

        salida.editar(bdActividad.dataValues);

        let listaIdsUbicacionesAsociadas : ID_UBICACION[] = [];
        let listaIdsInstitucionesAsociadas : ID_INSTITUCION[] = [];
        let listaIdsFechasPuntualesAsociadas : ID_FECHA[] = [];

        const cola = new ColaDeTareas();
        cola.push(
            ()=> BD.Actividad.sequelize?.transaction( {logging : process.env.NODE_ENV === "development" ? console.log : undefined},async transaction=>{
                
                await Promise.all([
                    Objetivo.buscarPorActBD(salida,transaction),
                    ProgramaSIPPE.buscarPorActBD(salida,transaction),
                    Relacion.buscarPorActBD(salida,transaction)
                ]);

                
            })
        );
        cola.push(
            ()=> BD.Actividad.sequelize?.transaction( {logging : process.env.NODE_ENV === "development" ? console.log : undefined},async transaction=>{
                await Promise.all([
                    FechaPuntual.buscarAsociadasPorActBD(salida,transaction).then(resp => listaIdsFechasPuntualesAsociadas.push(...resp)) ,
                    Institucion.buscarAsociadasPorActBD(salida,transaction).then(resp => listaIdsInstitucionesAsociadas.push(...resp)) ,
                    Ubicacion.buscarAsociadasPorActBD(salida,transaction).then(resp => listaIdsUbicacionesAsociadas.push(...resp))
                ])
            })
        );


        await cola.resolverSinDelay();
        

        cola.push(
            ()=> BD.Actividad.sequelize?.transaction( {logging : process.env.NODE_ENV === "development" ? console.log : undefined},async transaction=>{
            
                
                await Promise.all([
                    Enlace.buscarPorActBD(salida,transaction), 
                    FechaPuntual.buscarPorActBD(listaIdsFechasPuntualesAsociadas,salida,transaction),
                    Institucion.buscarPorActBD(listaIdsInstitucionesAsociadas,salida,transaction),
                    Meta.buscarPorActBD(salida,transaction),
                    Ubicacion.buscarPorActBD(listaIdsUbicacionesAsociadas,salida,transaction)
                ]);
            })
        );
        await cola.resolverSinDelay();
        


        salida.estadoEnBD = ESTADO_BD.M;

        return salida;
    } ;
    public static async buscarPorAreaID(id : ID_AREA, anio: number,offset ?: number, limit ?: number,keyword ?: string ,transaction ?: Transaction) : Promise<IItemActividad[]>{
        let salida : IItemActividad[] = [];
        let opcionesBusqueda : {} = {
            idArea : id , 
            createdAt : {[Op.gt] : new Date(`${anio}-01-01`) }
        };
        if(keyword){
            opcionesBusqueda = {
                ...opcionesBusqueda,
                desc :  { [Op.like] : `%${keyword}%`}
            }
        }
        salida = (await BD.Actividad.findAll({  
            where : opcionesBusqueda , 
            offset,
            limit,
            transaction
        }))
            .map( (data : any)=> ({
                idActividad : data.idActividad, 
                desc : data.desc
            }));
        
        return salida;
    }

}
   

export {IActividad, ID_ACT,ACTIVIDAD_NULA,IRequestActividad,IResponseActividad,IItemActividad }

export default Actividad;