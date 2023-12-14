import { ActividadObjetivoEspecificoAttributes } from "../models/ActividadObjetivoEspecifico";
import { GeolocalizacionAttributes } from "../models/Geolocalizacion";
import { IntegranteAttributes } from "../models/Integrante";
import { ObjetivoEspecificoAttributes } from "../models/ObjetivoEspecifico";
import { PropuestaAttributes } from "../models/Propuesta";
import { PropuestaCapacitacionAttributes } from "../models/PropuestaCapacitacion";
import { PropuestaInstitucionAttributes } from "../models/PropuestaInstitucion";
import { PropuestaLineaTematicaAttributes } from "../models/PropuestaLineaTematica";
import { PropuestaPalabraClaveAttributes } from "../models/PropuestaPalabraClave";
import { PropuestaPreviaAttributes } from "../models/PropuestaPrevia";
import { PropuestaProgramaExtensionAttributes } from "../models/PropuestaProgramaExtension";
import { PropuestaRelacionadaAttributes } from "../models/PropuestaRelacionada";

export type TPropuesta = PropuestaAttributes & {
    lInstituciones : PropuestaInstitucionAttributes[],
    lIntegrantes : IntegranteAttributes[],
    planificacion : {
        lObjetivosEspecificos : (ObjetivoEspecificoAttributes & {lActividades : ActividadObjetivoEspecificoAttributes[]})[]
    },
    lPropuestasPrevias : PropuestaPreviaAttributes[],
    lPropuestasRelacionadas : PropuestaRelacionadaAttributes[],
    lGeolocalizaciones : GeolocalizacionAttributes[],
    lProgramasExtension : PropuestaProgramaExtensionAttributes[],
    lCapacitaciones : PropuestaCapacitacionAttributes[],
    lLineasTematicas : PropuestaLineaTematicaAttributes[],
    lPalabrasClave  : PropuestaPalabraClaveAttributes[]
}