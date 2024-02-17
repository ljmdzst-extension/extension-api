import { Transaction } from "sequelize";
import { Institucion } from "../models/Institucion";
import { Propuesta } from "../models/Propuesta";



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
    static async leerInstitucionesPorPropuesta ( iPropuesta :  Propuesta){
        await iPropuesta.sequelize.transaction(async transaction => {
            await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => propInst.getInstitucion({transaction}).then( inst => propInst.institucion = inst ) ));
        })
        await iPropuesta.sequelize.transaction(async transaction => {
            await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => ServiciosInstitucion.leerDatos(propInst.institucion, transaction)));
        })
        await iPropuesta.sequelize.transaction(async transaction => {
            await Promise.all(iPropuesta.propuestaInstituciones.map( propInst => ServiciosInstitucion.leerDatosResponsable(propInst.institucion, transaction)));
        })
    }
}


