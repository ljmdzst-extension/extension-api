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
import ServiciosIntegrantes, { IServiciosIntegrantes } from "./integrante";
import { ServiciosActividadObjetivoEspecifico, ServiciosObjetivoEspecifico, iServiciosObjetivoEspecifico } from "./planificacion";
import ServiciosInstitucion, { IServiciosInstitucion } from "./institucion";
import { PalabraClave } from "../models/PalabraClave";
import { Model, Op, Transaction } from "sequelize";
import { generarOpcionesRemove } from "../helpers/propuesta";
import { UbicacionProblematica } from "../models/UbicacionProblematica";


type TServicio = string;

export default class ServiciosPropuesta implements IServiciosModelo {
    
    private lServiciosModelo !: Map<TServicio,IServiciosModelo>

    constructor(){
        this.lServiciosModelo = new Map();
        this.lServiciosModelo.set('INTEG',new ServiciosIntegrantes());
        this.lServiciosModelo.set('OBJESP',new ServiciosObjetivoEspecifico());
        this.lServiciosModelo.set('ACTOBJESP',new ServiciosActividadObjetivoEspecifico());
        this.lServiciosModelo.set('INST',new ServiciosInstitucion());
        
    }
    async definirPersistencia( iPropuesta : Propuesta, transaction?: Transaction | undefined): Promise<void> {
        await Propuesta.findByPk(iPropuesta.codigoPropuesta,{transaction}).then( resp => iPropuesta.isNewRecord = resp === null)
    }
   
    editarDatos( iPropuesta : Propuesta, data: PropuestaAttributes ) {
       iPropuesta.set(data);
    }

