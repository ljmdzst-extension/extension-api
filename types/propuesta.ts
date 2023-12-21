import { ActividadObjetivoEspecificoAttributes } from "../models/ActividadObjetivoEspecifico";
import { IntegranteAttributes } from "../models/Integrante";
import { ObjetivoEspecificoAttributes } from "../models/ObjetivoEspecifico";
import { PropuestaAttributes } from "../models/Propuesta";
import { PropuestaInstitucionAttributes } from "../models/PropuestaInstitucion";
import { PropuestaPreviaAttributes } from "../models/PropuestaPrevia";
import { PropuestaRelacionadaAttributes } from "../models/PropuestaRelacionada";
import { PersonaAttributes } from "../models/Persona";
import { PalabraClaveAttributes } from "../models/PalabraClave";
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