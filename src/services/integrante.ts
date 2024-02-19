import { Model, Transaction } from "sequelize"
import { Integrante } from "../models/Integrante"
import { Propuesta } from "../models/Propuesta";
import { IServiciosModelo } from "./IServiciosModelo";
import { RolIntegrante } from "../models/RolIntegrante";


export default class ServiciosIntegrantes implements IServiciosModelo {

    async leerDatos(iIntegrante : Integrante, transaction ?: Transaction ) {
        
        iIntegrante.roles = [];
        await iIntegrante.getPersona({transaction}).then( resp => iIntegrante.setPersona(resp))
        await iIntegrante.getRoles({transaction}).then( resp => iIntegrante.setRoles(resp))

    }
   
    async guardarDatos(iIntegrante : Integrante, transaction ?: Transaction ) {
        if(iIntegrante.roles.length) {
            await Promise.all(iIntegrante.roles.map( rol => rol.save({transaction}) ));
        }

        if(iIntegrante.persona){
            await iIntegrante.persona.save({transaction});
        }
        await iIntegrante.save({transaction});
    }

    verDatos ( iIntegrante : Integrante){
        
        let salida = {
            ...iIntegrante.dataValues,
            lRoles : <any>[]
        }

        if(iIntegrante.persona) {
            salida = {
                ...salida,
                ...iIntegrante.persona.dataValues
            }
        }

        if(iIntegrante.roles && iIntegrante.roles.length) {
           salida.lRoles = iIntegrante.roles.map( rol => rol.idRolIntegrante)
        }

        return salida;
    }

    asociarRoles ( iIntegrante : Integrante , roles : RolIntegrante[] ) {
       if(roles.length ) {
            iIntegrante.setRoles( roles );
       }
    }

}



