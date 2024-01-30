import { ActividadObjetivoEspecificoAttributes, ActividadObjetivoEspecificoCreationAttributes } from "../models/ActividadObjetivoEspecifico";
import { IntegranteAttributes, IntegranteCreationAttributes } from "../models/Integrante";
import { ObjetivoEspecificoAttributes, ObjetivoEspecificoCreationAttributes } from "../models/ObjetivoEspecifico";
import { PropuestaAttributes, PropuestaCreationAttributes } from "../models/Propuesta";
import { PropuestaInstitucionAttributes, PropuestaInstitucionCreationAttributes } from "../models/PropuestaInstitucion";
import { PropuestaPreviaAttributes } from "../models/PropuestaPrevia";
import { PropuestaRelacionadaAttributes } from "../models/PropuestaRelacionada";
import { PersonaAttributes, PersonaCreationAttributes } from "../models/Persona";
import { PalabraClaveAttributes, PalabraClaveCreationAttributes } from "../models/PalabraClave";
import { ProgramaSippeId } from "../models/ProgramaSippe";
import { UbicacionAttributes, UbicacionId } from "../models/Ubicacion";
import { LineaTematicaId } from "../models/LineaTematica";
import { InstitucionCreationAttributes } from "../models/Institucion";
import { RolId } from "../models/Rol";
import { CronogramaActividadAttributes, CronogramaActividadCreationAttributes } from "../models/CronogramaActividad";
import { ResponsableAttributes, ResponsableCreationAttributes } from "../models/Responsable";

export type TPropuesta = PropuestaAttributes & {
    lInstituciones : (PropuestaInstitucionAttributes & InstitucionCreationAttributes & {responsable ?: ResponsableAttributes & PersonaAttributes})[],
    lIntegrantes : (IntegranteAttributes & PersonaAttributes)[],
    lPropuestasPrevias : PropuestaPreviaAttributes[],
    lPropuestasRelacionadas : PropuestaRelacionadaAttributes[],
    lGeolocalizaciones : UbicacionAttributes[],
    lProgramasExtension : ProgramaSippeId[],
    lCapacitaciones : UbicacionId[],
    lLineasTematicas : LineaTematicaId[],
    lPalabrasClave  : PalabraClaveAttributes[],
    planificacion : {
        lObjetivosEspecificos : (ObjetivoEspecificoAttributes & {
            lActividades : (ActividadObjetivoEspecificoAttributes & {cronograma ?: CronogramaActividadAttributes[]})[]
        })[]
    },
}

export type TPutPropuesta = PropuestaCreationAttributes & {
    lInstituciones ?: (PropuestaInstitucionCreationAttributes & InstitucionCreationAttributes & {responsable ?: ResponsableCreationAttributes & PersonaCreationAttributes})[],
    lIntegrantes ?: (IntegranteCreationAttributes & {lRoles : RolId[]} & PersonaCreationAttributes)[],
    lObjetivosEspecificos ?: (ObjetivoEspecificoCreationAttributes & {
        lActividades : (ActividadObjetivoEspecificoCreationAttributes & {
            cronograma : CronogramaActividadCreationAttributes[]
        })[]
    })[],
    lPropuestasPrevias ?: PropuestaPreviaAttributes[],
    lPropuestasRelacionadas ?: PropuestaRelacionadaAttributes[],
    lGeolocalizaciones ?: UbicacionAttributes[],
    lProgramasExtension ?: ProgramaSippeId[],
    lCapacitaciones ?: UbicacionId[],
    lLineasTematicas ?: LineaTematicaId[],
    lPalabrasClave ? : PalabraClaveCreationAttributes[]
}

export const PROPUESTA_VACIA : TPropuesta = {
    codigoPropuesta : '',
    modalidad : '',
    titulo : '',
    idUsuario : '',
    lInstituciones : [],
    lIntegrantes : [],
    lPropuestasPrevias : [],
    lPropuestasRelacionadas : [],
    lGeolocalizaciones : [],
    lProgramasExtension : [],
    lCapacitaciones : [],
    lLineasTematicas : [],
    lPalabrasClave : [],
    planificacion : {
        lObjetivosEspecificos : []
    }
}