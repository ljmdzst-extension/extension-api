import * as Sequelize from 'sequelize';
import cli from 'cli-color';
import { DataTypes, Model, Optional, Transaction } from 'sequelize';
// import { AreaId } from './Area';
// import { Enlace, TEnlace } from './Enlace';
// import { FechaPuntual, TFecha } from './FechaPuntual';
// import { Institucion } from './Institucion';
// import { Meta } from './Meta';
// import { Objetivo, ObjetivoId } from './Objetivo';
// import { ProgramaSippeId } from './ProgramaSippe';
// import { Relacion, RelacionId } from './Relacion';
// import { Ubicacion } from './Ubicacion';
// import { ESTADO_BD } from '../types/general';
// import { BD } from '../config/dbConfig';
// import { ERROR } from '../logs/errores';

export interface ActividadAttributes {
  idActividad: number;
  idArea: number;
  idUsuario?: string;
  nro?: number;
  desc: string;
  motivoCancel?: string | null;
  fechaDesde?: string;
  fechaHasta?: string;
  createdAt ?: string;
}

export type ActividadPk = "idActividad";
export type ActividadId = Actividad[ActividadPk];
export type ActividadOptionalAttributes = "idActividad" | "idUsuario" | "nro" | "motivoCancel" | "fechaDesde" | "fechaHasta" ;
export type ActividadCreationAttributes = Optional<ActividadAttributes, ActividadOptionalAttributes>;

// type TRequestActividad = ActividadAttributes & {
//   listaRelaciones      ?: Array<RelacionId>,
//   listaObjetivos       ?: Array<ObjetivoId>,
//   listaProgramasSIPPE  ?: Array<ProgramaSippeId>,
//   listaMetas           ?: Array<TMeta>,
//   listaUbicaciones     ?: Array<TUbicacion>,
//   listaInstituciones   ?: Array<TInstitucion>,
//   listaFechasPuntuales ?: Array<TFecha>,
//   listaEnlaces         ?: Array<TEnlace>
// }

// type TResponseActividad = TRequestActividad;

export type TItemActividad = {
  idActividad : ActividadId,
  desc : string
} 

const ATRIBUTOS_TABLA_ACTIVIDAD_CONFIG = {
  idActividad: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  idArea: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Area',
      key: 'idArea'
    }
  },
  idUsuario: {
    type: DataTypes.STRING(255),
    allowNull: true,
    references: {
      model: 'Usuario',
      key: 'idUsuario'
    }
  },
  nro: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  desc: {
    type: DataTypes.STRING(2000),
    allowNull: false
  },
  motivoCancel: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  fechaDesde: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  fechaHasta: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  createdAt : {
    type : DataTypes.DATEONLY,
    allowNull : true
  }
}

const ACTIVIDAD_NULA = {idActividad : 0, idArea : 0, nro : 0 , desc : ''};
  

