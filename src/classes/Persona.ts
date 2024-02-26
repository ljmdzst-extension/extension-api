import { Transaction } from "sequelize";
import { PersonaAttributes, PersonaCreationAttributes, Persona as MPersona } from "../models/Persona";
import { ESTADO_BD } from "../types/general";


export type TPersonaIn = PersonaCreationAttributes;
export type TPersonaOut = PersonaAttributes;


export default class Persona{
    
    public estadoEnBD : ESTADO_BD;  
    private dbPersona !: MPersona;
    constructor( 
        data : TPersonaIn
    ){
        this.estadoEnBD = ESTADO_BD.A;
        this.dbPersona = MPersona.build(data);
    }

    editarDatos( _data : TPersonaIn ){
        this.dbPersona.set( _data );
    }

    verDatos(  ) : TPersonaOut {
        return this.dbPersona.dataValues;
    }

    async determinarPersistencia (transaction: Transaction) : Promise<void>{
        
        if( await MPersona.findByPk(this.dbPersona.nroDoc,{transaction})){
            this.estadoEnBD = ESTADO_BD.M;
        } 
    }

    async guardarDatos( transaction : Transaction  ) : Promise<TPersonaOut>{

        if(this.estadoEnBD === ESTADO_BD.B) {
            await this.dbPersona.destroy({transaction});
        }
        else {
            this.dbPersona.isNewRecord = this.estadoEnBD === ESTADO_BD.A;

            await this.dbPersona.save({transaction});
        }
        
        return this.verDatos();
    }

}