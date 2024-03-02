import { Propuesta, PropuestaAttributes } from "../models/Propuesta";
import { PropuestaCapacitacion } from "../models/PropuestaCapacitacion";
import { PropuestaLineaTematica } from "../models/PropuestaLineaTematica";
import { PropuestaProgramaExtension } from "../models/PropuestaProgramaExtension";
import { PropuestaPalabraClave } from "../models/PropuestaPalabraClave";
import { PropuestaInstitucion } from "../models/PropuestaInstitucion";
import { Integrante } from "../models/Integrante";
import { ObjetivoEspecifico } from "../models/ObjetivoEspecifico";
import { IServiciosModelo } from "./IServiciosModelo";
import { PropuestaRelacionada } from "../models/PropuestaRelacionada";
import { PropuestaPrevia } from "../models/PropuestaPrevia";
import ServiciosIntegrantes, { IServiciosIntegrantes, TIntegranteIn, TIntegranteOut } from "./integrante";
import { ServiciosActividadObjetivoEspecifico, ServiciosObjetivoEspecifico, TObjEspIn, TObjEspOut, iServiciosObjetivoEspecifico } from "./planificacion";
import ServiciosInstitucion, { IServiciosInstitucion, TInstitucionIn, TInstitucionOut } from "./institucion";
import { Op, Transaction } from "sequelize";
import SPalabraClave, { ISPalabraClave, TPalabraClaveIn, TPalabraClaveOut } from "./palabraClave";
import SCapacitacion, { TPropuestaCapacitacionIn, TPropuestaCapacitacionOut } from "./capacitacion";
import SProgramaExtension, { TPropuestaProgramaExtensionIn, TPropuestaProgramaExtensionOut } from "./sippe";
import SLineaTematica, { TPropuestaLineaTematicaIn, TPropuestaLineaTematicaOut } from "./lineaTematica";
import SPropuestaPrevia, { TPropuestaPreviaIn, TPropuestaPreviaOut } from "./propPrevia";
import SPropuestaRelacionada, { TPropuestaRelacionadaIn, TPropuestaRelacionadaOut } from "./propRel";


type TServicio = string;

export type TpropuestaIn = PropuestaAttributes & {
    integrantes ?: TIntegranteIn[],
    instituciones ?: TInstitucionIn[],
    objetivosEspecificos ?: TObjEspIn[],
    propuestaPalabrasClave ?: TPalabraClaveIn[],
    propuestaCapacitaciones ?: TPropuestaCapacitacionIn[],
    propuestaLineasTematicas ?: TPropuestaLineaTematicaIn[],
    propuestaProgramasExtension ?: TPropuestaProgramaExtensionIn[],
    propuestasRelacionadas ?: TPropuestaRelacionadaIn[],
    propuestasPrevias ?: TPropuestaPreviaIn[]
}

type TpropuestaOut = PropuestaAttributes & {
    integrantes ?: TIntegranteOut[],
    instituciones ?: TInstitucionOut[],
    objetivosEspecificos ?: TObjEspOut[],
    propuestaPalabrasClave ?: TPalabraClaveOut[],
    propuestaCapacitaciones ?: TPropuestaCapacitacionOut[],
    propuestaLineasTematicas ?: TPropuestaLineaTematicaOut[],
    propuestaProgramasExtension ?: TPropuestaProgramaExtensionOut[],
    propuestasRelacionadas ?: TPropuestaRelacionadaOut[],
    propuestasPrevias ?: TPropuestaPreviaOut[]
}

export default class ServiciosPropuesta implements IServiciosModelo {
    
    private lServiciosModelo !: Map<TServicio,IServiciosModelo>

