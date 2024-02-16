import { Propuesta, PropuestaAttributes, PropuestaCreationAttributes } from "../models/Propuesta";
import { PropuestaCapacitacion, PropuestaCapacitacionAttributes, PropuestaCapacitacionCreationAttributes } from "../models/PropuestaCapacitacion";
import { PropuestaLineaTematica, PropuestaLineaTematicaAttributes, PropuestaLineaTematicaCreationAttributes } from "../models/PropuestaLineaTematica";
import { PropuestaProgramaExtension, PropuestaProgramaExtensionAttributes, PropuestaProgramaExtensionCreationAttributes } from "../models/PropuestaProgramaExtension";
import { PropuestaPalabraClave, PropuestaPalabraClaveAttributes, PropuestaPalabraClaveCreationAttributes } from "../models/PropuestaPalabraClave";
import { PropuestaInstitucion, PropuestaInstitucionAttributes, PropuestaInstitucionCreationAttributes } from "../models/PropuestaInstitucion";
import { Integrante, IntegranteAttributes, IntegranteCreationAttributes } from "../models/Integrante";
import { ObjetivoEspecifico, ObjetivoEspecificoCreationAttributes } from "../models/ObjetivoEspecifico";
import { UbicacionProblematica, UbicacionProblematicaCreationAttributes } from "../models/UbicacionProblematica";
import ServiciosIntegrantes from "./integrante";
import ServiciosPlanificacion from "./planificacion";
import ServiciosInstitucion from "./institucion";


export default class ServiciosPropuesta {
    
    static async editarDatos(
        iPropuesta : Propuesta,
        data: PropuestaCreationAttributes & {
            propuestaCapacitaciones ?: PropuestaCapacitacionCreationAttributes[],
            propuestaLineaTematicas ?: PropuestaLineaTematicaCreationAttributes[],
            propuestaProgramaExtensions ?: PropuestaProgramaExtensionCreationAttributes[] ,
            propuestaPalabraClaves ?: PropuestaPalabraClaveCreationAttributes[],
            propuestaInstituciones ?: PropuestaInstitucionCreationAttributes[],
            integrantes ?: IntegranteCreationAttributes[],
            objetivoEspecificos ?: ObjetivoEspecificoCreationAttributes[],
            ubicacionProblematicas ?: UbicacionProblematicaCreationAttributes[],
        }
    ): Promise<void> {

        if(data.propuestaCapacitaciones) {
            iPropuesta.propuestaCapacitaciones = data.propuestaCapacitaciones.map( idata => PropuestaCapacitacion.build(idata));
        }
        if(data.propuestaLineaTematicas){
            iPropuesta.propuestaLineaTematicas = data.propuestaLineaTematicas.map( idata => PropuestaLineaTematica.build(idata));
        }
        if(data.propuestaProgramaExtensions){
            iPropuesta.propuestaProgramaExtensions = data.propuestaProgramaExtensions.map( idata => PropuestaProgramaExtension.build(idata));
        }
        if( data.propuestaPalabraClaves){
            iPropuesta.propuestaPalabraClaves = data.propuestaPalabraClaves.map( idata => PropuestaPalabraClave.build(idata));
        }
        if(data.propuestaInstituciones){
            iPropuesta.propuestaInstituciones = data.propuestaInstituciones.map( idata => PropuestaInstitucion.build(idata));
        }
        if(data.integrantes){
            iPropuesta.integrantes = data.integrantes.map( idata => Integrante.build(idata));
        }
        if(data.objetivoEspecificos){
            iPropuesta.objetivoEspecificos = data.objetivoEspecificos.map( idata => ObjetivoEspecifico.build(idata));
        }
        if(data.ubicacionProblematicas){
            iPropuesta.ubicacionProblematicas = data.ubicacionProblematicas.map( idata => UbicacionProblematica.build(idata));
        }
        
    }

    static verDatos(iPropuesta : Propuesta,): PropuestaAttributes & {
        propuestaCapacitaciones ?: PropuestaCapacitacionCreationAttributes[],
        propuestaLineaTematicas ?: PropuestaLineaTematicaCreationAttributes[],
        propuestaProgramaExtensions ?: PropuestaProgramaExtensionCreationAttributes[] ,
        propuestaPalabraClaves ?: PropuestaPalabraClaveCreationAttributes[],
        propuestaInstituciones ?: PropuestaInstitucionCreationAttributes[],
        integrantes ?: IntegranteCreationAttributes[],
        objetivoEspecificos ?: ObjetivoEspecificoCreationAttributes[],
        ubicacionProblematicas ?: UbicacionProblematicaCreationAttributes[],
    } {
        
        let salida : PropuestaAttributes & {
            propuestaCapacitaciones ?: PropuestaCapacitacionCreationAttributes[],
            propuestaLineaTematicas ?: PropuestaLineaTematicaCreationAttributes[],
            propuestaProgramaExtensions ?: PropuestaProgramaExtensionCreationAttributes[] ,
            propuestaPalabraClaves ?: PropuestaPalabraClaveCreationAttributes[],
            propuestaInstituciones ?: PropuestaInstitucionCreationAttributes[],
            integrantes ?: IntegranteCreationAttributes[],
            objetivoEspecificos ?: ObjetivoEspecificoCreationAttributes[],
            ubicacionProblematicas ?: UbicacionProblematicaCreationAttributes[],
        } = {
            codigoPropuesta : '',
            idUsuario : '',
            titulo : '',
            modalidad : ''
        };
        
        salida = {...salida,...iPropuesta.dataValues}

        if(iPropuesta.propuestaCapacitaciones.length){
            salida = {...salida, propuestaCapacitaciones : iPropuesta.propuestaCapacitaciones.map(item => item.dataValues)}
        }
        if(iPropuesta.propuestaLineaTematicas.length){
            salida = {...salida, propuestaLineaTematicas : iPropuesta.propuestaLineaTematicas.map(item => item.dataValues)}
        }
        if(iPropuesta.propuestaProgramaExtensions.length){
            salida = {...salida, propuestaProgramaExtensions : iPropuesta.propuestaProgramaExtensions.map(item => item.dataValues)}
        }
        if(iPropuesta.propuestaPalabraClaves.length){
            salida = {...salida, propuestaPalabraClaves : iPropuesta.propuestaPalabraClaves.map(item => item.dataValues)}
        }
        if(iPropuesta.propuestaInstituciones.length){
            salida = {...salida, propuestaInstituciones : iPropuesta.propuestaInstituciones.map(item => item.dataValues)}
        }
        if(iPropuesta.integrantes.length){
            salida = {...salida, integrantes : iPropuesta.integrantes.map(item => item.dataValues)}
        }
        if(iPropuesta.objetivoEspecificos.length){
            salida = {...salida, objetivoEspecificos : iPropuesta.objetivoEspecificos.map(item => item.dataValues)}
        }
        if(iPropuesta.ubicacionProblematicas.length){
            salida = {...salida, ubicacionProblematicas : iPropuesta.ubicacionProblematicas.map(item => item.dataValues)}
        }

        return salida;
    }

