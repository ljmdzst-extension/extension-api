import { InstitucionAttributes } from "../models/Institucion";
import { PropuestaAttributes, PropuestaId } from "../models/Propuesta";
import { RolIntegranteId } from "../models/RolIntegrante";

type TIntegranteProyecto = {
    nroDoc: string;
    tipoIntegrante: number;
    ape: string;
    nom: string;
    lRoles : RolIntegranteId[];
    tel?: string;
    dom?: string;
    email?: string;
    observ?: string;
    titulo?: string;
    tieneTarjeta?: number;
    dedicacionDocente?: string;
    categoriaDocente?: string;
    idAreaUnl?: number;
    idCarrera?: number;
    periodoLectivo?: string;  
}

type TInstitucionInterviniente = InstitucionAttributes &{
    antecedentes : string,
    responsable : {
        nroDoc: string;
        desde: string;
        hasta?: string;
        ape: string;
        nom: string;
        tel?: string;
        dom?: string;
        email?: string;
    }
}

type TCronograma = {
    mes: number;
    anio: number;
}

type TActividad = {
    desc : string;
    cronograma : TCronograma[];
    motivoModificacion ?: string;
    motivoSuspension ?: string;
}

type TObjetivoEspecifico = {
    desc : string;
    resEsp : string;
    lActividades : TActividad[]
}

export type TProyecto =  {
    codigoPropuesta: string;
    titulo: string;
    modalidad: string;
    duracion?: string;
    categoriaEquipo?: string;
    integralidad?: string;
    problematicaDetalle?: string;
    problematicaSintesis?: string;
    proyectosCaid?: string;
    propuestaMetodologica?: string;
    accionesCoordinacion?: string;
    politicasPublicas?: string;
    accionesComunicacion?: string;
    integralidadDescripcion?: string;
    sustentabilidad?: string;
    sintesis?: string;
    tipoMateriales?: string;
    capacitacionAgentesMultip?: string;
    perfilAgentesMultip?: string;
    solicitaBecarioJustif?: string;
    solicitaVoluntarioJustif?: string;
    instanciasCapacitacionDetalle?: string;
    solicitaBecario?: number;
    ipFinalidad?: string;
    ipParticipantesSociales?: string;
    ipObserv?: string;
    ipPotencialesActividades?: string;
    ipCampoTematico?: string;
    ipPoliticasPublicas?: string;
    ipProblematica?: string;
    planificacionFinalidad?: string;
    planificacionObjetivoGeneral?: string;
    equipoExtension : {
        lIntegrantes : TIntegranteProyecto[],
        lProyectosPrevios : PropuestaId[]
    },
    instituciones : TInstitucionInterviniente[],
    planificacion : {
        objGral : string,
        finalidad : string,
        lObjetivosEspecificos : TObjetivoEspecifico[]
    }
}