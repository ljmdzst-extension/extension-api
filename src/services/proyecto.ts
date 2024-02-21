
import { Model, Transaction } from "sequelize";
import { Propuesta } from "../models/Propuesta";
import { Usuario } from "../models/Usuario";
import { TDataPostProyecto } from "../types/proyecto";
import { IServiciosModelo } from "./IServiciosModelo";
import ServiciosPropuesta from "./propuesta";

type TipoServicio = string; 

export default class ServiciosProyecto implements IServiciosModelo {
    private iServiciosPropuesta !: ServiciosPropuesta;
    constructor(){
        this.iServiciosPropuesta = new ServiciosPropuesta();
    }

    async leerDatos(iProyecto: Propuesta): Promise<void> {

        await this.iServiciosPropuesta.leerDatos(iProyecto);

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
      
        const {
            planificacionObjetivoGeneral,
            planificacionFinalidad,
            ...restData
        } = this.iServiciosPropuesta.verDatos(iProyecto);
   
        return {
            ...restData
        }
    }
    verDatosEquipoExtension( iProyecto : Propuesta) {
       
    }
    verDatosPlanificacion (iProyecto : Propuesta){
      
    }
    verDatosInstituciones( iProyecto : Propuesta ) {
         // refactorizar para mostrar datos personales del responsable usando serivicos del responsable
     
    }

    
}