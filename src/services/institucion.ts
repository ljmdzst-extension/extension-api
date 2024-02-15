import { Transaction } from "sequelize";
import { Institucion } from "../models/Institucion";
import { TInstitucion } from "../types/institucion";


export const verResponsableAsociado = async( iInstitucion : Institucion, transaction ?: Transaction )  =>{
    iInstitucion.responsables = [];

    iInstitucion.responsables.push( ...await iInstitucion.getResponsables({ transaction }) );

}

export const verDatosResponsable = async (iInstitucion : Institucion, transaction ?: Transaction )=> {
    if(iInstitucion.responsables.length){
        const iResponsableActual = iInstitucion.responsables[iInstitucion.responsables.length -1];
        
        iResponsableActual.nroDocPersona = await iResponsableActual.getNroDocPersona({transaction});
    
    }

}

export const verDataInstInterviniente = ( iInstitucion : Institucion ) => {
    let salida : TInstitucion = {
        idInstitucion : 0,
        nom : ''
    };
    
    const { PropuestaInstitucion ,...data } = iInstitucion.dataValues;
    salida = {...salida , ...data};
    
    if(iInstitucion.responsables.length){
        const responsable = iInstitucion.responsables[iInstitucion.responsables.length -1];
        salida = {
            ...salida, 
            responsable : { 
                ...responsable.dataValues,
                ...responsable.nroDocPersona.dataValues    
            }
        }
    }

    if(PropuestaInstitucion) {
        salida = {
            ...salida,
            antecedentes : PropuestaInstitucion.antecedentes
        }
    }

    return salida;

}