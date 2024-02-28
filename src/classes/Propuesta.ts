import { PropuestaAttributes, PropuestaCreationAttributes, Propuesta as MPropuesta } from "../models/Propuesta";
import { PropuestaCapacitacion, PropuestaCapacitacionAttributes } from "../models/PropuestaCapacitacion";
import { PropuestaInstitucion, PropuestaInstitucionAttributes } from "../models/PropuestaInstitucion";
import { IServiciosInstitucion } from "../services/institucion";
import { iServiciosObjetivoEspecifico } from "../services/planificacion";
import Institucion from "./Institucion";
import Integrante, { TIntegranteIn } from "./Integrante";
import ObjetivoEspecifico from "./ObjetivoEspecifico";

export type TPropuestaIn = PropuestaCreationAttributes & {
    propuestaInstituciones : PropuestaInstitucionAttributes[],
    propuestaCapacitaciones : PropuestaCapacitacionAttributes[],
    propuestasRelacionadas : PropuestaRelacionadaAttributes[],
    propuestaLineaTematicas : PropuestaLineaTematicaAttributes[],
    propuestaProgramasExtension : PropuestaProgramaExtensionAttributes[],
    propuestaPalabrasClave : PropuestaPalabraClaveAttributes[],
    propuestasPrevias : PropuestaPreviaAttributes[],
    integrantes : TIntegranteIn[]
};
export type TPersonaOut = PropuestaAttributes;

export default class Propuesta {

    private dbPropuesta !: MPropuesta;
    
    private lIntegrantes !: Integrante[];

    private lInstituciones !: Institucion[];

    private lObjEsp !: ObjetivoEspecifico[];

    constructor(
        data : TPropuestaIn
    ){
        this.dbPropuesta = new MPropuesta(data);
        if(data.propuestaCapacitaciones) {

        }
      
    }
   
    editarDatos(data: PropuestaAttributes ) {
       this.dbPropuesta.set(data);
    }

    verDatos() : PropuestaAttributes {
        return this.dbPropuesta.dataValues;
    }

   
    cargarIntegrantes(  integrantes : Integrante[] ) {
    
       this.lIntegrantes.push( ...integrantes );
    }

    cargarObjetivosEspecificos( objetivos : ObjetivoEspecifico[]) {
        this.lObjEsp.push( ...objetivos)
    }

    cargarInstituciones( propuestaInstituciones : PropuestaInstitucion[]) {
        if(propuestaInstituciones.length ){
            propuestaInstituciones.forEach( propInst => {
             const instCargada = this.dbPropuesta.propuestaInstituciones.find( propIsnt => propIsnt.idInstitucion === propInst.idInstitucion );
             if(instCargada){
                const nuevaData = this.lServiciosModelo.get('INST')?.verDatos(propInst); 
               this.lServiciosModelo.get('INST')?.editarDatos(instCargada, nuevaData);
             } else {
                this.dbPropuesta.propuestaInstituciones.push( propInst );
             }
           })
        }
    }

    cargarPropRelacionadas( propuestasRelacionadas : PropuestaRelacionada[]) {
        if(propuestasRelacionadas.length ){
            
            this.dbPropuesta.propuestaRelacionadas = [];
            this.dbPropuesta.propuestaRelacionadas.push( ...propuestasRelacionadas )
        }
    }

    cargarPropPrevias( propuestasPrevias : PropuestaPrevia[]) {
        if(propuestasPrevias.length ){
            
            this.dbPropuesta.propuestasPrevias = [];
            this.dbPropuesta.propuestasPrevias.push( ...propuestasPrevias );
        }
    }
    
    cargarCapacitaciones( capacitaciones : PropuestaCapacitacion[]) {
        if(capacitaciones.length ){
            
            this.dbPropuesta.propuestaCapacitaciones = [];
            this.dbPropuesta.propuestaCapacitaciones.push( ...capacitaciones )
        }
    }
    cargarLineasTematicas( lineasTematicas : PropuestaLineaTematica[]) {
        if(lineasTematicas.length ){
            
            this.dbPropuesta.propuestaLineaTematicas = [];
            this.dbPropuesta.propuestaLineaTematicas.push( ...lineasTematicas )
        }
    }
    cargarProgramasSippe( progSippe : PropuestaProgramaExtension[]) {
        if(progSippe.length ){
            
            this.dbPropuesta.propuestaProgramaExtensions = [];
            this.dbPropuesta.propuestaProgramaExtensions.push( ...progSippe )
        }
    }
    cargarPalabrasClave( palabrasClave : PropuestaPalabraClave[]) {
        if(palabrasClave.length ){
            
            this.dbPropuesta.propuestaPalabraClaves = [];
            this.dbPropuesta.propuestaPalabraClaves.push( ...palabrasClave )
        }
    }
   