    constructor(){
        this.lServiciosModelo = new Map();
        this.lServiciosModelo.set('INTEG',new ServiciosIntegrantes());
        this.lServiciosModelo.set('OBJESP',new ServiciosObjetivoEspecifico());
        this.lServiciosModelo.set('ACTOBJESP',new ServiciosActividadObjetivoEspecifico());
        this.lServiciosModelo.set('INST',new ServiciosInstitucion());
        this.lServiciosModelo.set('PALCLA',new SPalabraClave());
        this.lServiciosModelo.set('CAPAC',new SCapacitacion());
        this.lServiciosModelo.set('SIPPE',new SProgramaExtension());
        this.lServiciosModelo.set('LITEM',new SLineaTematica());
        this.lServiciosModelo.set('PROPPREV',new SPropuestaPrevia());
        this.lServiciosModelo.set('PROPREL',new SPropuestaRelacionada());
        
    }
    async definirPersistencia( iPropuesta : Propuesta, transaction?: Transaction | undefined): Promise<void> {
        await Propuesta.findByPk(iPropuesta.codigoPropuesta,{transaction}).then( resp => iPropuesta.isNewRecord = resp === null)
    }
     
    async leerDatosDeBD (iPropuesta : Propuesta) {

        await iPropuesta.sequelize.transaction( async transaction => {
            await Promise.all([
             iPropuesta.getIntegrantes({transaction}).then( resp => iPropuesta.integrantes = resp ),
             iPropuesta.getObjetivoEspecificos({transaction}).then( resp => iPropuesta.objetivoEspecificos = resp ),
             iPropuesta.getParticipanteSociales({transaction}).then( resp => iPropuesta.participanteSociales = resp ),
             iPropuesta.getPropuestaCapacitaciones({transaction}).then( resp => iPropuesta.propuestaCapacitaciones = resp ),
             iPropuesta.getPropuestaLineaTematicas({transaction}).then( resp => iPropuesta.propuestaLineaTematicas = resp ),
             iPropuesta.getPropuestaInstituciones({transaction}).then( resp => iPropuesta.propuestaInstituciones = resp ),
             iPropuesta.getPropuestaPalabraClaves({transaction}).then( resp => iPropuesta.propuestaPalabraClaves = resp ),
             iPropuesta.getPropuestaProgramaExtensions({transaction}).then( resp => iPropuesta.propuestaProgramaExtensions = resp ), 
             iPropuesta.getPropuestasPrevias({transaction}).then( resp => iPropuesta.propuestasPrevias = resp ),
             iPropuesta.getPropuestaRelacionadas({transaction}).then( resp => iPropuesta.propuestaRelacionadas = resp ),
             iPropuesta.getUbicacionProblematicas({transaction}).then( resp => iPropuesta.ubicacionProblematicas = resp ),
            ]);
        });
        await this.leerDatosIntegrantes(iPropuesta);
        await this.leerDatosInstituciones(iPropuesta);
        await this.leerDatosObjetivos(iPropuesta);
        await this.leerDatosPalabrasClave(iPropuesta);       
    }
    

    async guardarDatosEnBD (iPropuesta : Propuesta ) : Promise<void> {

        await iPropuesta.save();

        await this.guardarDatosLineasTematicas(iPropuesta);

        await this.guardarDatosCapacitaciones(iPropuesta);

        await this.guardarDatosProgramasExtension(iPropuesta);

     
        await this.guardarDatosInstituciones(iPropuesta);

        await this.guardarDatosIntegrantes(iPropuesta);

        await this.guardarDatosObjetivos(iPropuesta);

        await this.guardarDatosPalabrasClave(iPropuesta);

        await this.guardarDatosPropuestasPrevias(iPropuesta);

        await this.guardarDatosPropuestaRelacionada(iPropuesta);
        
    }

