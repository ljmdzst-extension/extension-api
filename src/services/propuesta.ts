import { Propuesta } from "../models/Propuesta";
import { PROPUESTA_VACIA, TPropuesta } from "../types/propuesta";
import { PropuestaCapacitacion } from "../models/PropuestaCapacitacion";
import { PropuestaLineaTematica } from "../models/PropuestaLineaTematica";
import { PropuestaProgramaExtension } from "../models/PropuestaProgramaExtension";
import { PropuestaPalabraClave } from "../models/PropuestaPalabraClave";
import { PropuestaInstitucion } from "../models/PropuestaInstitucion";
import { Integrante } from "../models/Integrante";
import { ObjetivoEspecifico } from "../models/ObjetivoEspecifico";
import { UbicacionProblematica } from "../models/UbicacionProblematica";
import ServiciosIntegrantes from "./integrante";
import ServiciosPlanificacion from "./planificacion";
import ServiciosInstitucion from "./institucion";
import { transport } from "winston";


export default class ServiciosPropuesta {
    
    static async editarDatos(iPropuesta : Propuesta,data: TPropuesta): Promise<void> {

        iPropuesta.propuestaCapacitaciones = data.lPropuestaCapacitaciones.map( idata => new PropuestaCapacitacion(idata));
        iPropuesta.propuestaLineaTematicas = data.lPropuestaLineasTematicas.map( idata => new PropuestaLineaTematica(idata));
        iPropuesta.propuestaProgramaExtensions = data.lPropuestaProgramasExtension.map( idata => new PropuestaProgramaExtension(idata));
        iPropuesta.propuestaPalabraClaves = data.lPropuestaPalabraClaves.map( idata => new PropuestaPalabraClave(idata));
        iPropuesta.propuestaInstituciones = data.lPropuestaInstituciones.map( idata => new PropuestaInstitucion(idata));
        iPropuesta.integrantes = data.lIntegrantes.map( idata => new Integrante(idata));
        iPropuesta.objetivoEspecificos = data.lObjetivosEspecificos.map( idata => new ObjetivoEspecifico(idata));
        iPropuesta.ubicacionProblematicas = data.lUbicacionesProblematica.map( idata => new UbicacionProblematica(idata));
        
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
                iPropuesta.ubicacionProblematicas.map( item => item.save({transaction})),
            ]);
        });
        
    }

    static verDatos(iPropuesta : Propuesta,): TPropuesta {
        
        let salida = PROPUESTA_VACIA;
        
        if(iPropuesta.integrantes.length){
            salida.lIntegrantes = iPropuesta.integrantes.map( integ => integ.dataValues);
        }
        if(iPropuesta.objetivoEspecificos){
            salida.lObjetivosEspecificos = iPropuesta.objetivoEspecificos.map( obj => obj.dataValues);
        }
        if(iPropuesta.participanteSociales){
            salida.lParticipantesSociales = iPropuesta.participanteSociales.map( part => part.dataValues);
        }
        if(iPropuesta.propuestaCapacitaciones){
            salida.lPropuestaCapacitaciones = iPropuesta.propuestaCapacitaciones.map( cap => cap.dataValues);
        }
        if(iPropuesta.propuestaInstituciones){
            salida.lPropuestaInstituciones = iPropuesta.propuestaInstituciones.map( propInst => propInst.dataValues );
        }
        if(iPropuesta.propuestaLineaTematicas){
            salida.lPropuestaLineasTematicas = iPropuesta.propuestaLineaTematicas.map( propLinTem => propLinTem.dataValues );
        }
        if(iPropuesta.propuestaPalabraClaves){
            salida.lPropuestaPalabraClaves = iPropuesta.propuestaPalabraClaves.map( propPalClav => propPalClav.dataValues);
        }
        if(iPropuesta.propuestaProgramaExtensions){
            salida.lPropuestaProgramasExtension = iPropuesta.propuestaProgramaExtensions.map( propProg => propProg.dataValues)
        }
        if(iPropuesta.propuestaRelacionadas){
            salida.lPropuestasRelacionadas = iPropuesta.propuestaRelacionadas.map( propRel => propRel.dataValues);
        }
        if(iPropuesta.ubicacionProblematicas){
            salida.lUbicacionesProblematica = iPropuesta.ubicacionProblematicas.map( ubicProb => ubicProb.dataValues);
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
            await Promise.all(iPropuesta.objetivoEspecificos.map( obj => ServiciosPlanificacion.leerDatos(obj,transaction) ))
        })
        await iPropuesta.sequelize.transaction(async transaction => {
            await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => propInst.getInstitucion({transaction}).then( inst => propInst.institucion = inst ) ));
        })
        await iPropuesta.sequelize.transaction(async transaction =>{
            await Promise.all(iPropuesta.ubicacionProblematicas.map( ubicProp => ubicProp.getUbicacion({transaction}).then( ubic => ubicProp.ubicacion = ubic) ));
        })
    }

    static actualizarEstado(iPropuesta : Propuesta,estado: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
   
    

  
}



