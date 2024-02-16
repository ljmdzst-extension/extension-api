import { Transaction } from "sequelize";
import { Institucion } from "../models/Institucion";



export default class ServiciosInstitucion {
    static async leerDatos ( iInstitucion : Institucion , transaction ?: Transaction )  {
        iInstitucion.responsables = await iInstitucion.getResponsables({transaction});
        
    }

    static async leerDatosResponsable( iInstitucion : Institucion, transaction ?: Transaction ) {
        if(iInstitucion.responsables.length) {
            const ultimoResponsable = iInstitucion.responsables[iInstitucion.responsables.length -1];
            ultimoResponsable.persona = await ultimoResponsable.getPersona({transaction});
        }
    }
}