    editarDatos( iPropuesta : Propuesta, data: TpropuestaIn ) {
       iPropuesta.set(data);
       console.log('inicio cargas')
       if(data.integrantes && data.integrantes.length){
          const SIntegrantes = this.lServiciosModelo.get('INTEG') as IServiciosIntegrantes;
          const lIntegrantes = data.integrantes.map( (integ : any) => SIntegrantes.crearIntegrante( integ))
          this.cargarIntegrantes(iPropuesta,lIntegrantes);
       }
       if(data.instituciones && data.instituciones.length) {
           const SIntituciones =this.lServiciosModelo.get('INST') as IServiciosInstitucion;
           const lInstituciones = data.instituciones.map( (inst : any)=> SIntituciones.crearInstitucion(inst))
           this.cargarInstituciones(iPropuesta,lInstituciones);
       }
       if(data.objetivosEspecificos && data.objetivosEspecificos.length) {
           const SObjetivos = this.lServiciosModelo.get('OBJESP') as iServiciosObjetivoEspecifico;
           const lObjetivos = data.objetivosEspecificos.map(  (obj : any) => SObjetivos.crearObjetivoEspecifico(obj) );
           this.cargarObjetivosEspecificos(iPropuesta,lObjetivos);
       }
       if(data.propuestaPalabrasClave){
            const SPalabraClave = this.lServiciosModelo.get('PALCLA') as ISPalabraClave;
            const lPalabraClaves =data.propuestaPalabrasClave.map( (propPalabra : any) => SPalabraClave.crearPalabraClave(propPalabra)) 
            this.cargarPalabrasClave(iPropuesta,lPalabraClaves);
       }
       if(data.propuestaLineasTematicas){
           this.cargarLineasTematicas(iPropuesta,PropuestaLineaTematica.bulkBuild(data.propuestaLineasTematicas))
       }
       if(data.propuestaCapacitaciones){
           this.cargarCapacitaciones(iPropuesta,PropuestaCapacitacion.bulkBuild(data.propuestaCapacitaciones))
       }
       if(data.propuestaProgramasExtension){
           this.cargarProgramasSippe(iPropuesta,PropuestaProgramaExtension.bulkBuild(data.propuestaProgramasExtension))
       }
       if(data.propuestasPrevias){
           this.cargarPropPrevias(iPropuesta,PropuestaPrevia.bulkBuild(data.propuestasPrevias))
       }
       if(data.propuestasRelacionadas){
           this.cargarPropRelacionadas(iPropuesta,PropuestaRelacionada.bulkBuild(data.propuestasRelacionadas))
       }
    }

    verDatos(iPropuesta : Propuesta) : TpropuestaOut {
        let salida : TpropuestaOut = iPropuesta.dataValues;
        
        salida = {...salida, integrantes : this.verIntegrantes(iPropuesta) }
        salida = {...salida, instituciones : this.verInstituciones(iPropuesta)}
        salida = {...salida, objetivosEspecificos : this.verObjetivosEspecificos(iPropuesta)}
        salida = {...salida, propuestaProgramasExtension : this.verProgramasSippe(iPropuesta)}
        salida = {...salida, propuestasPrevias : this.verPropPrevias(iPropuesta)}
        salida = {...salida, propuestasRelacionadas : this.verPropRelacionadas(iPropuesta)}
        salida = {...salida, propuestaCapacitaciones : this.verCapacitaciones(iPropuesta)}
        salida = {...salida, propuestaLineasTematicas : this.verLineasTematicas(iPropuesta)}
        salida = {...salida, propuestaPalabrasClave : this.verPalabrasClave(iPropuesta)}

        return salida;
    }

   
    private cargarIntegrantes( iPropuesta : Propuesta, _integrantes : Integrante[] ) {
        console.log('carga integrantes')
        if(!iPropuesta.integrantes ) iPropuesta.integrantes = [];
        
        if(_integrantes.length ){
            _integrantes.forEach( integrante => {
               
             const integranteCargado =  iPropuesta.integrantes.find( integ => integ.nroDoc === integrante.nroDoc)
             if(integranteCargado){
                const dataNueva= this.lServiciosModelo.get('INTEG')?.verDatos(integrante);
                this.lServiciosModelo.get('INTEG')?.editarDatos( integranteCargado, dataNueva ); 
             } else {
             
                iPropuesta.integrantes.push(integrante);
             }
           });
          
        }
    }