    static async leerDatos (iPropuesta : Propuesta) : Promise<void>{

        await iPropuesta.sequelize.transaction( async transaction => {
            
            iPropuesta.propuestaCapacitaciones = await iPropuesta.getPropuestaCapacitaciones({transaction});
            iPropuesta.integrantes = await iPropuesta.getIntegrantes({transaction});
            iPropuesta.objetivoEspecificos = await iPropuesta.getObjetivoEspecificos({transaction});
            iPropuesta.participanteSociales = await iPropuesta.getParticipanteSociales({transaction});
            iPropuesta.propuestaCapacitaciones = await iPropuesta.getPropuestaCapacitaciones({transaction});
            iPropuesta.propuestaInstituciones = await iPropuesta.getPropuestaInstituciones({transaction});
            iPropuesta.propuestaLineaTematicas = await iPropuesta.getPropuestaLineaTematicas({transaction});
            iPropuesta.propuestaPalabraClaves = await iPropuesta.getPropuestaPalabraClaves({transaction});
            iPropuesta.propuestaProgramaExtensions = await iPropuesta.getPropuestaProgramaExtensions({transaction});
            iPropuesta.propuestaRelacionadas = await iPropuesta.getPropuestaRelacionadas({transaction});
            iPropuesta.ubicacionProblematicas = await iPropuesta.getUbicacionProblematicas({transaction});
        });

        await iPropuesta.sequelize.transaction(async transaction => {
            await Promise.all(iPropuesta.integrantes.map( integ => ServiciosIntegrantes.leerDatos(integ,transaction) ))
        })
        await iPropuesta.sequelize.transaction(async transaction => {
            await Promise.all(iPropuesta.objetivoEspecificos.map( obj => ServiciosPlanificacion.leerDatosObjetivo(obj,transaction) ))
        })

        await iPropuesta.sequelize.transaction(async transaction => {

            await Promise.all(
                iPropuesta.objetivoEspecificos.map(obj => 
                    ServiciosPlanificacion.leerDatosActividades(obj.actividadObjetivoEspecificos,transaction)
                )
            );
        });

        await iPropuesta.sequelize.transaction(async transaction => {
            await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => propInst.getInstitucion({transaction}).then( inst => propInst.institucion = inst ) ));
        })
        await iPropuesta.sequelize.transaction(async transaction => {
            await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => ServiciosInstitucion.leerDatos(propInst.institucion, transaction)));
        })
        await iPropuesta.sequelize.transaction(async transaction => {
            await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => ServiciosInstitucion.leerDatosResponsable(propInst.institucion, transaction)));
        })

        await iPropuesta.sequelize.transaction(async transaction =>{
            await Promise.all(iPropuesta.ubicacionProblematicas.map( ubicProp => ubicProp.getUbicacion({transaction}).then( ubic => ubicProp.ubicacion = ubic) ));
        })
    }

    static async guardarDatos (iPropuesta : Propuesta ) : Promise<void> {

        await iPropuesta.save();
        
        await iPropuesta.sequelize.transaction( async transaction => {

            await Promise.all([
                iPropuesta.propuestaCapacitaciones.map( item => item.save({transaction})),
                iPropuesta.propuestaLineaTematicas.map( item => item.save({transaction})),
                iPropuesta.propuestaProgramaExtensions.map( item => item.save({transaction})),
                iPropuesta.propuestaPalabraClaves.map( item => item.save({transaction})),
                iPropuesta.propuestaInstituciones.map( item => item.save({transaction})),
                iPropuesta.integrantes.map( item => item.save({transaction})),
                iPropuesta.objetivoEspecificos.map( item => item.save({transaction})),
                iPropuesta.ubicacionProblematicas.map( item => item.save({transaction}))
            ]);
        });
    }

    static actualizarEstado(iPropuesta : Propuesta,estado: number): Promise<void> {
        throw Error("Method not implemented.");
    }
    
   
    

  
}



