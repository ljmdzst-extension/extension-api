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
    
    await db.transaction({}, async transaction => {
        // datos generales

        const lCapacitaciones : number[] = [];
        const lLineasTematicas : number[] = [];
        const lProgramasExtension : number[] = [];
        const lPalabrasClave : PalabraClaveAttributes[] = [];

        await Promise.all([
        iPropuesta.getIdCapacitacion_Capacitacions({transaction}).then( resp => lCapacitaciones.push(...resp.map( item => item.idCapacitacion)) ),
        iPropuesta.getIdLineaTematica_LineaTematicas({transaction}).then( resp => lLineasTematicas.push(...resp.map( item => item.idLineaTematica)) ),
        iPropuesta.getIdPalabraClave_PalabraClaves({transaction}).then( resp => lPalabrasClave.push(...resp)),
        iPropuesta.getIdProgramaExtension_ProgramaSIPPEs({transaction}).then( resp => lProgramasExtension.push(...resp.map( item => item.idProgramaSIPPE)))
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
            iPropuesta.getIdInstitucion_Institucion_PropuestaInstitucions({transaction}).then( instituciones => institucionesObtenidas.push(...instituciones)  ),
            institucionesObtenidas.map( institucion => 
                institucion.getNroDoc_Persona_Responsables({joinTableAttributes : ['idInstitucion','desde','hasta']})
                .then( responsables => responsablesObtenidos.set(responsables[0].Responsables[0].idInstitucion,{...responsables[0],...responsables[0].Responsables[0]}) ) )
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
    

    await db.transaction({}, async transaction => {

        // integrantes

        // obtener integrantes 
        //  c/u obtener datos personales
        //  c/u obtener roles


        let respPeticiones : typeof salida.lIntegrantes = [];

        const lIntegrantes : Integrante[] = [];
        
        await Promise.all([
            iPropuesta.getIntegrantes({
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
            ),
        
            lIntegrantes.map( async  integ => {
                
                const iPersona = await integ.getNroDoc_Persona({
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
                
                respPeticiones.push({
                    ...integ.dataValues,
                    ...iPersona.dataValues,
                    lRoles : lRoles.map( rol => rol.idRolIntegrante)
                })
            } )
        ]);

        transaction.afterCommit(()=>{
            salida.lIntegrantes = respPeticiones;
        })
        
    });


    return salida;
}