    private cargarObjetivosEspecificos( iPropuesta : Propuesta, _objetivos : ObjetivoEspecifico[]) {
        console.log('carga objetivos')
        if(!iPropuesta.objetivoEspecificos ) iPropuesta.objetivoEspecificos = [];
       
        if(_objetivos.length ){
            _objetivos.forEach ( objetivo => {
                const objetivoCargado = iPropuesta.objetivoEspecificos.find( obj => obj.idObjetivoEspecifico === objetivo.idObjetivoEspecifico );
                if(objetivoCargado) {
                    const nuevData = this.lServiciosModelo.get('OBJESP')?.verDatos(objetivo);
                  
                    this.lServiciosModelo.get('OBJESP')?.editarDatos( objetivoCargado,nuevData);
                }else {
                    iPropuesta.objetivoEspecificos.push( objetivo );
                }
           })
        }
    }

    private cargarInstituciones( iPropuesta : Propuesta, _propuestaInstituciones : PropuestaInstitucion[]) {
        console.log('carga instituciones')
        if(!iPropuesta.propuestaInstituciones) iPropuesta.propuestaInstituciones = [];
       
        if(_propuestaInstituciones.length ){
            _propuestaInstituciones.forEach( propInst => {
             const instCargada = iPropuesta.propuestaInstituciones.find( propIsnt => propIsnt.idInstitucion === propInst.idInstitucion );
             if(instCargada){
                const nuevaData = this.lServiciosModelo.get('INST')?.verDatos(propInst); 
               this.lServiciosModelo.get('INST')?.editarDatos(instCargada, nuevaData);
             } else {
                iPropuesta.propuestaInstituciones.push( propInst );
             }
           })
        }
    }

    private cargarPropRelacionadas( iPropuesta : Propuesta, propuestasRelacionadas : PropuestaRelacionada[]) {
        if(!iPropuesta.propuestaRelacionadas) iPropuesta.propuestaRelacionadas = [];
        
        if(propuestasRelacionadas.length ){
            
            iPropuesta.propuestaRelacionadas = [];
            iPropuesta.propuestaRelacionadas.push( ...propuestasRelacionadas )
        }
    }

    private cargarPropPrevias( iPropuesta : Propuesta, propuestasPrevias : PropuestaPrevia[]) {
        if(!iPropuesta.propuestasPrevias) iPropuesta.propuestasPrevias = [];
        
        if(propuestasPrevias.length ){
            
            iPropuesta.propuestasPrevias = [];
            iPropuesta.propuestasPrevias.push( ...propuestasPrevias );
        }
    }
    
    private cargarCapacitaciones( iPropuesta : Propuesta, capacitaciones : PropuestaCapacitacion[]) {
        if(!iPropuesta.propuestaCapacitaciones) iPropuesta.propuestaCapacitaciones = [];
        if(capacitaciones.length ){
            
            iPropuesta.propuestaCapacitaciones = [];
            iPropuesta.propuestaCapacitaciones.push( ...capacitaciones )
        }
    }
    private cargarLineasTematicas( iPropuesta : Propuesta, lineasTematicas : PropuestaLineaTematica[]) {
        if(!iPropuesta.propuestaLineaTematicas) iPropuesta.propuestaLineaTematicas = [];
        if(lineasTematicas.length ){
            
            iPropuesta.propuestaLineaTematicas = [];
            iPropuesta.propuestaLineaTematicas.push( ...lineasTematicas )
        }
    }
    private cargarProgramasSippe( iPropuesta : Propuesta, progSippe : PropuestaProgramaExtension[]) {
        if(!iPropuesta.propuestaProgramaExtensions) iPropuesta.propuestaProgramaExtensions = [];
        if(progSippe.length ){
            
            iPropuesta.propuestaProgramaExtensions = [];
            iPropuesta.propuestaProgramaExtensions.push( ...progSippe )
        }
    }
    private cargarPalabrasClave( iPropuesta : Propuesta, palabrasClave : PropuestaPalabraClave[]) {
        if(!iPropuesta.propuestaPalabraClaves) iPropuesta.propuestaPalabraClaves = [];
        if(palabrasClave.length ){
            
            iPropuesta.propuestaPalabraClaves = [];
            iPropuesta.propuestaPalabraClaves.push( ...palabrasClave )
        }
    }
   
    private verIntegrantes( iPropuesta : Propuesta) {
        if(iPropuesta.integrantes.length ){
            return iPropuesta.integrantes;
        }
        return [];
    }

