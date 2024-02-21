import { Model, Transaction } from "sequelize"
import { Integrante, IntegranteCreationAttributes } from "../models/Integrante"
import { Propuesta } from "../models/Propuesta";
import { IServiciosModelo } from "./IServiciosModelo";
import { RolIntegrante, RolIntegranteCreationAttributes } from "../models/RolIntegrante";
import { Persona, PersonaCreationAttributes } from "../models/Persona";


export default class ServiciosIntegrantes implements IServiciosModelo {

    async leerDatos(iIntegrante : Integrante, transaction ?: Transaction ) {
       
        await iIntegrante.getPersona({transaction}).then( resp =>iIntegrante.persona = resp)
        
    }
    async leerDatosRoles(iIntegrante: Integrante, transaction ?: Transaction){
        await iIntegrante.getRoles({
            transaction,
            where : {codigoPropuesta : iIntegrante.codigoPropuesta}
        })
        .then( resp => iIntegrante.roles = resp)

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
        return {
            ...iIntegrante.dataValues,
            persona : iIntegrante.persona?.dataValues,
            roles : iIntegrante.roles?.map(rol => rol.dataValues)
        };
    }

    asociarPersona( iIntegrante : Integrante , iPersona : Persona) {
        iIntegrante.persona = iPersona;
    }

    asociarRoles ( iIntegrante : Integrante , roles : RolIntegrante[] ) {
        iIntegrante.roles = [];
        
        if(roles.length ) {
            iIntegrante.roles.push(...roles);
       }
    }

    crearIntegrante( 
        data : IntegranteCreationAttributes & { 
            persona : PersonaCreationAttributes , 
            roles : RolIntegranteCreationAttributes[]
        } ) {


            const nuevoIntegrante = Integrante.build(data);

            const persona = Persona.build(data.persona);
            this.asociarPersona(nuevoIntegrante,persona);

            if(data.roles.length) {
                const roles = RolIntegrante.bulkBuild(data.roles);
                this.asociarRoles(nuevoIntegrante,roles);
            }
          
            console.log(nuevoIntegrante);
       
      
            return nuevoIntegrante;
        }
}



