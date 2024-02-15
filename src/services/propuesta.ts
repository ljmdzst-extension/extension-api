import { Sequelize } from "sequelize";
import { PropuestaId } from "../models/Propuesta";
import { 
    Institucion, 
    Integrante, 
    PalabraClaveAttributes, 
    PersonaAttributes, 
    ResponsableAttributes, 
    initModels 
} from "../models/init-models";
import { PROPUESTA_VACIA, TPropuesta } from "../types/propuesta";
import { InstitucionId } from "../models/Institucion";


export const  verPropuesta = async( codigo : PropuestaId, db : Sequelize ) => {
    let salida : TPropuesta = PROPUESTA_VACIA;
    const {Propuesta} = initModels(db);
 
    const iPropuesta = await Propuesta.findByPk(codigo);

    if(!iPropuesta) throw { status : 400 , message : 'propuesta no encontrada'}
    
    salida = {...salida,...iPropuesta.dataValues}

    await db.transaction({}, async transaction => {
        // datos generales

        const lCapacitaciones : number[] = [];
        const lLineasTematicas : number[] = [];
        const lProgramasExtension : number[] = [];
        const lPalabrasClave : PalabraClaveAttributes[] = [];

        await Promise.all([
            iPropuesta.getIdCapacitacionCapacitacions({transaction}).then( resp => lCapacitaciones.push(...resp.map( item => item.idCapacitacion)) ),
            iPropuesta.getIdLineaTematicaLineaTematicas({transaction}).then( resp => lLineasTematicas.push(...resp.map( item => item.idLineaTematica)) ),
            iPropuesta.getIdPalabraClavePalabraClaves({transaction}).then( resp => lPalabrasClave.push(...resp)),
            iPropuesta.getIdProgramaExtensionProgramaSippes({transaction}).then( resp => lProgramasExtension.push(...resp.map( item => item.idProgramaSippe)))
        ]);

        transaction.afterCommit( ()=>{
            salida.lCapacitaciones.push(...lCapacitaciones);
            salida.lLineasTematicas.push(...lLineasTematicas);
            salida.lProgramasExtension.push(...lProgramasExtension);
            salida.lPalabrasClave.push(...lPalabrasClave);
        })
        
    } )

    await db.transaction({}, async transaction => {
        // instituciones
        const institucionesObtenidas : Institucion[] = [];
        const responsablesObtenidos : Map<InstitucionId,PersonaAttributes & ResponsableAttributes> = new Map();
        await Promise.all([
            iPropuesta.getIdInstitucionInstitucionPropuestaInstitucions({transaction}).then( instituciones => institucionesObtenidas.push(...instituciones)  ),
            institucionesObtenidas.map( institucion => 
                institucion.getNroDocPersonaResponsables({joinTableAttributes : ['idInstitucion','desde','hasta']})
                .then( responsables => responsablesObtenidos.set(responsables[0].responsables[0].idInstitucion,{...responsables[0],...responsables[0].responsables[0]}) ) )
        ]);

        transaction.afterCommit(()=>{
            salida.lInstituciones.push(
                ...institucionesObtenidas.map( inst => ({
                    ...inst.dataValues,
                    ...responsablesObtenidos.get(inst.idInstitucion) as any
                }))
            );
        })


    });
    
    const lIntegrantes : Integrante[] = [];

    await iPropuesta.getIntegrantes({
        attributes : [
            'nroDoc',
            'codigoPropuesta', 
            'tipoIntegrante',
            'observ',
            'titulo',
            'tieneTarjeta',
            'dedicacionDocente',
            'categoriaDocente',
            'idAreaUNL',
            'idCarrera',
            'periodoLectivo'
        ]
    }).then(
        resp => lIntegrantes.push(...resp)
    )

    if(lIntegrantes.length) {
        await db.transaction({}, async transaction => {

            // integrantes
    
            // obtener integrantes 
            //  c/u obtener datos personales
            //  c/u obtener roles
            await Promise.all(
                lIntegrantes.map( async  integ => {
                    
                    const iPersona = await integ.getNroDocPersona({
                        transaction,
                        attributes : [
                            'nroDoc',
                            'tipoDoc',
                            'ape',
                            'nom',
                            'tel',
                            'dom',
                            'email'
                        ]
                    });
    
                    const lRoles = await integ.getRolIntegrantes({transaction});
                    
                    salida.lIntegrantes.push({
                        ...integ.dataValues,
                        ...iPersona.dataValues,
                        lRoles : lRoles.map( rol => rol.idRolIntegrante)
                    })
                } )
            );
    
            
            
        });
    }


    return salida;
}