    private verObjetivosEspecificos( iPropuesta : Propuesta) {
        const SObjetivos = this.lServiciosModelo.get('OBJESP');
        if(iPropuesta.objetivoEspecificos.length ){
            return iPropuesta.objetivoEspecificos.map( objEsp => SObjetivos?.verDatos(objEsp))
        }
        return [];
    }
    private verInstituciones( iPropuesta : Propuesta) {
        const SInstituciones = this.lServiciosModelo.get('INST') as IServiciosInstitucion;
        if(iPropuesta.propuestaInstituciones && iPropuesta.propuestaInstituciones.length ){
          
           return iPropuesta.propuestaInstituciones.map( propInst => SInstituciones.verDatos(propInst) )
        }
        return [];
    }
    private verPropRelacionadas( iPropuesta : Propuesta) {
        if(iPropuesta.propuestaRelacionadas.length ){
           return iPropuesta.propuestaRelacionadas;
        }
        return [];
    }
    private verPropPrevias( iPropuesta : Propuesta) {
        if(iPropuesta.propuestasPrevias.length ){
           return iPropuesta.propuestasPrevias;
        }
        return [];
    }
    private verCapacitaciones( iPropuesta : Propuesta) {
        if(iPropuesta.propuestaCapacitaciones.length ){
           return iPropuesta.propuestaCapacitaciones
        }
        return [];
    }
    private verLineasTematicas( iPropuesta : Propuesta) {
        if(iPropuesta.propuestaLineaTematicas.length ){
           return iPropuesta.propuestaLineaTematicas;
        }
        return [];
    }
    private verProgramasSippe( iPropuesta : Propuesta) {
        if(iPropuesta.propuestaProgramaExtensions.length ){
            return iPropuesta.propuestaProgramaExtensions;
        }
        return [];
    }
    private verPalabrasClave( iPropuesta : Propuesta) {
        if(iPropuesta.propuestaPalabraClaves.length ){
            return iPropuesta.propuestaPalabraClaves.map( propPalabra => ({
                ...propPalabra.dataValues ,
                palabraClave : propPalabra.palabraClave.dataValues
            }));
        }
        return [];
    }
   
