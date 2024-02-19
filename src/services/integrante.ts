import { Model, Transaction } from "sequelize"
import { Integrante } from "../models/Integrante"
import { Propuesta } from "../models/Propuesta";
import { IServiciosModelo } from "./IServiciosModelo";
import { RolIntegrante } from "../models/RolIntegrante";


export default class ServiciosIntegrantes implements IServiciosModelo {

    async leerDatos(iIntegrante : Integrante, transaction ?: Transaction ) {
        console.log('ServiciosIntegrante.leerDatos')
        await iIntegrante.getPersona({transaction}).then( resp =>iIntegrante.persona = resp)
        await iIntegrante.getRoles({transaction,where : {codigoPropuesta : iIntegrante.codigoPropuesta}}).then( resp => iIntegrante.roles = resp)

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
        const {
            codigoPropuesta,
            nroDoc,
            ...restData
        } = iIntegrante.dataValues
        let salida = {
            ...restData,
            lRoles : <any>[]
        }

        if(iIntegrante.persona) {
            const {
                ciudad,
                provincia,
                pais,
                tipoDoc,
                ...restData
            } = iIntegrante.persona.dataValues;
            salida = {
                ...salida,
                ...restData
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



