import { Propuesta, PropuestaAttributes, PropuestaId } from "../models/Propuesta";
import { PropuestaCapacitacion } from "../models/PropuestaCapacitacion";
import { PropuestaLineaTematica } from "../models/PropuestaLineaTematica";
import { PropuestaProgramaExtension } from "../models/PropuestaProgramaExtension";
import { PropuestaPalabraClave } from "../models/PropuestaPalabraClave";
import { PropuestaInstitucion } from "../models/PropuestaInstitucion";
import { Integrante } from "../models/Integrante";
import { ObjetivoEspecifico } from "../models/ObjetivoEspecifico";
import { IServiciosModelo } from "./IServiciosModelo";
import {Institucion} from "../models/Institucion";
import { PropuestaRelacionada } from "../models/PropuestaRelacionada";
import { PropuestaPrevia } from "../models/PropuestaPrevia";
import { CapacitacionId } from "../models/Capacitacion";
import { LineaTematicaId } from "../models/LineaTematica";
import { ProgramaSippeId } from "../models/ProgramaSippe";
import { PalabraClave } from "../models/PalabraClave";
import ServiciosIntegrantes from "./integrante";
import { ServiciosActividadObjetivoEspecifico, ServiciosObjetivoEspecifico } from "./planificacion";
import ServiciosInstitucion, { IServiciosInstitucion } from "./institucion";


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

   
    cargarIntegrantes( iPropuesta : Propuesta, integrantes : Integrante[]) {
        if(integrantes.length ){
            iPropuesta.integrantes = integrantes;
        }
    }

    cargarObjetivosEspecificos( iPropuesta : Propuesta, objetivosEspecificos : ObjetivoEspecifico[]) {
        if(objetivosEspecificos.length ){
            iPropuesta.objetivoEspecificos = objetivosEspecificos;
        }
    }
    cargarInstituciones( iPropuesta : Propuesta, instituciones : Institucion[]) {
        if(instituciones.length ){
            instituciones.forEach( inst => {
                const iInstAsociada = new PropuestaInstitucion({
                    idInstitucion: inst.idInstitucion, 
                    codigoPropuesta : iPropuesta.codigoPropuesta
                });
                iInstAsociada.institucion = inst;
                iPropuesta.propuestaInstituciones.push( iInstAsociada );
            })
        }
    }
    cargarPropRelacionadas( iPropuesta : Propuesta, propuestasRelacionadas : PropuestaId[]) {
        if(propuestasRelacionadas.length ){
            iPropuesta.propuestaRelacionadas = PropuestaRelacionada.bulkBuild( 
                propuestasRelacionadas.map( idProp => ({
                    codigoPropuesta : iPropuesta.codigoPropuesta, 
                    codigoPropuestaRelacionada : idProp
                })) 
            );
        }
    }
    cargarPropPrevias( iPropuesta : Propuesta, propuestasPrevias : PropuestaId[]) {
        if(propuestasPrevias.length ){
            iPropuesta.propuestasPrevias = PropuestaPrevia.bulkBuild( 
                propuestasPrevias.map( idProp => ({
                    codigoPropuesta : iPropuesta.codigoPropuesta, 
                    codigoPropuestaPrevia : idProp
                })) 
            );
        }
    }
    cargarCapacitaciones( iPropuesta : Propuesta, capacitaciones : CapacitacionId[]) {
        if(capacitaciones.length ){
            iPropuesta.propuestaCapacitaciones = PropuestaCapacitacion.bulkBuild( 
                capacitaciones.map( idCap => ({
                    codigoPropuesta : iPropuesta.codigoPropuesta, 
                    idCapacitacion : idCap
                })) 
            );
        }
    }
    cargarLineasTematicas( iPropuesta : Propuesta, lineasTematicas : LineaTematicaId[]) {
        if(lineasTematicas.length ){
            iPropuesta.propuestaLineaTematicas = PropuestaLineaTematica.bulkBuild( 
                lineasTematicas.map( idLineaTem => ({
                    codigoPropuesta : iPropuesta.codigoPropuesta, 
                    idLineaTematica : idLineaTem
                })) 
            );
        }
    }
    cargarProgramasSippe( iPropuesta : Propuesta, progSippe : ProgramaSippeId[]) {
        if(progSippe.length ){
            iPropuesta.propuestaProgramaExtensions = PropuestaProgramaExtension.bulkBuild( 
                progSippe.map( idProg => ({
                    codigoPropuesta : iPropuesta.codigoPropuesta, 
                    idProgramaExtension : idProg
                })) 
            );
        }
    }
    cargarPalabrasClave( iPropuesta : Propuesta, palabrasClave : PalabraClave[]) {
        if(palabrasClave.length ){
            palabrasClave.forEach( palabra => {
                const iPalabraAsociada = new PropuestaPalabraClave({
                    idPalabraClave : palabra.idPalabraClave,
                    codigoPropuesta : iPropuesta.codigoPropuesta
                });
                iPalabraAsociada.palabraClave = palabra;
                iPropuesta.propuestaPalabraClaves.push( iPalabraAsociada );
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
        const SIntegrantes  = this.lServiciosModelo.get('INTEG');
        if(iPropuesta.integrantes.length) {
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.integrantes.map( integrante => SIntegrantes?.leerDatos(integrante,transaction)));
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

            await iPropuesta.sequelize.transaction(async transaction => {
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
        
        // const SIntegrantes  = this.lServiciosModelo.get('Integrantes');
        // if(iPropuesta.integrantes.length) {
        //     await iPropuesta.sequelize.transaction( async transaction => {
        //         await Promise.all(iPropuesta.integrantes.map( integrante => SIntegrantes?.leerDatos(integrante,transaction)));
        //     })
        // }

        // const iServiciosObjetivoEspecifico = this.lServiciosModelo.get('OBJESP');
      
        // if(iPropuesta.objetivoEspecificos.length) {
        //     await iPropuesta.sequelize.transaction( async transaction => {
        //         await Promise.all(iPropuesta.objetivoEspecificos.map( objEsp => iServiciosObjetivoEspecifico?.leerDatos(objEsp,transaction)) )
        //     })


        //     const iServiciosActividadObjetivoEspecifico = this.lServiciosModelo.get('ActObjEsp');

        //     await iPropuesta.sequelize.transaction(async transaction => {
        //         await Promise.all(
        //             iPropuesta.objetivoEspecificos
        //                 .map( objEsp => objEsp.actividadObjetivoEspecificos.map( actObjEsp => iServiciosActividadObjetivoEspecifico?.guardarDatos(actObjEsp,transaction)))
        //                 .reduce( (salida,promsesas) => ([...salida,...promsesas]) ,[]) 
        //             );
        //     })
        // }

        // const SInstituciones = this.lServiciosModelo.get('Instituciones') as IServiciosInstitucion;
      
        // if(iPropuesta.propuestaInstituciones.length){ 
        //     await iPropuesta.sequelize.transaction( async transaction => {
        //         await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatos(propInst,transaction)) )
        //     });
        //     await iPropuesta.sequelize.transaction( async transaction => {
        //         await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatosResponsable(propInst.institucion,transaction)) )
        //     });
        //     await iPropuesta.sequelize.transaction( async transaction => {
        //         await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatosResponsable(propInst.institucion,transaction)) )
        //     });
            
        // }

        // if(iPropuesta.propuestaPalabraClaves.length) {
        //     await iPropuesta.sequelize.transaction( async transaction => {
        //         await Promise.all( iPropuesta.propuestaPalabraClaves.map(  propPalabra => propPalabra.palabraClave.save({transaction}).then( resp => propPalabra.set('idPalabraClave',resp.idPalabraClave))));
        //     });

        // }

        // await iPropuesta.sequelize.transaction( async transaction => {

        //     await Promise.all([
        //         iPropuesta.propuestaCapacitaciones.map( item => item.save({transaction})),
        //         iPropuesta.propuestaLineaTematicas.map( item => item.save({transaction})),
        //         iPropuesta.propuestaProgramaExtensions.map( item => item.save({transaction})),
        //         iPropuesta.propuestaPalabraClaves.map( item => item.save({transaction})),
        //         iPropuesta.propuestaInstituciones.map( item => item.save({transaction})),
        //         iPropuesta.integrantes.map( item => item.save({transaction})),
        //         iPropuesta.objetivoEspecificos.map( item => item.save({transaction})),
        //         iPropuesta.ubicacionProblematicas.map( item => item.save({transaction}))
        //     ]);
        // });
    }
}



