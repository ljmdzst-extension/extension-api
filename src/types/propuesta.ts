import { ActividadObjetivoEspecificoAttributes, ActividadObjetivoEspecificoCreationAttributes } from "../models/ActividadObjetivoEspecifico";
import { IntegranteAttributes, IntegranteCreationAttributes } from "../models/Integrante";
import { ObjetivoEspecificoAttributes, ObjetivoEspecificoCreationAttributes } from "../models/ObjetivoEspecifico";
import { PropuestaAttributes, PropuestaCreationAttributes } from "../models/Propuesta";
import { PropuestaInstitucionAttributes, PropuestaInstitucionCreationAttributes } from "../models/PropuestaInstitucion";
import { PropuestaPreviaAttributes } from "../models/PropuestaPrevia";
import { PropuestaRelacionadaAttributes } from "../models/PropuestaRelacionada";
import { PersonaAttributes, PersonaCreationAttributes } from "../models/Persona";
import { PalabraClaveAttributes, PalabraClaveCreationAttributes } from "../models/PalabraClave";
import { ProgramaSIPPEId } from "../models/ProgramaSIPPE";
import { UbicacionAttributes, UbicacionId } from "../models/Ubicacion";
import { LineaTematicaId } from "../models/LineaTematica";

export type TPropuesta = PropuestaAttributes & {
    lInstituciones : PropuestaInstitucionAttributes[],
    lIntegrantes : (IntegranteAttributes & PersonaAttributes)[],
    planificacion : {
        lObjetivosEspecificos : (ObjetivoEspecificoAttributes & {lActividades : ActividadObjetivoEspecificoAttributes[]})[]
    },
    lPropuestasPrevias : PropuestaPreviaAttributes[],
    lPropuestasRelacionadas : PropuestaRelacionadaAttributes[],
    lGeolocalizaciones : UbicacionAttributes[],
    lProgramasExtension : ProgramaSIPPEId[],
    lCapacitaciones : UbicacionId[],
    lLineasTematicas : LineaTematicaId[],
    lPalabrasClave  : PalabraClaveAttributes[]
}

export type TPutPropuesta = PropuestaCreationAttributes & {
    lInstituciones : PropuestaInstitucionCreationAttributes[],
    lIntegrantes : (IntegranteCreationAttributes & PersonaCreationAttributes)[],
    planificacion : {
        lObjetivosEspecificos : (ObjetivoEspecificoCreationAttributes & {lActividades : ActividadObjetivoEspecificoCreationAttributes[]})[]
    },
    lPropuestasPrevias : PropuestaPreviaAttributes[],
    lPropuestasRelacionadas : PropuestaRelacionadaAttributes[],
    lGeolocalizaciones : UbicacionAttributes[],
    lProgramasExtension : ProgramaSIPPEId[],
    lCapacitaciones : UbicacionId[],
    lLineasTematicas : LineaTematicaId[],
    lPalabrasClave  : PalabraClaveCreationAttributes[]
}