    verDatos(iPropuesta : Propuesta) : PropuestaAttributes {
        return iPropuesta.dataValues;
    }

   
    cargarIntegrantes( iPropuesta : Propuesta, _integrantes : Integrante[] ) {
        console.log('carga integrantes')
        if(!iPropuesta.integrantes ) iPropuesta.integrantes = [];
        
      
        // iPropuesta.integrantes = iPropuesta.integrantes.filter( integ => _integrantes.some( _integ=>  integ.nroDoc === _integ.nroDoc))
      
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

    cargarObjetivosEspecificos( iPropuesta : Propuesta, _objetivos : ObjetivoEspecifico[]) {
        console.log('carga objetivos')
        if(!iPropuesta.objetivoEspecificos ) iPropuesta.objetivoEspecificos = [];
        iPropuesta.objetivoEspecificos = iPropuesta.objetivoEspecificos.filter( objEsp => _objetivos.some( _objESp=>  objEsp.idObjetivoEspecifico === _objESp.idObjetivoEspecifico))
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

    cargarInstituciones( iPropuesta : Propuesta, _propuestaInstituciones : PropuestaInstitucion[]) {
        console.log('carga instituciones')
        if(!iPropuesta.propuestaInstituciones) iPropuesta.propuestaInstituciones = [];
        iPropuesta.propuestaInstituciones = iPropuesta.propuestaInstituciones.filter( proInst => _propuestaInstituciones.some( _proInst=>  proInst.idInstitucion === _proInst.idInstitucion))
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

    cargarPropRelacionadas( iPropuesta : Propuesta, propuestasRelacionadas : PropuestaRelacionada[]) {
        if(!iPropuesta.propuestaRelacionadas) iPropuesta.propuestaRelacionadas = [];
        if(propuestasRelacionadas.length ){
            
            iPropuesta.propuestaRelacionadas = [];
            iPropuesta.propuestaRelacionadas.push( ...propuestasRelacionadas )
        }
    }

    cargarPropPrevias( iPropuesta : Propuesta, propuestasPrevias : PropuestaPrevia[]) {
        if(!iPropuesta.propuestasPrevias) iPropuesta.propuestasPrevias = [];
        if(propuestasPrevias.length ){
            
            iPropuesta.propuestasPrevias = [];
            iPropuesta.propuestasPrevias.push( ...propuestasPrevias );
        }
    }
    
    cargarCapacitaciones( iPropuesta : Propuesta, capacitaciones : PropuestaCapacitacion[]) {
        if(!iPropuesta.propuestaCapacitaciones) iPropuesta.propuestaCapacitaciones = [];
        if(capacitaciones.length ){
            
            iPropuesta.propuestaCapacitaciones = [];
            iPropuesta.propuestaCapacitaciones.push( ...capacitaciones )
        }
    }
    cargarLineasTematicas( iPropuesta : Propuesta, lineasTematicas : PropuestaLineaTematica[]) {
        if(!iPropuesta.propuestaLineaTematicas) iPropuesta.propuestaLineaTematicas = [];
        if(lineasTematicas.length ){
            
            iPropuesta.propuestaLineaTematicas = [];
            iPropuesta.propuestaLineaTematicas.push( ...lineasTematicas )
        }
    }
    cargarProgramasSippe( iPropuesta : Propuesta, progSippe : PropuestaProgramaExtension[]) {
        if(!iPropuesta.propuestaProgramaExtensions) iPropuesta.propuestaProgramaExtensions = [];
        if(progSippe.length ){
            
            iPropuesta.propuestaProgramaExtensions = [];
            iPropuesta.propuestaProgramaExtensions.push( ...progSippe )
        }
    }
    cargarPalabrasClave( iPropuesta : Propuesta, palabrasClave : PropuestaPalabraClave[]) {
        if(!iPropuesta.propuestaPalabraClaves) iPropuesta.propuestaPalabraClaves = [];
        if(palabrasClave.length ){
            
            iPropuesta.propuestaPalabraClaves = [];
            iPropuesta.propuestaPalabraClaves.push( ...palabrasClave )
        }
    }
   
    verIntegrantes( iPropuesta : Propuesta) {
        const SIntegrantes = this.lServiciosModelo.get('INTEG') ;
        if(iPropuesta.integrantes.length ){
            return iPropuesta.integrantes.map( integ => SIntegrantes?.verDatos(integ));
        }
        return [];
    }

    verObjetivosEspecificos( iPropuesta : Propuesta) {
        const SObjetivos = this.lServiciosModelo.get('OBJESP');
        if(iPropuesta.objetivoEspecificos.length ){
            return iPropuesta.objetivoEspecificos.map( objEsp => SObjetivos?.verDatos(objEsp))
        }
        return [];
    }
    verInstituciones( iPropuesta : Propuesta) {
        const SInstituciones = this.lServiciosModelo.get('INST') as IServiciosInstitucion;
        if(iPropuesta.propuestaInstituciones.length ){
          
           return iPropuesta.propuestaInstituciones.map( propInst => SInstituciones.verDatos(propInst) )
        }
        return [];
    }
    verPropRelacionadas( iPropuesta : Propuesta) {
        if(iPropuesta.propuestaRelacionadas.length ){
           return iPropuesta.propuestaRelacionadas;
        }
        return [];
    }
    verPropPrevias( iPropuesta : Propuesta) {
        if(iPropuesta.propuestasPrevias.length ){
           return iPropuesta.propuestasPrevias;
        }
        return [];
    }
    verCapacitaciones( iPropuesta : Propuesta) {
        if(iPropuesta.propuestaCapacitaciones.length ){
           return iPropuesta.propuestaCapacitaciones
        }
        return [];
    }
    verLineasTematicas( iPropuesta : Propuesta) {
        if(iPropuesta.propuestaLineaTematicas.length ){
           return iPropuesta.propuestaLineaTematicas;
        }
        return [];
    }
    verProgramasSippe( iPropuesta : Propuesta) {
        if(iPropuesta.propuestaProgramaExtensions.length ){
            return iPropuesta.propuestaProgramaExtensions;
        }
        return [];
    }
    verPalabrasClave( iPropuesta : Propuesta) {
        if(iPropuesta.propuestaPalabraClaves.length ){
            return iPropuesta.propuestaPalabraClaves.map( propPalabra => ({
                ...propPalabra.dataValues ,
                palabraClave : propPalabra.palabraClave.dataValues
            }));
        }
        return [];
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
            iPropuesta.propuestaPalabraClaves.forEach( propPalabra => {propPalabra.palabraClave.isNewRecord = propPalabra.palabraClave.idPalabraClave === 0} );
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all( iPropuesta.propuestaPalabraClaves.map( async ({palabraClave}) => palabraClave.set( await palabraClave.save({transaction}) )) );
            });
            iPropuesta.propuestaPalabraClaves
            .filter( propPalabra =>  propPalabra.idPalabraClave === 0)
            .forEach( propPalabra => propPalabra.set(propPalabra.palabraClave.dataValues))
            
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
        }
    } 

