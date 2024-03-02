import { Model, Op, Transaction } from "sequelize"
import { Integrante, IntegranteAttributes, IntegranteCreationAttributes } from "../models/Integrante"
import { Propuesta } from "../models/Propuesta";
import { IServiciosModelo } from "./IServiciosModelo";
import { RolIntegrante, RolIntegranteAttributes, RolIntegranteCreationAttributes } from "../models/RolIntegrante";
import { Persona, PersonaAttributes, PersonaCreationAttributes } from "../models/Persona";


export type TIntegranteIn = IntegranteCreationAttributes & { 
    persona : PersonaCreationAttributes , 
    roles : RolIntegranteCreationAttributes[]
}

export type TIntegranteOut = IntegranteAttributes & { 
    persona : PersonaAttributes , 
    roles : RolIntegranteAttributes[]
}

export interface IServiciosIntegrantes extends IServiciosModelo {
    crearIntegrante( 
        data : IntegranteCreationAttributes & { 
            persona : PersonaCreationAttributes , 
            roles : RolIntegranteCreationAttributes[]
        } ) : Integrante
    leerDatosRoles(iIntegrante: Integrante, transaction ?: Transaction) : Promise<void>
    guardarDatosRolesEnBD (iIntegrante : Integrante, transaction ?: Transaction ): Promise<void>;
    guardarDatosPersonalesEnBD(iIntegrante : Integrante, transaction ?: Transaction ): Promise<void>;
    definirPersistenciaPersona( iIntegrante: Integrante ,transaction?: Transaction | undefined ) : Promise<void>;
}

export default class ServiciosIntegrantes implements IServiciosIntegrantes {
   
    async definirPersistencia(iIntegrante: Integrante ,transaction?: Transaction | undefined): Promise<void> {
        if(process.env.NODE_ENV === 'development') console.log(this.definirPersistencia.name)
        await Integrante.findOne( {
            where : {
                nroDoc : iIntegrante.nroDoc , 
                codigoPropuesta : iIntegrante.codigoPropuesta
            }, 
            paranoid : false,
            transaction
        } )
            .then( resp => iIntegrante.isNewRecord = resp === null)
    }

    async definirPersistenciaPersona( iIntegrante: Integrante ,transaction?: Transaction | undefined ){
        if(process.env.NODE_ENV === 'development') console.log(this.definirPersistenciaPersona.name)
        await Persona.findByPk( iIntegrante.persona.nroDoc, {transaction} ).then( resp => iIntegrante.persona.isNewRecord = resp === null)
    }

    editarDatos(iIntegrante: Integrante , data :  TIntegranteIn) {
        iIntegrante.set(data);


        if(iIntegrante.persona){
            iIntegrante.persona.set(data.persona);
        } else {
            iIntegrante.persona = Persona.build(data.persona);
        }

        if(data.roles.length) {
            iIntegrante.roles = RolIntegrante.bulkBuild(data.roles);
        } else {
            iIntegrante.roles = [];
        }
    }

    async leerDatosDeBD(iIntegrante : Integrante, transaction ?: Transaction ) {
       
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

    async guardarDatosEnBD(iIntegrante : Integrante, transaction ?: Transaction ) {
        
        if(!iIntegrante.isNewRecord){
            await iIntegrante.restore({transaction});
        }
        await iIntegrante.save({transaction});
    }

    async guardarDatosRolesEnBD (iIntegrante : Integrante, transaction ?: Transaction ){
        console.log('guardarDatosRoles()')
        await RolIntegrante.destroy( { 
            where : { 
                codigoPropuesta : iIntegrante.codigoPropuesta,
                nroDoc : iIntegrante.nroDoc,
                idRolIntegrante : {[Op.not] : iIntegrante.roles.map(rol => rol.idRolIntegrante)}
            } , 
            transaction} );

        if(iIntegrante.roles && iIntegrante.roles.length) {
            await RolIntegrante.bulkCreate(iIntegrante.roles.map(rol => rol.dataValues),{ignoreDuplicates : true,transaction});
            
        }
    }

    async guardarDatosPersonalesEnBD(iIntegrante : Integrante, transaction ?: Transaction ){
  
        await iIntegrante.persona.save({transaction});
    }

    verDatos ( iIntegrante : Integrante) : TIntegranteOut{
        return {
            ...iIntegrante.dataValues,
            persona : iIntegrante.persona?.dataValues,
            roles : iIntegrante.roles?.map(rol => rol.dataValues) || []
        };
    }


    crearIntegrante( 
        data : TIntegranteIn ) {



            const nuevoIntegrante = Integrante.build({ ...data  });

            console.log(nuevoIntegrante.codigoPropuesta)

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



