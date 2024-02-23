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

   
    cargarIntegrantes( iPropuesta : Propuesta, integrantes : Integrante[] ) {
        console.log('carga integrantes')
        if(integrantes.length ){
            integrantes.forEach( integrante => {
             const integranteCargado =  iPropuesta.integrantes.find( integ => integ.nroDoc === integrante.nroDoc)
             if(integranteCargado){
                const nuevaData = this.lServiciosModelo.get('INTEG')?.verDatos(integrante);

                this.lServiciosModelo.get('INTEG')?.editarDatos( integranteCargado, nuevaData ); 
             } else {
                iPropuesta.integrantes.push(integrante);
             }
           })
        }
    }

    cargarObjetivosEspecificos( iPropuesta : Propuesta, objetivos : ObjetivoEspecifico[]) {
        if(objetivos.length ){
            objetivos.forEach ( objetivo => {
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

    cargarInstituciones( iPropuesta : Propuesta, propuestaInstituciones : PropuestaInstitucion[]) {
        if(propuestaInstituciones.length ){
            propuestaInstituciones.forEach( propInst => {
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
        if(propuestasRelacionadas.length ){
            
            iPropuesta.propuestaRelacionadas = [];
            iPropuesta.propuestaRelacionadas.push( ...propuestasRelacionadas )
        }
    }

    cargarPropPrevias( iPropuesta : Propuesta, propuestasPrevias : PropuestaPrevia[]) {
        if(propuestasPrevias.length ){
            
            iPropuesta.propuestasPrevias = [];
            iPropuesta.propuestasPrevias.push( ...propuestasPrevias );
        }
    }
    
    cargarCapacitaciones( iPropuesta : Propuesta, capacitaciones : PropuestaCapacitacion[]) {
        if(capacitaciones.length ){
            
            iPropuesta.propuestaCapacitaciones = [];
            iPropuesta.propuestaCapacitaciones.push( ...capacitaciones )
        }
    }
    cargarLineasTematicas( iPropuesta : Propuesta, lineasTematicas : PropuestaLineaTematica[]) {
        if(lineasTematicas.length ){
            
            iPropuesta.propuestaLineaTematicas = [];
            iPropuesta.propuestaLineaTematicas.push( ...lineasTematicas )
        }
    }
    cargarProgramasSippe( iPropuesta : Propuesta, progSippe : PropuestaProgramaExtension[]) {
        if(progSippe.length ){
            
            iPropuesta.propuestaProgramaExtensions = [];
            iPropuesta.propuestaProgramaExtensions.push( ...progSippe )
        }
    }
    cargarPalabrasClave( iPropuesta : Propuesta, palabrasClave : PropuestaPalabraClave[]) {
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
       
        if(iPropuesta.integrantes.length) {
            const SIntegrantes  = this.lServiciosModelo.get('INTEG') as IServiciosIntegrantes;
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.integrantes.map( integrante => SIntegrantes?.leerDatos(integrante,transaction)));
            })
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.integrantes.map( integrante => SIntegrantes?.leerDatosRoles(integrante,transaction)));
            })
        }
    }

    async leerDatosObjetivos(iPropuesta : Propuesta) : Promise<void> {
       
        if(iPropuesta.objetivoEspecificos.length) {
            const iServiciosObjetivoEspecifico = this.lServiciosModelo.get('OBJESP');
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

       
        if(iPropuesta.propuestaInstituciones.length){ 
            const SInstituciones = this.lServiciosModelo.get('INST') as IServiciosInstitucion;
    
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

    async guardarDatosPalabrasClave( iPropuesta : Propuesta) : Promise<void> {
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
    async guardarDatosIntegrantes( iPropuesta : Propuesta ) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( 'ServiciosPropuesta.guardarDatosIntegrantes()..' );
        if( iPropuesta.integrantes.length ) {
            
            const SIntegrantes  = this.lServiciosModelo.get('INTEG') as IServiciosIntegrantes;
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(  iPropuesta.integrantes.map( integrante => SIntegrantes.guardarDatos(integrante,transaction) ) )
            })
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(  iPropuesta.integrantes.map( integrante => SIntegrantes.guardarDatosRoles(integrante,transaction) ) )
            })
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(  iPropuesta.integrantes.map( integrante => SIntegrantes.guardarDatosPersonales(integrante,transaction) ) )
            })
        }
    }
    async guardarDatosObjetivos( iPropuesta : Propuesta) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( 'ServiciosPropuesta.guardarDatosObjetivos()..' );
        if(iPropuesta.objetivoEspecificos.length) {
            const SObjEsp = this.lServiciosModelo.get('OBJESP') as iServiciosObjetivoEspecifico;
            
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.objetivoEspecificos.map( objEsp => SObjEsp?.guardarDatos(objEsp,transaction)) )
            })
           
            await iPropuesta.sequelize.transaction(async transaction => {
                await Promise.all(
                    iPropuesta.objetivoEspecificos.map( objEsp => objEsp.actividadObjetivoEspecificos) 
                                                .reduce((salida, actividades) => ([
                                                    ...salida,
                                                    ...actividades.map( act => SObjEsp.guardarDatosActividades(act,transaction))
                                                ]), <any>[])
                    );
              
            })

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

    async guardarDatosInstituciones ( iPropuesta : Propuesta ) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( 'ServiciosPropuesta.guardarDatosInstituciones()..' );
        if(iPropuesta.propuestaInstituciones.length){ 
            const SInstituciones = this.lServiciosModelo.get('INST') as IServiciosInstitucion;

            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatos(propInst,transaction)) )
            });
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatosPersonalesResponsable(propInst.institucion,transaction)) )
            });
            await iPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatosResponsable(propInst.institucion,transaction)) )
            });
            
        }
    }

    async guardarDatos (iPropuesta : Propuesta ) : Promise<void> {

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
        
        await iPropuesta.sequelize.transaction( async transaction => {

            await Promise.all([
                iPropuesta.setPropuestaCapacitaciones(iPropuesta.propuestaCapacitaciones,{transaction}),
                iPropuesta.setPropuestaLineaTematicas(iPropuesta.propuestaLineaTematicas,{transaction}),
                iPropuesta.setPropuestaProgramaExtensions(iPropuesta.propuestaProgramaExtensions,{transaction}),
                iPropuesta.setPropuestaPalabraClaves(iPropuesta.propuestaPalabraClaves,{transaction}),
                iPropuesta.setPropuestaInstituciones(iPropuesta.propuestaInstituciones,{transaction}),
                iPropuesta.setIntegrantes(iPropuesta.integrantes,{transaction}),
                iPropuesta.setObjetivoEspecificos(iPropuesta.objetivoEspecificos,{transaction}),
                iPropuesta.setUbicacionProblematicas(iPropuesta.ubicacionProblematicas,{transaction}),
                iPropuesta.setPropuestasPrevias(iPropuesta.propuestasPrevias,{transaction}),
                iPropuesta.setPropuestaRelacionadas(iPropuesta.propuestaRelacionadas,{transaction})
            ]);
        });
    }
}



