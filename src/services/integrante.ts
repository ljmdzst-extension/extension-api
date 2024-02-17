import { Transaction } from "sequelize"
import { Integrante } from "../models/Integrante"
import { Propuesta } from "../models/Propuesta";


export default class ServiciosIntegrantes {

    static async leerDatos(iIntegrante : Integrante, transaction ?: Transaction ) {
        

        iIntegrante.persona = await iIntegrante.getPersona({transaction});
        iIntegrante.roles = await iIntegrante.getRoles({transaction});
    }
    static async leerIntegrantesPorPropuesta(iPropuesta : Propuesta)  {
        return iPropuesta.sequelize.transaction(async transaction => {
            await Promise.all(iPropuesta.integrantes.map( integ => ServiciosIntegrantes.leerDatos(integ,transaction) ))
        })
    }
    static async guardarDatos(iIntegrante : Integrante, transaction ?: Transaction ) {
        if(iIntegrante.roles.length) {
            await Promise.all(iIntegrante.roles.map( rol => rol.save({transaction}) ));
        }

        if(iIntegrante.persona){
            await iIntegrante.persona.save({transaction});
        }
        await iIntegrante.save({transaction});
    }

    static  verDatos ( iIntegrante : Integrante){
    
        return iIntegrante.dataValues;
    }

    
    
}



