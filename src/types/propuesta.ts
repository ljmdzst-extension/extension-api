import { IntegranteAttributes } from "../models/Integrante";
import { ObjetivoEspecificoAttributes } from "../models/ObjetivoEspecifico";
import { PropuestaAttributes } from "../models/Propuesta";
import { PropuestaRelacionadaAttributes } from "../models/PropuestaRelacionada";
import { PersonaAttributes } from "../models/Persona";
import { RolId } from "../models/Rol";
import { PropuestaInstitucionAttributes } from "../models/PropuestaInstitucion";
import { UbicacionProblematicaAttributes } from "../models/UbicacionProblematica";
import { PropuestaProgramaExtensionAttributes } from "../models/PropuestaProgramaExtension";
import { PropuestaCapacitacionAttributes } from "../models/PropuestaCapacitacion";
import { PropuestaLineaTematicaAttributes } from "../models/PropuestaLineaTematica";
import { PropuestaPalabraClaveAttributes } from "../models/PropuestaPalabraClave";
import { PropuestaPreviaAttributes } from "../models/PropuestaPrevia";
import { ParticipanteSocialAttributes } from "../models/ParticipanteSocial";

export type TIntegrante = (IntegranteAttributes & PersonaAttributes & { 
    lRoles : RolId[]
})

export type TPropuesta = PropuestaAttributes & {
    lPropuestaInstituciones : PropuestaInstitucionAttributes[],
    lPropuestasRelacionadas : PropuestaRelacionadaAttributes[],
    lUbicacionesProblematica : UbicacionProblematicaAttributes[],
    lPropuestaProgramasExtension : PropuestaProgramaExtensionAttributes[],
    lPropuestaCapacitaciones : PropuestaCapacitacionAttributes[],
    lPropuestaLineasTematicas : PropuestaLineaTematicaAttributes[],
    lPropuestaPalabraClaves  : PropuestaPalabraClaveAttributes[],
    lIntegrantes : IntegranteAttributes[],
    lPropuestasPrevias : PropuestaPreviaAttributes[],
    lObjetivosEspecificos : ObjetivoEspecificoAttributes[],
    lParticipantesSociales : ParticipanteSocialAttributes[]
}

export const PROPUESTA_VACIA : TPropuesta = {
    codigoPropuesta : '',
    modalidad : '',
    titulo : '',
    idUsuario : '',
    lPropuestaInstituciones : [],
    lPropuestasRelacionadas : [],
    lUbicacionesProblematica : [],
    lPropuestaProgramasExtension : [],
    lPropuestaCapacitaciones : [],
    lPropuestaLineasTematicas : [],
    lPropuestaPalabraClaves : [],
    lIntegrantes : [],
    lPropuestasPrevias : [],
    lObjetivosEspecificos : [],
    lParticipantesSociales : []
}