    private async guardarDatosInstituciones ( iPropuesta : Propuesta ) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( 'ServiciosPropuesta.guardarDatosInstituciones()..' );
        if(iPropuesta.propuestaInstituciones.length){ 
            const SInstituciones = this.lServiciosModelo.get('INST') as IServiciosInstitucion;
            //persistencia inst 
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.definirPersistencia(propInst,transaction)) )
            });
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.definirPersistenciaPersonaResp(propInst,transaction)) )
            });
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.definirPersistenciaResponsable(propInst,transaction)) )
            });
            //asd
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
            
        }
    }

    async guardarDatosEnBD (iPropuesta : Propuesta ) : Promise<void> {

        await iPropuesta.save();

        await iPropuesta.sequelize.transaction( async transaction => {
            await Promise.all([
            PropuestaRelacionada.bulkCreate(iPropuesta.propuestaRelacionadas.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaCapacitacion.bulkCreate(iPropuesta.propuestaCapacitaciones.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaLineaTematica.bulkCreate(iPropuesta.propuestaLineaTematicas.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaProgramaExtension.bulkCreate(iPropuesta.propuestaProgramaExtensions.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaPalabraClave.bulkCreate(iPropuesta.propuestaPalabraClaves.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaInstitucion.bulkCreate(iPropuesta.propuestaInstituciones.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaPrevia.bulkCreate(iPropuesta.propuestasPrevias.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaRelacionada.bulkCreate(iPropuesta.propuestaRelacionadas.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),

            ]);
        });
 
        
        await this.guardarDatosInstituciones(iPropuesta);

        await this.guardarDatosIntegrantes(iPropuesta);

        await this.guardarDatosObjetivos(iPropuesta);

        await this.guardarDatosPalabrasClave(iPropuesta);
       
        await iPropuesta.sequelize.transaction( async transaction => {
  
            await Promise.all([
                PropuestaCapacitacion.destroy(generarOpcionesRemove('codigoPropuesta','idCapacitacion',iPropuesta,iPropuesta.propuestaCapacitaciones,transaction)),
                PropuestaLineaTematica.destroy(generarOpcionesRemove('codigoPropuesta','idLineaTematica',iPropuesta,iPropuesta.propuestaLineaTematicas,transaction)),
                PropuestaProgramaExtension.destroy(generarOpcionesRemove('codigoPropuesta','idProgramaSippe',iPropuesta,iPropuesta.propuestaProgramaExtensions,transaction)),
                PropuestaPalabraClave.destroy(generarOpcionesRemove('codigoPropuesta','idPalabraClave',iPropuesta,iPropuesta.propuestaPalabraClaves,transaction)),
                PropuestaInstitucion.destroy(generarOpcionesRemove('codigoPropuesta','idInstitucion',iPropuesta,iPropuesta.propuestaInstituciones,transaction)),
                Integrante.destroy(generarOpcionesRemove('codigoPropuesta','nroDoc',iPropuesta,iPropuesta.integrantes,transaction)),
                ObjetivoEspecifico.destroy(generarOpcionesRemove('codigoPropuesta','idObjetivoEspecifico',iPropuesta,iPropuesta.objetivoEspecificos,transaction)),
                UbicacionProblematica.destroy(generarOpcionesRemove('codigoPropuesta','idUbicacion',iPropuesta,iPropuesta.ubicacionProblematicas,transaction)),
                PropuestaPrevia.destroy(generarOpcionesRemove('codigoPropuesta','codigoPropuestaPrevia',iPropuesta,iPropuesta.propuestasPrevias,transaction)),
                PropuestaRelacionada.destroy(generarOpcionesRemove('codigoPropuesta','codigoPropuestaRelacionada',iPropuesta,iPropuesta.propuestaRelacionadas,transaction))
            ]);
            
        });

       

    }
}



