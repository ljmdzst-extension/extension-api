
import { Model, Transaction } from "sequelize";
import { Propuesta } from "../models/Propuesta";
import { Usuario } from "../models/Usuario";
import { TDataPostProyecto } from "../types/proyecto";
import { IServiciosModelo } from "./IServiciosModelo";
import ServiciosInstitucion, { IServiciosInstitucion, ServiciosResponsable } from "./institucion";
import ServiciosIntegrantes from "./integrante";
import { ServiciosActividadObjetivoEspecifico, ServiciosObjetivoEspecifico } from "./planificacion";
import ServiciosPropuesta from "./propuesta";

type TipoServicio = string; 

export default class ServiciosProyecto implements IServiciosModelo {

    private lServiciosModelo !: Map<TipoServicio,IServiciosModelo>
    
    constructor(){
        this.lServiciosModelo = new Map(  );
        this.lServiciosModelo.set('Propuesta',new ServiciosPropuesta());
        this.lServiciosModelo.set('Integrantes',new ServiciosIntegrantes());
        this.lServiciosModelo.set('ObjEsp',new ServiciosObjetivoEspecifico());
        this.lServiciosModelo.set('ActObjEsp',new ServiciosActividadObjetivoEspecifico());
        this.lServiciosModelo.set('Instituciones',new ServiciosInstitucion());
        
    }
    async leerDatos(iProyecto: Propuesta): Promise<void> {
        const iServiciosPropuesta = this.lServiciosModelo.get('Propuesta');
        if(!iServiciosPropuesta) throw { status : 500 , message : 'No se cargó ServicioPropuesta en ServiciosProyecto'}

        await iServiciosPropuesta.leerDatos(iProyecto);

        await this.leerDatosEquipoExtension(iProyecto);
        await this.leerDatosPlanificacion(iProyecto);
        await this.leerDatosInstituciones(iProyecto);
    }
    async guardarDatos(iProyecto: Propuesta, transaction?: Transaction | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async crearProyecto( {titulo,modalidad,unidadAcademica,duracion} : TDataPostProyecto, iUsuario : Usuario ): Promise<Propuesta> {
        const anioCorriente = new Date(Date.now()).getFullYear().toString().slice(2);
        const nom = iUsuario.persona.nom;
        const ape = iUsuario.persona.ape;
        const countProyectosPorModalidad = await Propuesta.count({where : {modalidad }});
        const codigo = `${anioCorriente}-${countProyectosPorModalidad}-${modalidad}-${unidadAcademica}-${nom[0]}-${ape[0]}`;

        const iProyecto = Propuesta.build( {
             codigoPropuesta : codigo,
             titulo,
             modalidad,
             duracion , 
             idUsuario : iUsuario.idUsuario
            });

        iProyecto.integrantes = [];
        iProyecto.propuestasPrevias = [];
        iProyecto.objetivoEspecificos = [];
        iProyecto.propuestasPrevias = [];
        iProyecto.propuestaInstituciones = [];
        iProyecto.propuestaCapacitaciones = [];
        iProyecto.propuestaLineaTematicas = [];
        iProyecto.propuestaProgramaExtensions = [];
        iProyecto.propuestaPalabraClaves = [];
        iProyecto.ubicacionProblematicas = [];
        return iProyecto;
    }

    verDatos( iProyecto : Propuesta )  {
      
        const iServiciosPropuesta = this.lServiciosModelo.get('Propuesta');
        if(!iServiciosPropuesta) throw { status : 500 , message : 'No se cargó ServicioPropuesta en ServiciosProyecto'}
        const {
            planificacionObjetivoGeneral,
            planificacionFinalidad,
            integrantes,
            objetivoEspecificos,
            ubicacionProblematicas,
            ...restData
        } = iServiciosPropuesta.verDatos(iProyecto);
   
        return {
            ...restData,
            ...this.verDatosEquipoExtension(iProyecto),
            ...this.verDatosPlanificacion(iProyecto),
            ...this.verDatosInstituciones(iProyecto)
        }
    }
    verDatosEquipoExtension( iProyecto : Propuesta) {
        const iServiciosIntegrantes  = this.lServiciosModelo.get('Integrantes');
        if(!iServiciosIntegrantes) throw { status : 500 , message : 'No se cargó ServicioIntegrante en ServiciosProyecto'}
        
        let  equipoExtension = {
            lIntegrantes : <any>[],
            lProyectosPrevios : <any>[]
        }

        if(iProyecto.integrantes.length) {
           
            equipoExtension.lIntegrantes = iProyecto.integrantes.map( integ => iServiciosIntegrantes.verDatos(integ) );
        }
       
        if(iProyecto.propuestasPrevias.length){
            console.log('verDatosEquipoExtension()')
            equipoExtension.lProyectosPrevios = iProyecto.propuestasPrevias.map( propPrev => propPrev.codigoPropuestaPrevia);
        } 
        
        
        return {
            equipoExtension 
        }
    }
    verDatosPlanificacion (iProyecto : Propuesta){
        
        const iServiciosObjetivoEspecifico = this.lServiciosModelo.get('ObjEsp');
        
        if(!iServiciosObjetivoEspecifico) throw { status : 500 , message : 'No se cargó ServicioObjetivoEspecifco en ServiciosProyecto'}
        
        
        let planificacion = {
            finalidad : iProyecto.planificacionFinalidad || '',
            objetivoGeneral : iProyecto.planificacionObjetivoGeneral|| '',
            lObjetivosEspecificos : <any>[]
        };
        if( iProyecto.objetivoEspecificos.length ) {
            planificacion.lObjetivosEspecificos = iProyecto.objetivoEspecificos.map( objEsp => iServiciosObjetivoEspecifico.verDatos(objEsp));
            
        }
        return {
            planificacion
        }
    }
    verDatosInstituciones( iProyecto : Propuesta ) {
         // refactorizar para mostrar datos personales del responsable usando serivicos del responsable
        const iServiciosInstitucion = this.lServiciosModelo.get('Instituciones');
        if(!iServiciosInstitucion)throw { status : 500 , message : 'No se cargó ServiciosInstitucion en ServiciosProyecto'}
        
        let instituciones = [];

        if(iProyecto.propuestaInstituciones.length) {
            instituciones = iProyecto.propuestaInstituciones.map( propInst => iServiciosInstitucion.verDatos(propInst))
        }
       
        return {
           instituciones
        }
    }

    async leerDatosEquipoExtension( iProyecto : Propuesta) {
        const iServiciosIntegrantes  = this.lServiciosModelo.get('Integrantes');
        if(!iServiciosIntegrantes) throw { status : 500 , message : 'No se cargó ServicioIntegrante en ServiciosProyecto'}
        
        if(iProyecto.integrantes.length) {
            await iProyecto.sequelize.transaction( async transaction => {
                await Promise.all(iProyecto.integrantes.map( integrante => iServiciosIntegrantes.leerDatos(integrante,transaction)));
            })
        }
    }

    async leerDatosPlanificacion ( iProyecto : Propuesta){
        const iServiciosObjetivoEspecifico = this.lServiciosModelo.get('ObjEsp');
        if(!iServiciosObjetivoEspecifico) throw { status : 500 , message : 'No se cargó ServicioObjetivoEspecifco en ServiciosProyecto'}
        const iServiciosActividadObjetivoEspecifico = this.lServiciosModelo.get('ActObjEsp');
        if(!iServiciosActividadObjetivoEspecifico) throw { status : 500 , message : 'No se cargó ServiciosActividadObjetivoEspecifico en ServiciosProyecto'}

        if(iProyecto.objetivoEspecificos.length) {
            await iProyecto.sequelize.transaction( async transaction => {
                await Promise.all(iProyecto.objetivoEspecificos.map( objEsp => iServiciosObjetivoEspecifico.leerDatos(objEsp,transaction)) )
            })
            await iProyecto.sequelize.transaction(async transaction => {
                await Promise.all(
                    iProyecto.objetivoEspecificos
                        .map( objEsp => objEsp.actividadObjetivoEspecificos.map( actObjEsp => iServiciosActividadObjetivoEspecifico.leerDatos(actObjEsp,transaction)))
                        .reduce( (salida,promsesas) => ([...salida,...promsesas]) ,[]) 
                    );
            })
        }

    }

    async leerDatosInstituciones( iProyecto : Propuesta) {
        const iServiciosInstituciones = this.lServiciosModelo.get('Instituciones') as IServiciosInstitucion;
        if(!iServiciosInstituciones) throw { status : 500 , message : 'No se cargó iServiciosInstituciones en ServiciosProyecto'}
        
        if(iProyecto.propuestaInstituciones.length){ 
            await iProyecto.sequelize.transaction( async transaction => {
                await Promise.all(iProyecto.propuestaInstituciones.map( propInst => iServiciosInstituciones.leerDatos(propInst,transaction)) )
            });
            await iProyecto.sequelize.transaction( async transaction => {
                await Promise.all(iProyecto.propuestaInstituciones.map( propInst => iServiciosInstituciones.leerDatosResponsable(propInst.institucion,transaction)) )
            });
            await iProyecto.sequelize.transaction( async transaction => {
                await Promise.all(iProyecto.propuestaInstituciones.map( propInst => iServiciosInstituciones.leerDatosPersonalesResponsable(propInst.institucion,transaction)) )
            });
        }
    }
}