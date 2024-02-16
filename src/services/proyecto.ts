import { Propuesta, PropuestaAttributes } from "../models/Propuesta";
import { TProyecto } from "../types/proyecto";
import ServiciosIntegrantes from "./integrante";
import ServiciosPlanificacion from "./planificacion";
import ServiciosPropuesta from "./propuesta";


export default class ServiciosProyecto  {
    
    static altaProyecto ( data : PropuestaAttributes ) {
        return new Propuesta(data);
    }

    static async verDatos( iProyecto : Propuesta ) : Promise<TProyecto> {
        let salida : TProyecto = {
            codigoPropuesta : '',
            modalidad : '',
            titulo :'',
            equipoExtension : {
                lIntegrantes : [],
                lProyectosPrevios : []
            },
            instituciones : [],
            planificacion : {
                objGral : '',
                finalidad : '',
                lObjetivosEspecificos : []
            }
        }
        
        await ServiciosPropuesta.leerDatos(iProyecto);
        

        salida = {
            codigoPropuesta : iProyecto.codigoPropuesta,
            titulo : iProyecto.titulo,
            modalidad : iProyecto.modalidad,
            duracion : iProyecto.duracion,
            categoriaEquipo : iProyecto.categoriaEquipo,
            integralidad : iProyecto.integralidad,
            problematicaDetalle : iProyecto.problematicaDetalle,
            problematicaSintesis : iProyecto.problematicaSintesis,
            proyectosCaid : iProyecto.proyectosCaid,
            propuestaMetodologica : iProyecto.propuestaMetodologica,
            accionesCoordinacion : iProyecto.accionesCoordinacion,
            politicasPublicas : iProyecto.politicasPublicas,
            accionesComunicacion : iProyecto.accionesComunicacion,
            integralidadDescripcion : iProyecto.integralidadDescripcion,
            sustentabilidad : iProyecto.sustentabilidad,
            sintesis : iProyecto.sintesis,
            tipoMateriales : iProyecto.tipoMateriales,
            capacitacionAgentesMultip : iProyecto.capacitacionAgentesMultip,
            perfilAgentesMultip : iProyecto.perfilAgentesMultip,
            solicitaBecarioJustif : iProyecto.solicitaBecarioJustif,
            solicitaVoluntarioJustif : iProyecto.solicitaVoluntarioJustif,
            instanciasCapacitacionDetalle : iProyecto.instanciasCapacitacionDetalle,
            planificacionFinalidad : iProyecto.planificacionFinalidad,
            planificacionObjetivoGeneral : iProyecto.planificacionObjetivoGeneral,
            solicitaBecario : iProyecto.solicitaBecario,
            ipFinalidad : iProyecto.ipFinalidad,
            ipParticipantesSociales : iProyecto.ipParticipantesSociales,
            ipObserv : iProyecto.ipObserv,
            ipPotencialesActividades : iProyecto.ipPotencialesActividades,
            ipCampoTematico : iProyecto.ipCampoTematico,
            ipPoliticasPublicas : iProyecto.ipPoliticasPublicas,
            ipProblematica : iProyecto.ipProblematica,
            equipoExtension : {
                lIntegrantes : iProyecto.integrantes.map( integ => ServiciosIntegrantes.verDatos(integ) ),
                lProyectosPrevios : iProyecto.propuestasPrevias.map( propPrev => propPrev.codigoPropuestaPrevia)
            },
            planificacion : {
                lObjetivosEspecificos :iProyecto.objetivoEspecificos.map( obj => ServiciosPlanificacion.)
            }
        }


        return salida;

    }
}