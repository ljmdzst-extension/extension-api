import { Propuesta, PropuestaAttributes, PropuestaCreationAttributes } from "../models/Propuesta";
import { PropuestaCapacitacion, PropuestaCapacitacionAttributes, PropuestaCapacitacionCreationAttributes } from "../models/PropuestaCapacitacion";
import { PropuestaLineaTematica, PropuestaLineaTematicaAttributes, PropuestaLineaTematicaCreationAttributes } from "../models/PropuestaLineaTematica";
import { PropuestaProgramaExtension, PropuestaProgramaExtensionAttributes, PropuestaProgramaExtensionCreationAttributes } from "../models/PropuestaProgramaExtension";
import { PropuestaPalabraClave, PropuestaPalabraClaveAttributes, PropuestaPalabraClaveCreationAttributes } from "../models/PropuestaPalabraClave";
import { PropuestaInstitucion, PropuestaInstitucionAttributes, PropuestaInstitucionCreationAttributes } from "../models/PropuestaInstitucion";
import { Integrante, IntegranteAttributes, IntegranteCreationAttributes } from "../models/Integrante";
import { ObjetivoEspecifico, ObjetivoEspecificoAttributes, ObjetivoEspecificoCreationAttributes } from "../models/ObjetivoEspecifico";
import { UbicacionProblematica, UbicacionProblematicaAttributes, UbicacionProblematicaCreationAttributes } from "../models/UbicacionProblematica";
import { IServiciosModelo } from "./IServiciosModelo";


export default class ServiciosPropuesta implements IServiciosModelo {
    
    async editarDatos(
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
        if(data.integrantes){
            iPropuesta.setIntegrantes( Integrante.bulkBuild(data.integrantes));
        }
        if(data.objetivoEspecificos){
            iPropuesta.setObjetivoEspecificos( ObjetivoEspecifico.bulkBuild(data.objetivoEspecificos));
        }
        if(data.propuestaCapacitaciones) {
            iPropuesta.setPropuestaCapacitaciones( PropuestaCapacitacion.bulkBuild(data.propuestaCapacitaciones));
        }
        if(data.propuestaInstituciones){
            iPropuesta.setPropuestaInstituciones(PropuestaInstitucion.bulkBuild(data.propuestaInstituciones));
        }
        if(data.propuestaLineaTematicas){
            iPropuesta.setPropuestaLineaTematicas(PropuestaLineaTematica.bulkBuild(data.propuestaLineaTematicas));
        }
        if(data.propuestaProgramaExtensions){
            iPropuesta.setPropuestaProgramaExtensions(PropuestaProgramaExtension.bulkBuild(data.propuestaProgramaExtensions));
        }
        if( data.propuestaPalabraClaves){
            iPropuesta.setPropuestaPalabraClaves(PropuestaPalabraClave.bulkBuild(data.propuestaPalabraClaves));
        }
        if(data.ubicacionProblematicas){
            iPropuesta.setUbicacionProblematicas ( UbicacionProblematica.bulkBuild(data.ubicacionProblematicas));
        }
        
    }

    verDatos(iPropuesta : Propuesta,): PropuestaAttributes & {
        propuestaCapacitaciones ?: PropuestaCapacitacionAttributes[],
        propuestaLineaTematicas ?: PropuestaLineaTematicaAttributes[],
        propuestaProgramaExtensions ?: PropuestaProgramaExtensionAttributes[] ,
        propuestaPalabraClaves ?: PropuestaPalabraClaveAttributes[],
        propuestaInstituciones ?: PropuestaInstitucionAttributes[],
        integrantes ?: IntegranteAttributes[],
        objetivoEspecificos ?: ObjetivoEspecificoAttributes[],
        ubicacionProblematicas ?: UbicacionProblematicaAttributes[],
    } {
        
        let salida : PropuestaAttributes & {
            propuestaCapacitaciones ?: PropuestaCapacitacionAttributes[],
            propuestaLineaTematicas ?: PropuestaLineaTematicaAttributes[],
            propuestaProgramaExtensions ?: PropuestaProgramaExtensionAttributes[] ,
            propuestaPalabraClaves ?: PropuestaPalabraClaveAttributes[],
            propuestaInstituciones ?: PropuestaInstitucionAttributes[],
            integrantes ?: IntegranteAttributes[],
            objetivoEspecificos ?: ObjetivoEspecificoAttributes[],
            ubicacionProblematicas ?: UbicacionProblematicaAttributes[],
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

    async leerDatos (iPropuesta : Propuesta) : Promise<void>{

        await iPropuesta.sequelize.transaction( async transaction => {
            await Promise.all([
                iPropuesta.getIntegrantes({transaction}).then( resp => iPropuesta.integrantes = resp ),
                iPropuesta.getObjetivoEspecificos({transaction}).then( resp => iPropuesta.objetivoEspecificos = resp ),
                iPropuesta.getParticipanteSociales({transaction}).then( resp => iPropuesta.participanteSociales = resp ),
                iPropuesta.getPropuestaInstituciones({transaction}).then( resp => iPropuesta.propuestaInstituciones = resp ),
                iPropuesta.getPropuestaLineaTematicas({transaction}).then( resp => iPropuesta.propuestaLineaTematicas = resp ),
                iPropuesta.getPropuestaPalabraClaves({transaction}).then( resp => iPropuesta.propuestaPalabraClaves = resp ),
                iPropuesta.getPropuestaCapacitaciones({transaction}).then( resp => iPropuesta.propuestaCapacitaciones = resp ),
                iPropuesta.getPropuestaProgramaExtensions({transaction}).then( resp => iPropuesta.propuestaProgramaExtensions = resp ),
                iPropuesta.getPropuestaRelacionadas({transaction}).then( resp => iPropuesta.propuestaRelacionadas = resp ),
                iPropuesta.getpropuestasPrevias({transaction}).then( resp => iPropuesta.propuestasPrevias = resp ),
                iPropuesta.getUbicacionProblematicas({transaction}).then( resp => iPropuesta.ubicacionProblematicas = resp )
            ]);
        });
        
    }

    async guardarDatos (iPropuesta : Propuesta ) : Promise<void> {

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



