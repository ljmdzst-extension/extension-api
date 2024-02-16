
import { Sequelize } from "sequelize";
import { UsuarioId } from "../models/Usuario";
import {  
    Propuesta,
    PropuestaAttributes,
    Persona,
    initModels 
} from "../models/init-models";

export const verPropuestas = async( db : Sequelize , idUsuario : UsuarioId )=>{
    
    let salida : PropuestaAttributes[] = [];
    
    const {Usuario,Persona} = initModels(db);

    const iUsuario = await Usuario.findByPk(idUsuario);

    if( ! iUsuario ) throw { status : 500 , message : `No existe el usuario : ${idUsuario}`}
    
    const lPropuestas :  Propuesta[] = [];
    
    let iPersona :  Persona = new Persona();

    await db.transaction(

        {logging : process.env.NODE_ENV==='development' ? sql => console.log(sql) : undefined},

        async transaction =>{
        
            await Promise.all([
                iUsuario.getPropuestas({attributes : ['codigoPropuesta','titulo','modalidad','duracion'],transaction}).then( resp => lPropuestas.push(...resp) ),
                iUsuario.getPersona({attributes : ['nroDoc','ape','nom'],transaction}).then( persona => iPersona = persona)
                
            ])
            
            transaction.afterCommit(()=>{
                if(lPropuestas.length) {
        
                    salida = lPropuestas.map( propuesta => ({ 
                        ...propuesta.dataValues,
                        responsable : `${iPersona.ape}, ${iPersona.nom}`,
                        idUsuario : iUsuario.idUsuario
                    }))
            
                }
            })
        
        }
    )

    return salida;
}