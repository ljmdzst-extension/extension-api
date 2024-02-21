import { Propuesta, PropuestaAttributes, PropuestaId } from "../models/Propuesta";
import { PropuestaCapacitacion } from "../models/PropuestaCapacitacion";
import { PropuestaLineaTematica } from "../models/PropuestaLineaTematica";
import { PropuestaProgramaExtension } from "../models/PropuestaProgramaExtension";
import { PropuestaPalabraClave } from "../models/PropuestaPalabraClave";
import { PropuestaInstitucion, PropuestaInstitucionCreationAttributes } from "../models/PropuestaInstitucion";
import { Integrante, IntegranteCreationAttributes } from "../models/Integrante";
import { ObjetivoEspecifico, ObjetivoEspecificoCreationAttributes } from "../models/ObjetivoEspecifico";
import { IServiciosModelo } from "./IServiciosModelo";
import {Institucion, InstitucionCreationAttributes} from "../models/Institucion";
import { PropuestaRelacionada } from "../models/PropuestaRelacionada";
import { PropuestaPrevia } from "../models/PropuestaPrevia";
import { CapacitacionId } from "../models/Capacitacion";
import { LineaTematicaId } from "../models/LineaTematica";
import { ProgramaSippeId } from "../models/ProgramaSippe";
import { PalabraClave, PalabraClaveCreationAttributes } from "../models/PalabraClave";
import ServiciosIntegrantes, { IServiciosIntegrantes } from "./integrante";
import { ServiciosActividadObjetivoEspecifico, ServiciosObjetivoEspecifico, iServiciosObjetivoEspecifico } from "./planificacion";
import ServiciosInstitucion, { IServiciosInstitucion } from "./institucion";
import { PersonaCreationAttributes } from "../models/Persona";
import { RolIntegranteCreationAttributes } from "../models/RolIntegrante";
import { ActividadObjetivoEspecificoCreationAttributes } from "../models/ActividadObjetivoEspecifico";
import { CronogramaActividadCreationAttributes } from "../models/CronogramaActividad";
import { ResponsableCreationAttributes } from "../models/Responsable";


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
   
    editarDatos( iPropuesta : Propuesta, data: PropuestaAttributes ) {
       iPropuesta.set(data);
    }

    verDatos(iPropuesta : Propuesta) : PropuestaAttributes {
        return iPropuesta.dataValues;
    }

   
    cargarIntegrantes( 
        iPropuesta : Propuesta, 
        data : (IntegranteCreationAttributes& { 
            persona : PersonaCreationAttributes , 
            roles : RolIntegranteCreationAttributes[]
            })[] ) {
        console.log('carga integrantes')
        if(data.length ){
           data.forEach( dataInteg => {
             if(
                iPropuesta.integrantes.every( integ => integ.nroDoc !== dataInteg.nroDoc)
             ){
                const SIntegrantes = this.lServiciosModelo.get('INTEG') as IServiciosIntegrantes
                const integrantes = data.map( dataInteg => SIntegrantes.crearIntegrante(dataInteg) )
                iPropuesta.integrantes = integrantes;
             }
           })
        }
    }

    cargarObjetivosEspecificos( iPropuesta : Propuesta, data : (ObjetivoEspecificoCreationAttributes & {
        actividadObjetivoEspecificos : (ActividadObjetivoEspecificoCreationAttributes & {
            cronogramas : CronogramaActividadCreationAttributes[]
          })[]})[]) {
        if(data.length ){
           data.forEach ( dataObjEsp => {
             if(dataObjEsp.idObjetivoEspecifico === 0) {
                const SObjetivos = this.lServiciosModelo.get('OBJESP') as iServiciosObjetivoEspecifico;
                iPropuesta.objetivoEspecificos = data.map( dataObjEsp => SObjetivos.crearObjetivoEspecifico(dataObjEsp));
             }
           })
        }
    }
    cargarInstituciones( iPropuesta : Propuesta, data : (
        PropuestaInstitucionCreationAttributes & {
            institucion : InstitucionCreationAttributes & {
                responsable : ResponsableCreationAttributes & {
                    persona : PersonaCreationAttributes
                }
            }
        }
    )[]) {
        if(data.length ){
           data.forEach( dataInst => {
             if(dataInst.idInstitucion === 0){
                const SInstituciones = this.lServiciosModelo.get('INST') as IServiciosInstitucion;
                iPropuesta.propuestaInstituciones.push( ...data.map( dataInst => SInstituciones.crearInstitucion(dataInst)));
             }
           })
        }
    }
    cargarPropRelacionadas( iPropuesta : Propuesta, propuestasRelacionadas : PropuestaId[]) {
        if(propuestasRelacionadas.length ){
             propuestasRelacionadas.forEach( propRel => {
                if(
                    iPropuesta.propuestaRelacionadas.every( item => item.codigoPropuestaRelacionada !== propRel)
                ){
                    iPropuesta.propuestaRelacionadas.push( PropuestaRelacionada.build({
                        codigoPropuesta : iPropuesta.codigoPropuesta,
                        codigoPropuestaRelacionada : propRel
                    }) )
                }
             })
            
            
        }
    }
    cargarPropPrevias( iPropuesta : Propuesta, propuestasPrevias : PropuestaId[]) {
        if(propuestasPrevias.length ){
            propuestasPrevias.forEach( propPrev => {
                if(
                    iPropuesta.propuestasPrevias.every( item => item.codigoPropuestaPrevia !== propPrev)
                ){
                    iPropuesta.propuestasPrevias.push( PropuestaPrevia.build({
                        codigoPropuesta : iPropuesta.codigoPropuesta,
                        codigoPropuestaPrevia : propPrev
                    }) )
                }
             })
            
        }
    }
    cargarCapacitaciones( iPropuesta : Propuesta, capacitaciones : CapacitacionId[]) {
        if(capacitaciones.length ){
            capacitaciones.forEach( capacitacion => {
                if(
                    iPropuesta.propuestaCapacitaciones.every( item => item.idCapacitacion !== capacitacion)
                ){
                    iPropuesta.propuestaCapacitaciones.push( PropuestaCapacitacion.build({
                        codigoPropuesta : iPropuesta.codigoPropuesta,
                        idCapacitacion : capacitacion
                    }) )
                }
             })
        }
    }
    cargarLineasTematicas( iPropuesta : Propuesta, lineasTematicas : LineaTematicaId[]) {
        if(lineasTematicas.length ){
            lineasTematicas.forEach( lineaTematica => {
                if(
                    iPropuesta.propuestaLineaTematicas.every( item => item.idLineaTematica !== lineaTematica)
                ) {
                    iPropuesta.propuestaLineaTematicas.push( PropuestaLineaTematica.build({
                        codigoPropuesta : iPropuesta.codigoPropuesta,
                        idLineaTematica : lineaTematica
                    }) )
                }
             })
        }
    }
    cargarProgramasSippe( iPropuesta : Propuesta, progSippe : ProgramaSippeId[]) {
        if(progSippe.length ){
            progSippe.forEach( progSippe => {
                if(
                    iPropuesta.propuestaProgramaExtensions.every( item => item.idProgramaExtension !== progSippe)
                ) {
                    iPropuesta.propuestaProgramaExtensions.push( PropuestaProgramaExtension.build({
                        codigoPropuesta : iPropuesta.codigoPropuesta,
                        idProgramaExtension : progSippe
                    }) )
                }
             })
        }
    }
    cargarPalabrasClave( iPropuesta : Propuesta, palabrasClave : PalabraClaveCreationAttributes[]) {
        if(palabrasClave.length ){
            palabrasClave.forEach( palabra => {
                if(
                    iPropuesta.propuestaPalabraClaves.every( item => item.idPalabraClave !== palabra.idPalabraClave)
                ){
                    const iPalabraAsociada = new PropuestaPalabraClave({
                        idPalabraClave : palabra.idPalabraClave,
                        codigoPropuesta : iPropuesta.codigoPropuesta
                    });
                    iPalabraAsociada.palabraClave = PalabraClave.build(palabra);
                    iPropuesta.propuestaPalabraClaves.push( iPalabraAsociada );
                }
            })
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
            return iPropuesta.propuestaPalabraClaves.map( propPalabra => propPalabra.palabraClave.dataValues );
        }
        return [];
    }
    
    async leerDatos (iPropuesta : Propuesta) {

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
               
    }

    async leerDatosIntegrantes (iPropuesta : Propuesta) : Promise<void> {
        const SIntegrantes  = this.lServiciosModelo.get('INTEG') as IServiciosIntegrantes;
        if(iPropuesta.integrantes.length) {
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.integrantes.map( integrante => SIntegrantes?.leerDatos(integrante,transaction)));
            })
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.integrantes.map( integrante => SIntegrantes?.leerDatosRoles(integrante,transaction)));
            })
        }
    }

    async leerDatosObjetivos(iPropuesta : Propuesta) : Promise<void> {
        const iServiciosObjetivoEspecifico = this.lServiciosModelo.get('OBJESP');
        if(iPropuesta.objetivoEspecificos.length) {
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.objetivoEspecificos.map( objEsp => iServiciosObjetivoEspecifico?.leerDatos(objEsp,transaction)) )
            })


            const iServiciosActividadObjetivoEspecifico = this.lServiciosModelo.get('ACTOBJESP');
          
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(
                    iPropuesta.objetivoEspecificos
                        .map( objEsp => objEsp.actividadObjetivoEspecificos.map( actObjEsp => iServiciosActividadObjetivoEspecifico?.leerDatos(actObjEsp,transaction)))
                        .reduce( (salida,promsesas) => ([...salida,...promsesas]) ,[]) 
                    );
            })
        }
    }
    async leerDatosInstituciones(iPropuesta : Propuesta) : Promise<void> {
        const SInstituciones = this.lServiciosModelo.get('INST') as IServiciosInstitucion;
       
        if(iPropuesta.propuestaInstituciones.length){ 
    
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.leerDatos(propInst,transaction)) )
            });
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.leerDatosResponsable(propInst.institucion,transaction)) )
            });
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.leerDatosPersonalesResponsable(propInst.institucion,transaction)) )
            });
        }
    }
    async leerDatosPalabrasClave(iPropuesta : Propuesta) : Promise<void> {
        
        if(iPropuesta.propuestaPalabraClaves.length) {
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaPalabraClaves.map( propPalabra => propPalabra.getPalabraClave({transaction}).then( resp => propPalabra.palabraClave = resp) ));
            });
        }
    }
    async guardarDatos (iPropuesta : Propuesta ) : Promise<void> {

        await iPropuesta.save();
        
        const SIntegrantes  = this.lServiciosModelo.get('INTEG');
        if(iPropuesta.integrantes.length) {
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.integrantes.map( integrante => SIntegrantes?.guardarDatos(integrante,transaction)));
            })
        }

        const SObjEsp = this.lServiciosModelo.get('OBJESP') as iServiciosObjetivoEspecifico;
    
        if(iPropuesta.objetivoEspecificos.length) {
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.objetivoEspecificos.map( objEsp => SObjEsp?.guardarDatos(objEsp,transaction)) )
            })
            await iPropuesta.sequelize.transaction(async transaction => {
                const promesas : any[] = []
                iPropuesta.objetivoEspecificos.map(objEsp =>{
                    if(objEsp.actividadObjetivoEspecificos) {
                        promesas.push( ...objEsp.actividadObjetivoEspecificos.map( 
                                actObjEsp => SObjEsp?.guardarDatosActividad(actObjEsp,transaction)
                            ));
                    }
                })
                await Promise.all(promesas);
              
            })

            await Promise.all(iPropuesta.objetivoEspecificos.map( objEsp => SObjEsp?.guardarCronogramasActividades(objEsp)) )
        }

        const SInstituciones = this.lServiciosModelo.get('INST') as IServiciosInstitucion;
      
        if(iPropuesta.propuestaInstituciones.length){ 
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatos(propInst,transaction)) )
            });
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatosResponsable(propInst.institucion,transaction)) )
            });
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatosResponsable(propInst.institucion,transaction)) )
            });
            
        }

        if(iPropuesta.propuestaPalabraClaves.length) {
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all( iPropuesta.propuestaPalabraClaves.map(  propPalabra => propPalabra.palabraClave.save({transaction}).then( resp => propPalabra.set('idPalabraClave',resp.idPalabraClave))));
            });
        }

        await iPropuesta.sequelize.transaction( async transaction => {

            await Promise.all([
                iPropuesta.setPropuestaCapacitaciones(iPropuesta.propuestaCapacitaciones,{transaction}),
                iPropuesta.setPropuestaLineaTematicas(iPropuesta.propuestaLineaTematicas,{transaction}),
                iPropuesta.setPropuestaProgramaExtensions(iPropuesta.propuestaProgramaExtensions,{transaction}),
                iPropuesta.setPropuestaPalabraClaves(iPropuesta.propuestaPalabraClaves,{transaction}),
                iPropuesta.setPropuestaInstituciones(iPropuesta.propuestaInstituciones,{transaction}),
                iPropuesta.setIntegrantes(iPropuesta.integrantes,{transaction}),
                iPropuesta.setObjetivoEspecificos(iPropuesta.objetivoEspecificos,{transaction}),
                iPropuesta.setUbicacionProblematicas(iPropuesta.ubicacionProblematicas,{transaction})
            ]);
        });
    }
}