    verIntegrantes( ) {
        const SIntegrantes = this.lServiciosModelo.get('INTEG') ;
        if(this.dbPropuesta.integrantes.length ){
            return this.dbPropuesta.integrantes.map( integ => SIntegrantes?.verDatos(integ));
        }
        return [];
    }

    verObjetivosEspecificos( ) {
        const SObjetivos = this.lServiciosModelo.get('OBJESP');
        if(this.dbPropuesta.objetivoEspecificos.length ){
            return this.dbPropuesta.objetivoEspecificos.map( objEsp => SObjetivos?.verDatos(objEsp))
        }
        return [];
    }
    verInstituciones( ) {
        const SInstituciones = this.lServiciosModelo.get('INST') as IServiciosInstitucion;
        if(this.dbPropuesta.propuestaInstituciones.length ){
          
           return this.dbPropuesta.propuestaInstituciones.map( propInst => SInstituciones.verDatos(propInst) )
        }
        return [];
    }
    verPropRelacionadas( ) {
        if(this.dbPropuesta.propuestaRelacionadas.length ){
           return this.dbPropuesta.propuestaRelacionadas;
        }
        return [];
    }
    verPropPrevias( ) {
        if(this.dbPropuesta.propuestasPrevias.length ){
           return this.dbPropuesta.propuestasPrevias;
        }
        return [];
    }
    verCapacitaciones( ) {
        if(this.dbPropuesta.propuestaCapacitaciones.length ){
           return this.dbPropuesta.propuestaCapacitaciones
        }
        return [];
    }
    verLineasTematicas( ) {
        if(this.dbPropuesta.propuestaLineaTematicas.length ){
           return this.dbPropuesta.propuestaLineaTematicas;
        }
        return [];
    }
    verProgramasSippe( ) {
        if(this.dbPropuesta.propuestaProgramaExtensions.length ){
            return this.dbPropuesta.propuestaProgramaExtensions;
        }
        return [];
    }
    verPalabrasClave( ) {
        if(this.dbPropuesta.propuestaPalabraClaves.length ){
            return this.dbPropuesta.propuestaPalabraClaves.map( propPalabra => ({
                ...propPalabra.dataValues ,
                palabraClave : propPalabra.palabraClave.dataValues
            }));
        }
        return [];
    }
    
    async leerDatos () {

        await this.dbPropuesta.sequelize.transaction( async transaction => {
            await Promise.all([
             this.dbPropuesta.getIntegrantes({transaction}).then( resp => this.dbPropuesta.integrantes = resp ),
             this.dbPropuesta.getObjetivoEspecificos({transaction}).then( resp => this.dbPropuesta.objetivoEspecificos = resp ),
             this.dbPropuesta.getParticipanteSociales({transaction}).then( resp => this.dbPropuesta.participanteSociales = resp ),
             this.dbPropuesta.getPropuestaCapacitaciones({transaction}).then( resp => this.dbPropuesta.propuestaCapacitaciones = resp ),
             this.dbPropuesta.getPropuestaLineaTematicas({transaction}).then( resp => this.dbPropuesta.propuestaLineaTematicas = resp ),
             this.dbPropuesta.getPropuestaInstituciones({transaction}).then( resp => this.dbPropuesta.propuestaInstituciones = resp ),
             this.dbPropuesta.getPropuestaPalabraClaves({transaction}).then( resp => this.dbPropuesta.propuestaPalabraClaves = resp ),
             this.dbPropuesta.getPropuestaProgramaExtensions({transaction}).then( resp => this.dbPropuesta.propuestaProgramaExtensions = resp ), 
             this.dbPropuesta.getPropuestasPrevias({transaction}).then( resp => this.dbPropuesta.propuestasPrevias = resp ),
             this.dbPropuesta.getPropuestaRelacionadas({transaction}).then( resp => this.dbPropuesta.propuestaRelacionadas = resp ),
             this.dbPropuesta.getUbicacionProblematicas({transaction}).then( resp => this.dbPropuesta.ubicacionProblematicas = resp ),
            ]);
        });
               
    }