export class Actividad extends Model<ActividadAttributes, ActividadCreationAttributes> implements ActividadAttributes {
  idActividad!: number;
  idArea!: number;
  idUsuario?: string;
  nro?: number;
  desc!: string;
  motivoCancel?: string | null;
  fechaDesde?: string;
  fechaHasta?: string;
  createdAt?: string;

//   public estadoEnBD !: ESTADO_BD;

//   private listaMetas !: Meta[];
//   private listaUbicaciones !: Ubicacion[];
//   private listaInstituciones !: Institucion[];
//   private listaFechasPuntuales !: FechaPuntual[];
//   private listaEnlaces !: Enlace[];

//   private listaRelaciones      ?: Map<RelacionId,ESTADO_BD>;
//   private listaObjetivos       ?: Map<ObjetivoId,ESTADO_BD>;
//   private listaProgramasSIPPE  ?: Map<ProgramaSippeId,ESTADO_BD>;



    
//     public editar(data : TRequestActividad)
//     {   
//         // validar antes
//         this.idActividad = data.idActividad;
//         this.idArea = data.idArea;
//         this.nro = data.nro;
//         this.desc = data.desc;
//         this.idUsuario = data.idUsuario;
//         this.fechaDesde = data.fechaDesde;
//         this.fechaHasta = data.fechaHasta;
//         this.motivoCancel = data.motivoCancel;

//         if(data.listaObjetivos){
//             this.cargarObjetivos(data.listaObjetivos);
//         }
//         if(data.listaProgramasSIPPE){
//             this.cargarProgramasSIPPE(data.listaProgramasSIPPE);
//         }
//         if(data.listaRelaciones){
//             this.cargarRelaciones(data.listaRelaciones);
//         }
//         this.cargarFechasPuntuales( 
//             new Date(this.fechaDesde || '') ,
//             new Date(this.fechaHasta || '') , 
//             data.listaFechasPuntuales || []
//         );
        
//         this.cargarInstituciones(data.listaInstituciones);

//         this.cargarMetas(data.listaMetas);
        
//         this.cargarUbicaciones(data.listaUbicaciones);

//         this.cargarEnlaces(data.listaEnlaces);
//     };
//     public cancelar( motCancel : string){
//         this.motivoCancel = motCancel;
//         this.estadoEnBD = ESTADO_BD.M;
//     }
//     public restaurar(){
//         this.motivoCancel = null;
//         this.estadoEnBD = ESTADO_BD.M;
//     }
    
//     public verID() : number 
//     {
//         return this.idActividad;
//     }
//     public verDatos() : TResponseActividad 
//     {
//         return {
//             ...this,
//             listaObjetivos : this.listaObjetivos? Array.from(this.listaObjetivos.keys()).filter( item => this.listaObjetivos?.get(item) === ESTADO_BD.A).sort( (a,b) => a-b) : [],
//             listaRelaciones : this.listaRelaciones? Array.from(this.listaRelaciones.keys()).filter( item => this.listaRelaciones?.get(item) === ESTADO_BD.A).sort( (a,b) => a-b) : [],
//             listaProgramasSIPPE : this.listaProgramasSIPPE? Array.from(this.listaProgramasSIPPE.keys()).filter( item => this.listaProgramasSIPPE?.get(item) === ESTADO_BD.A).sort( (a,b) => a-b) : [],
//             listaMetas : this.listaMetas.filter(item => !item.estaDeBaja()).map( item => item.verDatos()),
//             listaUbicaciones : this.listaUbicaciones.filter(item => !item.estaDeBaja()).map( item => item.verDatos()),
//             listaInstituciones : this.listaInstituciones.filter(item => !item.estaDeBaja()).map( item => item.verDatos()),
//             listaFechasPuntuales : this.listaFechasPuntuales.filter(item => !item.estaDeBaja()).map( item => item.verDatos()),
//             listaEnlaces : this.listaEnlaces.filter(item => !item.estaDeBaja()).map( item => item.verDatos()),
//         };
//     }

//     private cargarProgramasSIPPE( listaIds : Array<ProgramaSippeId>)
//     {   
//         if( !listaIds.length ) { 
//             if(process.env.NODE_ENV === 'development') console.log(cli.white(' lista prog SIPPE vacía - omitiendo...')); return; }

//         Array.from(this.listaProgramasSIPPE?.keys() || [])?.forEach( clave => this.listaProgramasSIPPE?.set(clave,ESTADO_BD.B) );
//         if(listaIds.length > 0){

//             listaIds.forEach( id => this.listaProgramasSIPPE?.set(id,ESTADO_BD.A));
//         }
        
        
//     };
//     private cargarRelaciones( listaIds : Array<RelacionId> )
//     {
//         if( !listaIds.length ) { 
//             if(process.env.NODE_ENV === 'development') console.log(cli.white(' lista relaciones vacía - omitiendo...')); return; }
      
//         Array.from(this.listaRelaciones?.keys() || [])
//             ?.forEach( clave => this.listaRelaciones?.set(clave,ESTADO_BD.B) );
        
//         if(listaIds.length > 0){
//             listaIds.forEach( id => this.listaRelaciones?.set(id,ESTADO_BD.A));
//         }
        
       
//     };
//     private cargarObjetivos( listaIds : Array<ObjetivoId> )
//     {
//         if( !listaIds.length ) { 
//             if(process.env.NODE_ENV === 'development') console.log(cli.white(' lista objetivos vacía - omitiendo...')); return; }
        
//         Array.from(this.listaObjetivos?.keys() || [])?.forEach( clave => this.listaObjetivos?.set(clave,ESTADO_BD.B) );

//         if(listaIds.length > 0){
//             listaIds.forEach( id => this.listaObjetivos?.set(id,ESTADO_BD.A))
//         }

//     };
//     private cargarFechasPuntuales(desde : Date , hasta : Date , listaFechas ?: Array<TFecha> )
//     {
//         if( !listaFechas) {console.log(cli.white(' lista fechas puntuales vacía - omitiendo...')); return;}
//         if( listaFechas.length < 1) { 
//             this.listaFechasPuntuales.forEach( item => {item.darDeBajaBD();});
//             return;
//          }

//         listaFechas.sort( (a,b) => a.idFecha < 1 ? 1 : a.idFecha - b.idFecha )
        
//         if(listaFechas[listaFechas.length -1].idFecha < 1) {
//             const fechasNuevas = listaFechas
//                 .splice( listaFechas.findIndex( fecha => fecha.idFecha < 1 ))
//                 .map( fecha => new FechaPuntual(fecha,this));
            
//             this.listaFechasPuntuales = [...this.listaFechasPuntuales , ...fechasNuevas]
//         }

//         listaFechas.forEach( fecha => {
//             const fechaCargada = this.listaFechasPuntuales.find( item => item.verDatos().idFecha === fecha.idFecha);
//             if( !fechaCargada ){
//                 const iFechaPuntual = FechaPuntual.crear(fecha,this);
//                 if(!iFechaPuntual.estaEnRango(desde,hasta)) throw ERROR.FECHA_FUERA_DE_RANGO;
//                 this.listaFechasPuntuales.push(iFechaPuntual);
//             } 
//         });

//         this.listaFechasPuntuales.forEach( item => {
//             if( item.verDatos().idFecha > 0 && listaFechas.every( fecha => fecha.idFecha !== item.verDatos().idFecha) ){
//                 item.darDeBajaBD();
//             }
//         });
      
//     };
//     private cargarInstituciones( listaInstituciones ?: Array< TInstitucion> )
//     {

//         if( !listaInstituciones) {
//             if(process.env.NODE_ENV === 'development') console.log(cli.white(' lista instituciones vacía - omitiendo...')); 
//             return; }
//         if(listaInstituciones.length < 1){
//             this.listaInstituciones.forEach( item => {item.darDeBajaBD();});
//             return;
//         }

//         listaInstituciones.sort( (a,b) => a.idInstitucion < 1 ? 1 : a.idInstitucion - b.idInstitucion )
        
//         if(listaInstituciones[listaInstituciones.length -1].idInstitucion < 1) {
//             const insitucionesNuevas = listaInstituciones
//                 .splice( listaInstituciones.findIndex( institucion => institucion.idInstitucion < 1 ))
//                 .map( institucion => new Institucion(institucion,this));
            
//             this.listaInstituciones = [...this.listaInstituciones , ...insitucionesNuevas]
//         }


//         listaInstituciones.forEach( institucion => {
//             const instCargada = this.listaInstituciones.find( item => item.verDatos().idInstitucion === institucion.idInstitucion)
//             if( !instCargada){
//                this.listaInstituciones.push(new Institucion(institucion,this));
//             }else {
//                 instCargada.editarDatos(institucion);
//             }
//         });
//         this.listaInstituciones.forEach( item => {
//             if(item.verDatos().idInstitucion > 0 && listaInstituciones.every( inst => inst.idInstitucion !== item.verDatos().idInstitucion)){ 
//                 item.darDeBajaBD();
//             }
//         }
           
//         );
        
//     };
    
//     private cargarMetas(listaMetas ?: Array<TMeta> )
//     {
//         if( !listaMetas) {
//             if(process.env.NODE_ENV === 'development') console.log(cli.white(' lista metas vacía - omitiendo...')); 
//             return; }
//         if( listaMetas.length < 1) {
//             this.listaMetas.forEach( item => {item.estadoEnBD = ESTADO_BD.B;});
//             return;
//         }
//         listaMetas.sort( (a,b) => a.idMeta < 1 ? 1 : a.idMeta - b.idMeta )
        
//         if(listaMetas[listaMetas.length -1].idMeta < 1) {
//             const metasNuevas = listaMetas
//                 .splice( listaMetas.findIndex( meta => meta.idMeta < 1 ))
//                 .map( meta => new Meta(meta,this));
            
//             this.listaMetas = [...this.listaMetas , ...metasNuevas]
//         }

//         listaMetas.forEach( dataMeta => {
//             const metaCargada = this.listaMetas.find( item => item.verDatos().idMeta === dataMeta.idMeta );
//             if( ! metaCargada ) {

//                 const nuevaMeta = new Meta(dataMeta,this);

//                 this.listaMetas.push(nuevaMeta);

//             } else {

//                 metaCargada.editarDatos(dataMeta);
//             }
           
//         });

//         this.listaMetas.forEach( item => {
//             if( item.verDatos().idMeta > 0 && listaMetas.every(  meta => meta.idMeta !== item.verDatos().idMeta) ){
//                item.estadoEnBD = ESTADO_BD.B;
//             }
//         });
        
//     };
//     private cargarUbicaciones( listaUbicaciones ?: Array<TUbicacion>)
//     {
//        if( !listaUbicaciones ){
//         if(process.env.NODE_ENV === 'development') console.log(cli.white(' lista ubicaciones vacía - omitiendo...')); 
//         return; }
//        if( listaUbicaciones.length < 1) { 
//         this.listaUbicaciones.forEach( item => {item.estadoEnBD = ESTADO_BD.B;} );
//         return;
//        }
       
//        listaUbicaciones.sort( (a,b) => a.idUbicacion < 1 ? 1 : a.idUbicacion - b.idUbicacion )
       
//        if(listaUbicaciones[listaUbicaciones.length -1].idUbicacion < 1) {
//             const ubicacionesNuevas = listaUbicaciones
//                 .splice( listaUbicaciones.findIndex( ubicacion => ubicacion.idUbicacion < 1 ))
//                 .map( ubicacion => new Ubicacion(ubicacion,this));
            
//             this.listaUbicaciones = [...this.listaUbicaciones , ...ubicacionesNuevas]
//         }

//        listaUbicaciones.forEach( dataUbicacion => {
//             const ubicacionCargada = this.listaUbicaciones.find( item => item.verDatos().idUbicacion === dataUbicacion.idUbicacion );
//             if(!ubicacionCargada){
//                 const nuevaUbicacion = new Ubicacion(dataUbicacion,this);
//                 this.listaUbicaciones.push(nuevaUbicacion);
//             }else {
//                 ubicacionCargada.editarDatos(dataUbicacion);
    
//             }
//         })
       
//         this.listaUbicaciones.forEach( item => {
//             if(item.verDatos().idUbicacion > 0 &&  listaUbicaciones.every( ubicacion => ubicacion.idUbicacion !== item.verDatos().idUbicacion) ){
//                 item.estadoEnBD = ESTADO_BD.B;
//             }
//         } );
       
//     };
//     private cargarEnlaces(listaEnlaces ?: Array<TEnlace>)
//     {
//         if( !listaEnlaces ) {
//             if(process.env.NODE_ENV === 'development') console.log(cli.white(' lista enlaces vacía - omitiendo...')); 
//             return;}
//         if( listaEnlaces.length < 1) { 
//             this.listaEnlaces.forEach( item => {item.estadoEnBD = ESTADO_BD.B; }) ;
//             return;
//          }

//         listaEnlaces.sort( (a,b) => a.idEnlace < 1 ? 1 : a.idEnlace - b.idEnlace )
       
//         if(listaEnlaces[listaEnlaces.length -1].idEnlace < 1) {
//              const enlacesNuevos = listaEnlaces
//                  .splice( listaEnlaces.findIndex( meta => meta.idEnlace < 1 ))
//                  .map( enlace => Enlace.crear(enlace,this));
             
//              this.listaEnlaces = [...this.listaEnlaces , ...enlacesNuevos]
//          }
 

//         listaEnlaces.forEach( dataEnlace => {
//             const enlaceCargado = this.listaEnlaces.find( item => item.verDatos().idEnlace === dataEnlace.idEnlace );
//             if(!enlaceCargado){
//                 this.listaEnlaces.push(new Enlace(dataEnlace,this));
//             }else {
//                 enlaceCargado.editarDatos(dataEnlace);
        
//             }
//         })
//         this.listaEnlaces.forEach( item => {
//             if(item.verDatos().idEnlace && listaEnlaces.every( enlace => enlace.idEnlace !== item.verDatos().idEnlace) ){
//                 item.estadoEnBD = ESTADO_BD.B; 
//                }
//         }) ;
        
//     }

//     public static async validar ( data : TRequestActividad, transaction ?: Transaction) : Promise<void> {
//         await new BD.Actividad(data).validate({ skip : ['createdAt','updatedAt','deletedAt']});
//         if(data.fechaDesde && data.fechaHasta  ){
//            if(Date.parse(data.fechaDesde.toString()) > Date.parse(data.fechaHasta.toString()) ){
//             throw INVALIDO.RANGO_ACT;
//            } 
//         } 
//         if(data.listaEnlaces){
//             if(process.env.NODE_ENV === 'development')console.log("validando enlaces..")
//            await Promise.all( data.listaEnlaces.map( async enlace =>await Enlace.validar(enlace)))
//         }
//         if(data.listaInstituciones){
//             if(process.env.NODE_ENV === 'development')console.log("validando instituciones..")
//             data.listaInstituciones.forEach(institucion => Institucion.validar(institucion))
//         }
//         if(data.listaMetas){
//             if(process.env.NODE_ENV === 'development')console.log("validando metas..")
//            await Promise.all( data.listaMetas.map( async meta =>await Meta.validar(meta)))
//         }
//         if(data.listaObjetivos){
//             if(process.env.NODE_ENV === 'development')console.log("validando objetivos..")
//             await Promise.all( Array.from(data.listaObjetivos.values()).map( async (id: any) => await Objetivo.validar({idObjetivo : id},transaction) ) )
//         }
//         if(data.listaProgramasSIPPE){
//             if(process.env.NODE_ENV === 'development')console.log("validando programas sippe..")
//             await Promise.all( Array.from(data.listaProgramasSIPPE.values()).map( async (id: any) => await ProgramaSIPPE.validar({idProgramaSippe : id},transaction) ) )
//         }
//         if(data.listaRelaciones){
//            if(process.env.NODE_ENV === 'development') console.log("validando relaciones..")
//             await Promise.all( Array.from(data.listaRelaciones.values()).map( async (id: any) => await Relacion.validar({idRelacion : id},transaction) ) )
//         }

//         if(data.listaUbicaciones){
//            if(process.env.NODE_ENV === 'development')console.log("validando ubicaciones..")
//             await Promise.all(data.listaUbicaciones.map( async ubi => await Ubicacion.validar(ubi)))
//         }
        
//         if(data.listaFechasPuntuales ){
//            if(process.env.NODE_ENV === 'development') console.log("validando fechas puntuales..")
           
//             data.listaFechasPuntuales.forEach( fecha => 
//                 FechaPuntual.validar(
//                     fecha,
//                     new Date(data.fechaDesde || ''),
//                     new Date(data.fechaHasta || '')
//                 ))
//         }
        
        
//     }

//     /* Conexion BD */

//     public async guardarEnBD( transaction ?: Transaction, transactionInsituciones ?: Transaction) : Promise<void> {
//         console.log('Actividad.guardarEnBD...');

//         switch (this.estadoEnBD) {
//             case ESTADO_BD.A:
//                 await this.darDeAltaBD(transaction);
//                 break;
//             case ESTADO_BD.M:
//                 await this.modificarBD(transaction);
//                 break;
//             case ESTADO_BD.B:
//                 await this.darDeBajaBD(transaction)
//             default:
//                 break;
//         }

//         if(this.listaEnlaces.length){
//             console.log('guardando enlaces..')
//             await Promise.all( this.listaEnlaces.map( async enlace => await enlace.guardarEnBD(transaction) ) )
//         }
//         if(this.listaFechasPuntuales.length){
//             console.log('guardando fecha puntuales..')
//             await Promise.all( this.listaFechasPuntuales.map( async fechaPuntual => await fechaPuntual.guardarEnBD(transaction) ) )
//         }
//         if(this.listaInstituciones.length){
//             console.log('guardando instituciones ..');
        
//             await Promise.all( this.listaInstituciones.map(  async institucion => await institucion.guardarEnBD(transaction,transactionInsituciones) ) );
          
//         }
//         if(this.listaMetas.length){
//             console.log('guardando metas ..')
//             await Promise.all( this.listaMetas.map( async meta => await meta.guardarEnBD(transaction) ) )
//         }
//         if(this.listaUbicaciones?.length){
//             console.log('guardando ubicaciones ..')
//             await Promise.all( this.listaUbicaciones.map( async ubicacion => await ubicacion.guardarEnBD(transaction)  ));
//         }
//         if(this.listaObjetivos?.size){
//             console.log('guardando objetivos ..')
//             await Objetivo.guardarPorActBD(this,this.listaObjetivos,transaction);

//         }
//         if(this.listaProgramasSIPPE?.size){
//             console.log('guardando programas ..')
//             await ProgramaSIPPE.guardarPorActBD(this,this.listaProgramasSIPPE,transaction)

//         }
//         if(this.listaRelaciones?.size){
//             console.log('guardando relaciones ..')
//             await Relacion.guardarPorActBD(this,this.listaRelaciones,transaction)

//         }
       
//     }
//     private async darDeAltaBD(transaction?: Transaction): Promise<void> {

//         this.idActividad = (await BD.Actividad.create(this,{transaction})).idActividad;
        
//     }
//     private async darDeBajaBD(transaction?: Transaction): Promise<void> {
        
//         const resp = await BD.Actividad.destroy({
//             where : {idActividad : this.verID()},
//             transaction
//         });
//         if(resp < 1) throw ERROR.ACTIVIDAD_BAJA_BD;

//         if(this.listaEnlaces.length) {
//             this.listaEnlaces.forEach( item => item.estadoEnBD = ESTADO_BD.B);
//         }
//         if(this.listaFechasPuntuales.length) {
//             this.listaFechasPuntuales.forEach( item => item.estadoEnBD = ESTADO_BD.B);
//         }
//         if(this.listaInstituciones.length) {
//             this.listaInstituciones.forEach( item => item.estadoEnBD = ESTADO_BD.B);
//         }
//         if(this.listaUbicaciones.length) {
//             this.listaUbicaciones.forEach( item => item.estadoEnBD = ESTADO_BD.B);
//         }
//         if(this.listaObjetivos) {
//             Array.from(this.listaObjetivos.keys()).forEach( item => this.listaObjetivos?.set(item,ESTADO_BD.B)  )
//         }
//         if(this.listaRelaciones) {
//             Array.from(this.listaRelaciones.keys()).forEach( item => this.listaRelaciones?.set(item,ESTADO_BD.B)  )
//         }
//         if(this.listaProgramasSIPPE) {
//             Array.from(this.listaProgramasSIPPE.keys()).forEach( item => this.listaProgramasSIPPE?.set(item,ESTADO_BD.B)  )
//         }
//         if(this.listaMetas) {
//             this.listaMetas.forEach( meta => meta.estadoEnBD = ESTADO_BD.B);
//         }
        
//     }
//     private async modificarBD(transaction?: Transaction): Promise<void> {


//        const resp = await BD.Actividad.update( 
//         this, 
//         { 
//             where : {idActividad : this.verID()}, 
//             transaction 
//         }
//         );
    
//         if(resp[0] < 1 ) throw ERROR.ACTIVIDAD_MOD_BD;

//     }
//     public static async buscarPorIDBD(id: number, transaction?: Transaction, transactionInsituciones ?: Transaction): Promise<Actividad> { 
//         console.log('buscando actividad..',id)

//         let salida : Actividad = BD.Actividad.build(ACTIVIDAD_NULA,);
        
//         const bdActividad  = await BD.Actividad.findByPk(id,{transaction});

//         if(!bdActividad) throw ERROR.ACTIVIDAD_INEXISTENTE;

//         salida.editar(bdActividad.dataValues);

//         console.log('cargando enlaces..')
//         const bdEnlaces = await BD.Enlace.buscarPorActBD(salida.verID(),transaction);
//         if(bdEnlaces)salida.cargarEnlaces(bdEnlaces.map(enlace => enlace.verDatos()));

//         console.log('cargando rango ejecución y fechas puntuales..');
//         if(salida.fechaDesde && salida.fechaHasta){
//             console.log('cargando fecha puntuales')
//             const bdFechasPuntuales = await FechaPuntual.buscarPorActBD(salida,transaction);
//             salida.cargarFechasPuntuales(
//                 new Date(salida.data.fechaDesde ),
//                 new Date(salida.data.fechaHasta),
//                 bdFechasPuntuales.map(fecha => fecha.verDatos())
//             );
//         }

//         console.log('cargando instituciones ..')
//         const bdInsituciones = await BD.Institucion.buscarPorActBD(salida,transaction,transactionInsituciones);
//         if(bdInsituciones) salida.cargarInstituciones(bdInsituciones.map(inst => inst.verDatos()));
        
//         console.log('cargando metas ..')
//         const bdMetas = await BD.Meta.buscarPorActBD(salida,transaction);
//         if(bdMetas) salida.cargarMetas(bdMetas.map(meta => meta.verDatos()));


//         console.log('cargando ubicaciones')
//         const bdUbicaciones = await BD.Ubicacion.buscarPorActBD(salida.verID(),transaction);
//         if(bdUbicaciones) salida.cargarUbicaciones(bdUbicaciones.map(ubicacion => ubicacion.verDatos()));
        
//         console.log('cargando objetivos ..')
//         const bdObjetivos = await BD.Objetivo.buscarPorActBD(salida,transaction);
//         salida.cargarObjetivos(bdObjetivos);
       
//         console.log('cargando programas ..')
//         const bdProgramas = await ProgramaSIPPE.buscarPorActBD(salida,transaction);
//         salida.cargarProgramasSIPPE( bdProgramas  )
        
//         console.log('cargando relaciones ..')
//         const bdRelacioness = await BD.Relacion.buscarPorActBD(salida,transaction);
//         salida.cargarRelaciones( bdRelacioness  );
        

//         salida.estadoEnBD = ESTADO_BD.M;
//         return salida;
//     } ;
//     public static async buscarPorAreaID(id : AreaId, transaction ?: Transaction) : Promise<TItemActividad[]>{
//         let salida : TItemActividad[] = [];

//         salida = (await BD.Actividad.findAll({  where : {idArea : id}, transaction}))
//             .map( (data : any)=> ({
//                 idActividad : data.idActividad, 
//                 desc : data.desc
//             }));
        
//         return salida;
//     }


  static initModel(sequelize: Sequelize.Sequelize): typeof Actividad {
    return Actividad.init(ATRIBUTOS_TABLA_ACTIVIDAD_CONFIG, {
    sequelize,
    tableName: 'Actividad',
    timestamps: true,
    paranoid: true
  });
  }
}
