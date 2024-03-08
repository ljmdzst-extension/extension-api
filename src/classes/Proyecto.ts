import { Propuesta } from "../models/Propuesta";
import ServiciosPropuesta, { TpropuestaIn } from "../services/propuesta";

type TProyecto = {
    codigoPropuesta : string | null
    titulo : string | null
    modalidad : string | null
    duracion : string | null
    categoriaEquipo ?: string | null
    integralidad ?: string | null
    problematicaDetalle ?: string | null
    problematicaSintesis ?: string | null
    proyectosCaid ?: string | null
    propuestaMetodologica ?: string | null
    accionesCoordinacion ?: string | null
    politicasPublicas ?: string | null
    accionesComunicacion ?: string | null
    integralidadDescripcion ?: string | null
    sustentabilidad ?: string | null
    sintesis ?: string | null
    tipoMateriales ?: string | null
    capacitacionAgentesMultip ?: string | null
    perfilAgentesMultip ?: string | null
    solicitaBecarioJustif ?: string | null
    solicitaVoluntarioJustif ?: string | null 
    instanciasCapacitacionDetalle ?: string | null
    solicitaBecario ?: string | null
    ipFinalidad ?: string | null
    ipParticipantesSociales ?: string | null
    ipObserv ?: string | null
    ipPotencialesActividades ?: string | null
    ipCampoTematico ?: string | null
    ipPoliticasPublicas ?: string | null
    ipProblematica ?: string | null
    planificacion : {
        Finalidad ?: string | null,
        ObjetivoGeneral ?: string | null,
        objetivosEspecificos : ({
            idObjetivoEspecifico: number,
            desc : string | null,
            resEsp : string | null,
            actividades : ({
                idActividadObjetivoEspecifico : number,
                desc : string | null,
                motivoModificacion : string | null,
                motivoSuspension : string | null,
            })[]
        })[]
    }
    integrantes : ({
        nroDoc : string,
        ape: string;
        nom: string;
        tel: string | null;
        dom: string | null;
        email: string | null;
        tipoIntegrante : string | null,
        observ : string | null,
        titulo : string | null,
        tieneTarjeta : number | null,
        dedicacionDocente : string | null,
        categoriaDocente : string | null,
        idAreaUnl : number | null,
        idCarrera : number | null,
        periodoLectivo : string | null,
        roles :  number[]
    })[],

    instituciones : ({
        idInstitucion : number,
        nom : string | null,
        dom : string | null,
        email : string | null,
        tel : string | null,
        ubicacion : string | null,
        desde: Date | null,
        hasta: Date | null,
        antecedentes : string| null,
        respNroDoc : string,
        respApe: string;
        respNom: string;
        respTel: string | null;
        respDom: string | null;
        respEmail: string | null;
    })[],

    lineasTematicas : number[],
    programasExtension : number[],
    capacitaciones : number[],
    palabrasClave : ({ idPalabra : number, palabra : string})[],
    proyectosPrevios : string[],
    proyectosRelacionados : string[]
}


class CodigoProyecto {
 
    private codigo !: string | null;
    constructor (    
       private _modalidad : string,
       private _apeUsr : string,
       private _nomUsr : string,
       private _ua : string  
    ){
        this.codigo = null;
    }

    async generarCodigo( ) {

        const cantProyXModalidad = await Propuesta.count({where : {modalidad : this._modalidad}});
        const anioCorriente = new Date(Date.now()).getFullYear().toString().slice(2);
        const iniciales = `${this._nomUsr.slice(0,1)}${this._apeUsr.slice(0,1)}`;
        this.codigo = `${cantProyXModalidad}-${anioCorriente}-${this._modalidad}-${this._ua}-${iniciales}`;
    }
    
    verCodigo() {
        return this.codigo;
    }

}

export default class Proyecto {
    private iPropuesta !: Propuesta;

    constructor ( 
         private codigo : CodigoProyecto,
         private SPropuesta : ServiciosPropuesta,
         _idUsuario : string,
         _titulo : string,
         _modalidad: string
    ){ 
        this.iPropuesta = Propuesta.build( { 
            codigoPropuesta : this.codigo.verCodigo() || 'NN',
            idUsuario : _idUsuario,
            titulo : _titulo,
            modalidad : _modalidad,
        } );
    }

    private limpiarTimestamps (data : any) {
        if(! (data instanceof Object)) 
            return data;
        Object.values(data).forEach( value => {
            this.limpiarTimestamps(value);
        } )
        const {createdAt,updatedAt,deletedAt,...restData} = data as any;
        return restData;
    }

    verDatos () {
        let data = this.SPropuesta.verDatos(this.iPropuesta);
        return this.limpiarTimestamps(data)
    }

    editarDatos( data : TProyecto ) {
        const {
            integrantes,
            instituciones,
            lineasTematicas,
            capacitaciones,
            palabrasClave,
            planificacion,
            ...restData
        } = data;

        const dataPropuesta = {
            ...restData,
            integrantes : integrantes.map( integ => {
                const {
                    idAreaUnl,
                    idCarrera,
                    titulo,
                    tieneTarjeta,
                    tipoIntegrante,
                    periodoLectivo,
                    categoriaDocente,
                    dedicacionDocente,
                    ...restData} = integ;
                const {ape,nom,tel,dom,email,nroDoc , roles} = restData;
                return {
                    nroDoc,
                    codigoPropuesta : this.codigo.verCodigo(),
                    idAreaUnl,
                    idCarrera,
                    titulo,
                    tieneTarjeta,
                    tipoIntegrante,
                    periodoLectivo,
                    categoriaDocente,
                    dedicacionDocente,
                    persona : {
                        nroDoc,
                        ape,
                        nom,
                        tel,
                        dom,
                        email
                    },
                    roles : roles.map( rol => ({
                        idRolIntegrante : rol,
                        codigoPropuesta : this.codigo.verCodigo(),
                        nroDoc
                    }))

                }
            }),
            instituciones,
            objetivosEspecificos,
            propuestaPalabrasClave,
            propuestaCapacitaciones,
            propuestaLineasTematicas,
            propuestaProgramasExtension,
            propuestasRelacionadas,
            propuestasPrevias
        } 

        
        this.SPropuesta.editarDatos(this.iPropuesta,data);
    }

    async leerDatosDeBD( ) {
        return this.SPropuesta.leerDatosDeBD(this.iPropuesta);
    }

    async guardarDatosEnBD( ){ 
        return this.SPropuesta.guardarDatosEnBD(this.iPropuesta);
    }


   

}