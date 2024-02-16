import { Transaction } from "sequelize";
import { Institucion } from "../models/Institucion";
import { TInstitucion } from "../types/institucion";



export default class ServiciosInstitucion {
   static async verDataInstInterviniente ( iInstitucion : Institucion, transaction ?: Transaction )  {
        let salida : TInstitucion = {
            idInstitucion : iInstitucion.idInstitucion,
            nom : iInstitucion.nom
        };
        salida = await iInstitucion.
        iInstitucion.responsables.push( ...await iInstitucion.getResponsables({ transaction }) );

        if(iInstitucion.responsables.length){
            const iResponsableActual = iInstitucion.responsables[iInstitucion.responsables.length -1];
            
            iResponsableActual.nroDocPersona = await iResponsableActual.getNroDocPersona({transaction});
        
        }

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
    
        return salida;
    
    }
}