    async leerDatosIntegrantes () : Promise<void> {
       
        if(this.dbPropuesta.integrantes.length) {
            const SIntegrantes  = this.lServiciosModelo.get('INTEG') as IServiciosIntegrantes;
            // : integrante.getPersona()
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(this.dbPropuesta.integrantes.map( integrante => SIntegrantes?.leerDatos(integrante,transaction)));
            })
             // : integrante.getRoles()
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(this.dbPropuesta.integrantes.map( integrante => SIntegrantes?.leerDatosRoles(integrante,transaction)));
            })
        }
    }

    async leerDatosObjetivos() : Promise<void> {
       
        if(this.dbPropuesta.objetivoEspecificos.length) {
            const iServiciosObjetivoEspecifico = this.lServiciosModelo.get('OBJESP');
            
            // :ObjEspecifico.getActividades()
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(this.dbPropuesta.objetivoEspecificos.map( objEsp => iServiciosObjetivoEspecifico?.leerDatos(objEsp,transaction)) )
            })


            const iServiciosActividadObjetivoEspecifico = this.lServiciosModelo.get('ACTOBJESP');
             // :ActObjEspecifico.getCronogramas()
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(
                    this.dbPropuesta.objetivoEspecificos
                        .map( objEsp => objEsp.actividadObjetivoEspecificos.map( actObjEsp => iServiciosActividadObjetivoEspecifico?.leerDatos(actObjEsp,transaction)))
                        .reduce( (salida,promsesas) => ([...salida,...promsesas]) ,[]) 
                    );
            })
        }
    }
    async leerDatosInstituciones() : Promise<void> {

        if(this.dbPropuesta.propuestaInstituciones.length){ 
            const SInstituciones = this.lServiciosModelo.get('INST') as IServiciosInstitucion;
              // :PropuestaInstitucion.getInstitucion()
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(this.dbPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.leerDatos(propInst,transaction)) )
            });
              // :Institucion.getResponsable()
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(this.dbPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.leerDatosResponsable(propInst.institucion,transaction)) )
            });
               // :Responsable.getPersona()
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(this.dbPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.leerDatosPersonalesResponsable(propInst.institucion,transaction)) )
            });
        }
    }
    async leerDatosPalabrasClave() : Promise<void> {
        
        if(this.dbPropuesta.propuestaPalabraClaves.length) {
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(this.dbPropuesta.propuestaPalabraClaves.map( propPalabra => propPalabra.getPalabraClave({transaction}).then( resp => propPalabra.palabraClave = resp) ));
            });
        }
    }

    async guardarDatosPalabrasClave( ) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( 'ServiciosPropuesta.guardarDatosPalabrasClave()..' );
        if(this.dbPropuesta.propuestaPalabraClaves.length) {
            this.dbPropuesta.propuestaPalabraClaves.forEach( propPalabra => {propPalabra.palabraClave.isNewRecord = propPalabra.palabraClave.idPalabraClave === 0} );
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all( this.dbPropuesta.propuestaPalabraClaves.map( async ({palabraClave}) => palabraClave.set( await palabraClave.save({transaction}) )) );
            });
            this.dbPropuesta.propuestaPalabraClaves
            .filter( propPalabra =>  propPalabra.idPalabraClave === 0)
            .forEach( propPalabra => propPalabra.set(propPalabra.palabraClave.dataValues))
            
        }
    }
    async guardarDatosIntegrantes(  ) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( 'ServiciosPropuesta.guardarDatosIntegrantes()..' );
        if( this.dbPropuesta.integrantes.length ) {
            
            const SIntegrantes  = this.lServiciosModelo.get('INTEG') as IServiciosIntegrantes;
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(  this.dbPropuesta.integrantes.map( integrante => SIntegrantes.guardarDatos(integrante,transaction) ) )
            })
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(  this.dbPropuesta.integrantes.map( integrante => SIntegrantes.guardarDatosRoles(integrante,transaction) ) )
            })
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(  this.dbPropuesta.integrantes.map( integrante => SIntegrantes.guardarDatosPersonales(integrante,transaction) ) )
            })
        }
    }
    async guardarDatosObjetivos( ) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( 'ServiciosPropuesta.guardarDatosObjetivos()..' );
        if(this.dbPropuesta.objetivoEspecificos.length) {
            const SObjEsp = this.lServiciosModelo.get('OBJESP') as iServiciosObjetivoEspecifico;
     
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(this.dbPropuesta.objetivoEspecificos.map( objEsp => SObjEsp?.guardarDatos(objEsp,transaction)) )
            })
           
            await this.dbPropuesta.sequelize.transaction(async transaction => {
                await Promise.all(
                    this.dbPropuesta.objetivoEspecificos.map( objEsp => objEsp.actividadObjetivoEspecificos) 
                                                .reduce((salida, actividades) => ([
                                                    ...salida,
                                                    ...actividades.map( act => SObjEsp.guardarDatosActividades(act,transaction))
                                                ]), <any>[])
                    );
              
            })

            await this.dbPropuesta.sequelize.transaction(async transaction=> {
                await Promise.all(
                    this.dbPropuesta.objetivoEspecificos.map( objEsp => objEsp.actividadObjetivoEspecificos) 
                                                .reduce((salida, actividades) => ([
                                                    ...salida,
                                                    ...actividades.map( act => SObjEsp.guardarCronogramasActividades(act,transaction))
                                                ]), <any>[])
                    )
            })
        }
    }

    async guardarDatosInstituciones (  ) : Promise<void> {
        if(process.env.NODE_ENV==='development') console.log( 'ServiciosPropuesta.guardarDatosInstituciones()..' );
        if(this.dbPropuesta.propuestaInstituciones.length){ 
            const SInstituciones = this.lServiciosModelo.get('INST') as IServiciosInstitucion;

            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(this.dbPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatos(propInst,transaction)) )
            });
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(this.dbPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatosPersonalesResponsable(propInst.institucion,transaction)) )
            });
            await this.dbPropuesta.sequelize.transaction( async transaction => {
                await Promise.all(this.dbPropuesta.propuestaInstituciones.map( propInst => SInstituciones?.guardarDatosResponsable(propInst.institucion,transaction)) )
            });
            
        }
    }

    async guardarDatos ( ) : Promise<void> {

        await this.dbPropuesta.save();

        await this.dbPropuesta.sequelize.transaction( async transaction => {
            await Promise.all([
            PropuestaRelacionada.bulkCreate(this.dbPropuesta.propuestaRelacionadas.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaCapacitacion.bulkCreate(this.dbPropuesta.propuestaCapacitaciones.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaLineaTematica.bulkCreate(this.dbPropuesta.propuestaLineaTematicas.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaProgramaExtension.bulkCreate(this.dbPropuesta.propuestaProgramaExtensions.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaPalabraClave.bulkCreate(this.dbPropuesta.propuestaPalabraClaves.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaInstitucion.bulkCreate(this.dbPropuesta.propuestaInstituciones.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaPrevia.bulkCreate(this.dbPropuesta.propuestasPrevias.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            PropuestaRelacionada.bulkCreate(this.dbPropuesta.propuestaRelacionadas.map( item => item.dataValues),{transaction, ignoreDuplicates : true}),
            ]);
        });
        
        await this.dbPropuesta.sequelize.transaction( async transaction => {

            await Promise.all([
                this.dbPropuesta.setPropuestaCapacitaciones(this.dbPropuesta.propuestaCapacitaciones,{transaction}),
                this.dbPropuesta.setPropuestaLineaTematicas(this.dbPropuesta.propuestaLineaTematicas,{transaction}),
                this.dbPropuesta.setPropuestaProgramaExtensions(this.dbPropuesta.propuestaProgramaExtensions,{transaction}),
                this.dbPropuesta.setPropuestaPalabraClaves(this.dbPropuesta.propuestaPalabraClaves,{transaction}),
                this.dbPropuesta.setPropuestaInstituciones(this.dbPropuesta.propuestaInstituciones,{transaction}),
                this.dbPropuesta.setIntegrantes(this.dbPropuesta.integrantes,{transaction}),
                this.dbPropuesta.setObjetivoEspecificos(this.dbPropuesta.objetivoEspecificos,{transaction}),
                this.dbPropuesta.setUbicacionProblematicas(this.dbPropuesta.ubicacionProblematicas,{transaction}),
                this.dbPropuesta.setPropuestasPrevias(this.dbPropuesta.propuestasPrevias,{transaction}),
                this.dbPropuesta.setPropuestaRelacionadas(this.dbPropuesta.propuestaRelacionadas,{transaction})
            ]);
        });
    }
}