import { Model, Transaction } from "sequelize"
import { Integrante, IntegranteCreationAttributes } from "../models/Integrante"
import { Propuesta } from "../models/Propuesta";
import { IServiciosModelo } from "./IServiciosModelo";
import { RolIntegrante, RolIntegranteCreationAttributes } from "../models/RolIntegrante";
import { Persona, PersonaCreationAttributes } from "../models/Persona";

export interface IServiciosIntegrantes extends IServiciosModelo {
    crearIntegrante( 
        data : IntegranteCreationAttributes & { 
            persona : PersonaCreationAttributes , 
            roles : RolIntegranteCreationAttributes[]
        } ) : Integrante
    leerDatosRoles(iIntegrante: Integrante, transaction ?: Transaction) : Promise<void>
    guardarDatosRoles (iIntegrante : Integrante, transaction ?: Transaction ): Promise<void>
    guardarDatosPersonales(iIntegrante : Integrante, transaction ?: Transaction ): Promise<void>
}
export default class ServiciosIntegrantes implements IServiciosIntegrantes {


    editarDatos(iIntegrante: Integrante , data :  IntegranteCreationAttributes & { 
        persona : PersonaCreationAttributes , 
        roles : RolIntegranteCreationAttributes[]
    }) {
        iIntegrante.set(data);


        if(iIntegrante.persona){
            iIntegrante.persona.set(data.persona);
        } else {
            iIntegrante.persona = Persona.build(data.persona);
        }

        if(data.roles.length) {
            console.log(data.roles)
            iIntegrante.roles = RolIntegrante.bulkBuild(data.roles);
        } else {
            iIntegrante.roles = [];
        }
    }

    async leerDatos(iIntegrante : Integrante, transaction ?: Transaction ) {
       
        await iIntegrante.getPersona({transaction}).then( resp =>iIntegrante.persona = resp)
        
    }
    async leerDatosRoles(iIntegrante: Integrante, transaction ?: Transaction){
        iIntegrante.roles = [];
        await iIntegrante.getRoles({
            transaction,
            where : {codigoPropuesta : iIntegrante.codigoPropuesta}
        })
        .then( resp => iIntegrante.roles.push(...resp))

    }
    async guardarDatos(iIntegrante : Integrante, transaction ?: Transaction ) {
        iIntegrante.isNewRecord = await Integrante.findByPk(iIntegrante.nroDoc,{attributes : ['nroDoc'], transaction}) === null;

        await iIntegrante.save({transaction});
     
    }
    async guardarDatosRoles (iIntegrante : Integrante, transaction ?: Transaction ){
        console.log('guardarDatosRoles()')
        if(iIntegrante.roles && iIntegrante.roles.length) {
            await RolIntegrante.bulkCreate(iIntegrante.roles,{ignoreDuplicates : true,transaction});
            
        }
    }
    async guardarDatosPersonales(iIntegrante : Integrante, transaction ?: Transaction ){
        
        if(iIntegrante.persona){
            iIntegrante.persona.isNewRecord = Persona.findByPk(iIntegrante.persona.nroDoc,{transaction, attributes : ['nroDoc']}) === null; 
            
            await iIntegrante.persona.save({transaction});
            
            await iIntegrante.setPersona( iIntegrante.persona,{transaction} );
        }
    }
    verDatos ( iIntegrante : Integrante){
        return {
            ...iIntegrante.dataValues,
            persona : iIntegrante.persona?.dataValues,
            roles : iIntegrante.roles?.map(rol => rol.dataValues) || []
        };
    }


    crearIntegrante( 
        data : IntegranteCreationAttributes & { 
            persona : PersonaCreationAttributes , 
            roles : RolIntegranteCreationAttributes[]
        } ) {


            const nuevoIntegrante = Integrante.build(data);

            nuevoIntegrante.persona = Persona.build(data.persona);
            
            
            nuevoIntegrante.roles = [];

            if(data.roles.length) {
                const roles = RolIntegrante.bulkBuild(data.roles);
                roles.map( rol => rol.validate())
                nuevoIntegrante.roles.push( ...roles);
            }
          
      
            return nuevoIntegrante;
        }
}