    private async leerDatosIntegrantes (iPropuesta : Propuesta) : Promise<void> {
       
        if(iPropuesta.integrantes.length) {
            const SIntegrantes  = this.lServiciosModelo.get('INTEG') as IServiciosIntegrantes;
            // : integrante.getPersona()
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.integrantes.map( integrante => SIntegrantes?.leerDatosDeBD(integrante,transaction)));
            })
             // : integrante.getRoles()
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.integrantes.map( integrante => SIntegrantes?.leerDatosRoles(integrante,transaction)));
            })
        }
    }

    private async leerDatosObjetivos(iPropuesta : Propuesta) : Promise<void> {
       
        if(iPropuesta.objetivoEspecificos.length) {
            const iServiciosObjetivoEspecifico = this.lServiciosModelo.get('OBJESP');
            
            // :ObjEspecifico.getActividades()
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.objetivoEspecificos.map( objEsp => iServiciosObjetivoEspecifico?.leerDatosDeBD(objEsp,transaction)) )
            })


            const iServiciosActividadObjetivoEspecifico = this.lServiciosModelo.get('ACTOBJESP');
             // :ActObjEspecifico.getCronogramas()
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(
                    iPropuesta.objetivoEspecificos
                        .map( objEsp => objEsp.actividadObjetivoEspecificos.map( actObjEsp => iServiciosActividadObjetivoEspecifico?.leerDatosDeBD(actObjEsp,transaction)))
                        .reduce( (salida,promsesas) => ([...salida,...promsesas]) ,[]) 
                    );
            })
        }
    }
    private async leerDatosInstituciones(iPropuesta : Propuesta) : Promise<void> {

        if(iPropuesta.propuestaInstituciones.length){ 
            const SInstituciones = this.lServiciosModelo.get('INST') as IServiciosInstitucion;
              // :PropuestaInstitucion.getInstitucion()
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.leerDatosDeBD(propInst,transaction)) )
            });
              // :Institucion.getResponsable()
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.leerDatosResponsable(propInst.institucion,transaction)) )
            });
               // :Responsable.getPersona()
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.leerDatosPersonalesResponsable(propInst.institucion,transaction)) )
            });
        }
    }
    private async leerDatosPalabrasClave(iPropuesta : Propuesta) : Promise<void> {
        
        if(iPropuesta.propuestaPalabraClaves.length) {
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaPalabraClaves.map( propPalabra => propPalabra.getPalabraClave({transaction}).then( resp => propPalabra.palabraClave = resp) ));
            });
        }
    }


    private async guardarDatosPalabrasClave( iPropuesta : Propuesta) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( 'ServiciosPropuesta.guardarDatosPalabrasClave()..' );
        if(iPropuesta.propuestaPalabraClaves.length) {
            const SPalabraClave = this.lServiciosModelo.get('PALCLA') as ISPalabraClave;
            await iPropuesta.sequelize.transaction(  async transaction=>{
                console.log('1');
                await Promise.all( iPropuesta.propuestaPalabraClaves.map( propPal => SPalabraClave.definirPersistenciaPalabra(propPal,transaction)))

            })

            await iPropuesta.sequelize.transaction( async transaction => {
                console.log('2');
                await Promise.all(  iPropuesta.propuestaPalabraClaves.map( propPal => SPalabraClave.guardarDatosPalabraEnBD(propPal,transaction)) )

            })
            await iPropuesta.sequelize.transaction(  async transaction=>{
                console.log('3');
                await Promise.all( iPropuesta.propuestaPalabraClaves.map( propPal => SPalabraClave.definirPersistencia(propPal,transaction)))

            })
            await iPropuesta.sequelize.transaction( async transaction => {
                console.log('4');
                await Promise.all(  iPropuesta.propuestaPalabraClaves.map( propPal => SPalabraClave.guardarDatosEnBD(propPal,transaction)) )

            })

            await PropuestaPalabraClave.destroy({where : {
                codigoPropuesta : iPropuesta.codigoPropuesta,
                idPalabraClave : {[Op.not] : iPropuesta.propuestaPalabraClaves.map( item => item.idPalabraClave)}
            }})
            
        }
    }
    private async guardarDatosIntegrantes( iPropuesta : Propuesta ) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( 'ServiciosPropuesta.guardarDatosIntegrantes()..' );
        if( iPropuesta.integrantes.length ) {
            
            const SIntegrantes  = this.lServiciosModelo.get('INTEG') as IServiciosIntegrantes;
            
            // persistencia integrantes
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(  iPropuesta.integrantes.map( integrante => SIntegrantes.definirPersistencia(integrante,transaction) ) )
            })

            // persistencia integrante -> persona
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(  iPropuesta.integrantes.map( integrante => SIntegrantes.definirPersistenciaPersona(integrante,transaction) ) )
            })

            // Integ -> Pers.save()
            await iPropuesta.sequelize.transaction({logging : console.log}, async transaction => {
                await Promise.all(  iPropuesta.integrantes.map( integrante => SIntegrantes.guardarDatosPersonalesEnBD(integrante,transaction) ) )
            })

            // Integ.save()
            await iPropuesta.sequelize.transaction({logging : console.log}, async transaction => {
                await Promise.all(  iPropuesta.integrantes.map( integrante => SIntegrantes.guardarDatosEnBD(integrante,transaction) ) )
            })

            // Integ -> RolInteg.save()
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(  iPropuesta.integrantes.map( integrante => SIntegrantes.guardarDatosRolesEnBD(integrante,transaction) ) )
            })
            
            await Integrante.destroy({where : {
                codigoPropuesta : iPropuesta.codigoPropuesta,
                nroDoc : {[Op.not] : iPropuesta.integrantes.map( item => item.nroDoc)}
            }})
        }
    }
    private async guardarDatosObjetivos( iPropuesta : Propuesta) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( 'ServiciosPropuesta.guardarDatosObjetivos()..' );
        if(iPropuesta.objetivoEspecificos.length) {
            const SObjEsp = this.lServiciosModelo.get('OBJESP') as iServiciosObjetivoEspecifico;
            
            // persistencia obj
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.objetivoEspecificos.map( objEsp => SObjEsp?.definirPersistencia(objEsp,transaction)) )
            })

             // persistencia ObjEsp -> ActObjEsp.save()
             await iPropuesta.sequelize.transaction(async transaction => {
                await Promise.all(
                    iPropuesta.objetivoEspecificos.map( objEsp =>SObjEsp.definirPersistenciaAct(objEsp,transaction)) 
                                                .reduce((salida, promesas) => ([
                                                    ...salida,
                                                    ...promesas
                                                ]), <any>[])
                    );
              
            })
            
            // ObjEsp.save()
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.objetivoEspecificos.map( objEsp => SObjEsp?.guardarDatosEnBD(objEsp,transaction)) )
            })
            // ObjEsp -> ActObjEsp.save()
            await iPropuesta.sequelize.transaction(async transaction => {
                await Promise.all(
                    iPropuesta.objetivoEspecificos.map( objEsp => objEsp.actividadObjetivoEspecificos) 
                                                .reduce((salida, actividades) => ([
                                                    ...salida,
                                                    ...actividades.map( act => SObjEsp.guardarDatosActividades(act,transaction))
                                                ]), <any>[])
                    );
              
            })
            // ObjEsp -> ActObjEsp -> Cronog.save()
            await iPropuesta.sequelize.transaction(async transaction=> {
                await Promise.all(
                    iPropuesta.objetivoEspecificos.map( objEsp => objEsp.actividadObjetivoEspecificos) 
                                                .reduce((salida, actividades) => ([
                                                    ...salida,
                                                    ...actividades.map( act => SObjEsp.guardarCronogramasActividades(act,transaction))
                                                ]), <any>[])
                    )
            })

            await ObjetivoEspecifico.destroy({
                where : {
                    codigoPropuesta : iPropuesta.codigoPropuesta,
                    idObjetivoEspecifico: {[Op.not] : iPropuesta.objetivoEspecificos.map( item => item.idObjetivoEspecifico)}
                }
            })
        }
    } 

    private async guardarDatosInstituciones ( iPropuesta : Propuesta ) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( 'ServiciosPropuesta.guardarDatosInstituciones()..' );
        if(iPropuesta.propuestaInstituciones.length){ 
            const SInstituciones = this.lServiciosModelo.get('INST') as IServiciosInstitucion;
            //persistencia inst 
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all([
                    ...iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.definirPersistencia(propInst,transaction)),
                    ...iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.definirPersistenciaPersonaResp(propInst,transaction)),
                    ...iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.definirPersistenciaResponsable(propInst,transaction))

                ] )
            });
            // propInst -> Inst.save()
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatosEnBD(propInst,transaction)) )
            });
            // propInst -> Inst -> Resp -> Pers.save()
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatosPersonalesResponsable(propInst.institucion,transaction)) )
            });
            // propInst -> Inst -> Resp.save()
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatosResponsable(propInst.institucion,transaction)) )
            });
            await PropuestaInstitucion.destroy({
                where : {
                    codigoPropuesta : iPropuesta.codigoPropuesta,
                    idInstitucion: {[Op.not] : iPropuesta.propuestaInstituciones.map( item => item.idInstitucion)}
                }
            })
        }
    }
    private async guardarDatosLineasTematicas( iPropuesta : Propuesta) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( this.guardarDatosLineasTematicas.name );
        if(iPropuesta.propuestaLineaTematicas.length) {
            await iPropuesta.sequelize.transaction(  async transaction=>{
                console.log('1');
                await Promise.all( iPropuesta.propuestaLineaTematicas.map( item => this.lServiciosModelo.get('LITEM')?.definirPersistencia(item,transaction)))

            })

            await iPropuesta.sequelize.transaction( async transaction => {
                console.log('2');
                await Promise.all(  iPropuesta.propuestaLineaTematicas.map( async item => this.lServiciosModelo.get('LITEM')?.guardarDatosEnBD(item,transaction)) )

            })
        
            await PropuestaLineaTematica.destroy({where : {
                codigoPropuesta : iPropuesta.codigoPropuesta,
                idLineaTematica : {[Op.not] : iPropuesta.propuestaLineaTematicas.map( item => item.idLineaTematica)}
            }})
            
        }
    }

    private async guardarDatosCapacitaciones( iPropuesta : Propuesta) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( this.guardarDatosCapacitaciones.name );
        if(iPropuesta.propuestaCapacitaciones.length) {
            await iPropuesta.sequelize.transaction(  async transaction=>{
                console.log('1');
                await Promise.all( iPropuesta.propuestaCapacitaciones.map( item => this.lServiciosModelo.get('CAPAC')?.definirPersistencia(item,transaction)))

            })

            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(  iPropuesta.propuestaCapacitaciones.map( async item => this.lServiciosModelo.get('CAPAC')?.guardarDatosEnBD(item,transaction)) )

            })
        
            await PropuestaCapacitacion.destroy({where : {
                codigoPropuesta : iPropuesta.codigoPropuesta,
                idCapacitacion : {[Op.not] : iPropuesta.propuestaCapacitaciones.map( item => item.idCapacitacion)}
            }})
            
        }
    }

    private async guardarDatosProgramasExtension( iPropuesta : Propuesta) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( this.guardarDatosProgramasExtension.name );
        if(iPropuesta.propuestaProgramaExtensions.length) {
            await iPropuesta.sequelize.transaction(  async transaction=>{
                console.log('1');
                await Promise.all( iPropuesta.propuestaProgramaExtensions.map( item => this.lServiciosModelo.get('SIPPE')?.definirPersistencia(item,transaction)))

            })

            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(  iPropuesta.propuestaProgramaExtensions.map( async item => this.lServiciosModelo.get('SIPPE')?.guardarDatosEnBD(item,transaction)) )

            })
        
            await PropuestaProgramaExtension.destroy({where : {
                codigoPropuesta : iPropuesta.codigoPropuesta,
                idProgramaExtension : {[Op.not] : iPropuesta.propuestaProgramaExtensions.map( item => item.idProgramaExtension)}
            }})
            
        }
    }
    private async guardarDatosPropuestasPrevias( iPropuesta : Propuesta) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( this.guardarDatosPropuestasPrevias.name );
        if(iPropuesta.propuestasPrevias.length) {
            await iPropuesta.sequelize.transaction(  async transaction=>{
                console.log('1');
                await Promise.all( iPropuesta.propuestasPrevias.map( item => this.lServiciosModelo.get('PROPPREV')?.definirPersistencia(item,transaction)))

            })

            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(  iPropuesta.propuestasPrevias.map( async item => this.lServiciosModelo.get('PROPPREV')?.guardarDatosEnBD(item,transaction)) )

            })
        
            await PropuestaPrevia.destroy({where : {
                codigoPropuesta : iPropuesta.codigoPropuesta,
                codigoPropuestaPrevia : {[Op.not] : iPropuesta.propuestasPrevias.map( item => item.codigoPropuestaPrevia)}
            }})
            
        }
    }
    private async guardarDatosPropuestaRelacionada( iPropuesta : Propuesta) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( this.guardarDatosPropuestaRelacionada.name );
        if(iPropuesta.propuestaRelacionadas.length) {
            await iPropuesta.sequelize.transaction(  async transaction=>{
                console.log('1');
                await Promise.all( iPropuesta.propuestaRelacionadas.map( item => this.lServiciosModelo.get('PROPREL')?.definirPersistencia(item,transaction)))

            })

            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(  iPropuesta.propuestaRelacionadas.map( async item => this.lServiciosModelo.get('PROPREL')?.guardarDatosEnBD(item,transaction)) )

            })
        
            await PropuestaRelacionada.destroy({where : {
                codigoPropuesta : iPropuesta.codigoPropuesta,
                codigoPropuestaRelacionada : {[Op.not] : iPropuesta.propuestaRelacionadas.map( item => item.codigoPropuestaRelacionada)}
            }})
            
        }
    }
    
}



