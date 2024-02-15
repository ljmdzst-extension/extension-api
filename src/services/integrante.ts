import { Transaction } from "sequelize"
import { Integrante } from "../models/Integrante"
import { TIntegrante } from "../types/propuesta"
import { PERSONA_VACIA } from "../models/Persona"


export const verPersona = async( iIntegrante : Integrante, transaction ?: Transaction ) => {
    
    iIntegrante.nroDocPersona = await iIntegrante.getNroDocPersona({transaction})
    
}

export const verRoles = async( iIntegrante : Integrante , transaction ?: Transaction) => {
    iIntegrante.rolIntegrantes = await iIntegrante.getRolIntegrantes({transaction});
}

export const verDatos = ( iIntegrante : Integrante) => {

    let salida : TIntegrante =  {
        ...PERSONA_VACIA,
        codigoPropuesta : '',
        tipoIntegrante : 1,
        lRoles : []
    }
    

    if(iIntegrante.nroDocPersona){
        salida = {
            ...salida, 
            ...iIntegrante.nroDocPersona.dataValues
        }  
    }

    if(iIntegrante.rolIntegrantes){
        salida = {
            ...salida , 
            lRoles : iIntegrante.rolIntegrantes.map( rol => rol.idRolIntegrante)
        }
    }

    return salida;
}


