import { Sequelize } from "sequelize";
import { Propuesta, PropuestaId } from "../models/Propuesta";
import { 
    Institucion, 
    Integrante, 
    PalabraClaveAttributes, 
    PersonaAttributes, 
    ResponsableAttributes, 
    initModels 
} from "../models/init-models";
import { PROPUESTA_VACIA, TIntegrante, TPropuesta } from "../types/propuesta";
import { InstitucionId } from "../models/Institucion";
import * as ServiciosInstitucion from "./institucion";
import * as ServiciosIntegrante from './integrante';
import * as ServiciosPlanificacion from './planificacion';
import { TInstitucion } from "../types/institucion";





const verDatosGrales = async( iPropuesta : Propuesta ) => {
    // datos generales
    let salida : {
        lCapacitaciones : number[],
        lLineasTematicas : number[],
        lProgramasExtension : number[],
        lPalabrasClave : PalabraClaveAttributes[]
    } = {
            lCapacitaciones : [],
            lLineasTematicas : [],
            lProgramasExtension : [],
            lPalabrasClave : [],
        }
    
    await iPropuesta.sequelize.transaction({}, async transaction => {
        const lCapacitaciones : number[] = [];
        const lLineasTematicas : number[] = [];
        const lProgramasExtension : number[] = [];
        const lPalabrasClave : PalabraClaveAttributes[] = [];

        await Promise.all([
            iPropuesta.getIdCapacitacionCapacitacions({transaction}).then( resp => lCapacitaciones.push(...resp.map( item => item.idCapacitacion)) ),
            iPropuesta.getIdLineaTematicaLineaTematicas({transaction}).then( resp => lLineasTematicas.push(...resp.map( item => item.idLineaTematica)) ),
            iPropuesta.getIdPalabraClavePalabraClaves({transaction, joinTableAttributes : []}).then( resp => lPalabrasClave.push(...resp)),
            iPropuesta.getIdProgramaExtensionProgramaSippes({transaction}).then( resp => lProgramasExtension.push(...resp.map( item => item.idProgramaSippe)))
        ]);

        transaction.afterCommit( ()=>{
            salida.lCapacitaciones.push(...lCapacitaciones);
            salida.lLineasTematicas.push(...lLineasTematicas);
            salida.lProgramasExtension.push(...lProgramasExtension);
            salida.lPalabrasClave.push(...lPalabrasClave);
        })
        
    } )

    return salida;
}

const verIntegrantesPorPropuesta = async(iPropuesta : Propuesta) => {

    await iPropuesta.sequelize.transaction({}, async transaction => {

        // integrantes

        // obtener integrantes 
        //  c/u obtener datos personales
        //  c/u obtener roles

        iPropuesta.integrantes = await iPropuesta.getIntegrantes({  
            attributes : Object.keys(Integrante.getAttributes()),
            transaction
        });

        console.log('verIntegrantes');
        if(iPropuesta.integrantes.length){
            await Promise.all([
                ...iPropuesta.integrantes.map( integ => ServiciosIntegrante.verPersona(integ,transaction)),
                ...iPropuesta.integrantes.map( integ => ServiciosIntegrante.verRoles(integ,transaction))
            ])   
            
        }
        
    });

}


const verEquipoExtension = async( iPropuesta : Propuesta ) : Promise<TPropuesta["equipoExtension"]> => {

    await verIntegrantesPorPropuesta(iPropuesta);

    iPropuesta.propuestasPrevias = await iPropuesta.getPropuestasPrevias({attributes : ['codigoPropuesta','codigoPropuestaPrevia']});

    return {
        lIntegrantes : iPropuesta.integrantes.map( integ => ServiciosIntegrante.verDatos(integ)),
        lPropuestasPrevias : iPropuesta.propuestasPrevias.map( propPrev => propPrev.dataValues.codigoPropuestaPrevia)
    }
}

const verInstituciones = async( iPropuesta : Propuesta ) => {
    let salida : {lInstituciones : TInstitucion[]} = {lInstituciones : []};
    // instituciones
    const instituciones = await iPropuesta.getIdInstitucionInstitucionPropuestaInstitucions({joinTableAttributes : ['antecedentes']})
    
    if(instituciones.length) {
        await iPropuesta.sequelize.transaction({}, async transaction => {
            await Promise.all(instituciones.map( inst => ServiciosInstitucion.verResponsableAsociado(inst,transaction) ))
        });  
        
        await iPropuesta.sequelize.transaction({}, async transaction => {
            await Promise.all(instituciones.map( inst => ServiciosInstitucion.verDatosResponsable(inst,transaction) ))
        });  
        
        salida.lInstituciones = instituciones.map( inst => ServiciosInstitucion.verDataInstInterviniente(inst) )   
    }
    return salida;
}

const verPlanificacion = async ( iPropuesta : Propuesta ) : Promise<TPropuesta["planificacion"]>=>{

    iPropuesta.objetivoEspecificos = await iPropuesta.getObjetivoEspecificos();
    
    if(iPropuesta.objetivoEspecificos.length) {
        await iPropuesta.sequelize.transaction( async transaction => {
            await Promise.all(
                iPropuesta.objetivoEspecificos.map( obj => ServiciosPlanificacion.verActividadesPorObjetivo( obj , transaction))
            );
        } )
    }

    return {
        lObjetivosEspecificos : iPropuesta.objetivoEspecificos.map( obj => ({
            ...obj.dataValues,
            lActividades : obj.actividadObjetivoEspecificos.map( act => act.dataValues )
        })) 
    }

}

export const  verPropuesta = async( codigo : PropuestaId, db : Sequelize ) => {
    let salida : TPropuesta = PROPUESTA_VACIA;
    const {Propuesta} = initModels(db);
 
    const iPropuesta = await Propuesta.findByPk(codigo ,{ attributes : Object.keys(Propuesta.getAttributes())});

    if(!iPropuesta) throw { status : 400 , message : 'propuesta no encontrada'}
    
    salida = {...salida , ...iPropuesta.dataValues}

    salida = { ...salida , ...await verDatosGrales(iPropuesta)}
    
    salida = { ...salida , ...await verInstituciones(iPropuesta)}
    
    salida = { ...salida , equipoExtension : await verEquipoExtension(iPropuesta)}

    salida = { ...salida , planificacion : await verPlanificacion(iPropuesta)}

    return salida;
}