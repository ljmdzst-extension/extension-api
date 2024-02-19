import { Model, Transaction } from "sequelize";
import { Institucion, InstitucionAttributes } from "../models/Institucion";
import { Propuesta } from "../models/Propuesta";
import { PropuestaInstitucion } from "../models/PropuestaInstitucion";
import { IServiciosModelo } from "./IServiciosModelo";
import { Responsable } from "../models/Responsable";
import { Persona } from "../models/init-models";

export interface IServiciosInstitucion extends IServiciosModelo {
    leerDatosResponsable(iInstitucion : Institucion  , transaction ?: Transaction) : Promise<void>;
    leerDatosPersonalesResponsable(iInstitucion : Institucion, transaction ?: Transaction) : Promise<void>;
}
export default class ServiciosInstitucion implements IServiciosInstitucion {
    private iServiciosResponsable !: ServiciosResponsable;

    constructor(){
        this.iServiciosResponsable = new ServiciosResponsable();
    }
   
    static asociarInstitucion( iPropuesta : Propuesta, iInstitucion : Institucion, dataAsoc : {antecedentes : string}  )  
    {
        const iPropuestaInstitucion = PropuestaInstitucion.build( {
            idInstitucion : iInstitucion.idInstitucion,
            codigoPropuesta : iPropuesta.codigoPropuesta,
            antecedentes : dataAsoc.antecedentes
        } );
        iPropuestaInstitucion.setInstitucion( iInstitucion );
        iPropuesta.addPropuestaInstitucioen(iPropuestaInstitucion);
    } 
    async guardarDatos( iInstitucion : Institucion ,transaction : Transaction ) {
        
        iInstitucion.set(await iInstitucion.save({transaction}));

        const ultimoResponsable = iInstitucion.responsables[iInstitucion.responsables.length -1];

        ultimoResponsable.persona.set(await ultimoResponsable.persona.save({transaction}));

        ultimoResponsable.set( await ultimoResponsable.save({transaction}));
       
      
    }
   
    async leerDatos ( iPropuestaInstitucion : PropuestaInstitucion , transaction ?: Transaction )  {
        await iPropuestaInstitucion.getInstitucion({transaction}).then(resp => iPropuestaInstitucion.institucion = resp);
    }
    async leerDatosResponsable(iInstitucion : Institucion  , transaction ?: Transaction){
        iInstitucion.responsables = [];
        await this.iServiciosResponsable.leerDatos(iInstitucion,transaction);
    }
    async leerDatosPersonalesResponsable(iInstitucion : Institucion, transaction?: Transaction | undefined): Promise<void> {
        if(iInstitucion.responsables.length){
            await this.iServiciosResponsable.leerDatosPersonales(iInstitucion.responsables[iInstitucion.responsables.length -1],transaction);
        }
    }
    verDatos(iPropuestaInstitucion: PropuestaInstitucion )  {
        const institucion = iPropuestaInstitucion.institucion;
        let salida : {} = {...institucion.dataValues, antecedentes : iPropuestaInstitucion.antecedentes}
        if(institucion.responsables.length){
            const ultimoResponsable = institucion.responsables[institucion.responsables.length -1 ];
            salida = {
                ...salida,
                responsable : ultimoResponsable.dataValues
            }
        } 
        return salida ;
    }

  
}   

interface IServiciosResponsable extends IServiciosModelo {
    leerDatosPersonales(iResponsable : Responsable , transaction ?: Transaction) : Promise<void>;
}

export  class ServiciosResponsable implements IServiciosResponsable {
    
    static asociarPersona( iResponsable : Responsable, iPersona : Persona  ){  
        iResponsable.persona = iPersona;
    } 

    async guardarDatos( iResponsable : Responsable ,transaction : Transaction ) {
        
        await iResponsable.persona.save({transaction}).then( resp => {
            iResponsable.persona = resp;
            iResponsable.set('nroDoc',iResponsable.persona.nroDoc); 
        } );

        

        await iResponsable.save({transaction});
       
      
    }
   
    async leerDatos ( iInstitucion : Institucion , transaction ?: Transaction )  {
        await iInstitucion.getResponsables({transaction}).then(resp => iInstitucion.responsables.push(...resp) );
    }

    async leerDatosPersonales( iResponsable : Responsable , transaction ?: Transaction){
        await iResponsable.getPersona({transaction}).then( resp => iResponsable.persona = resp);
    }

    verDatos(iModelo: Institucion ) : InstitucionAttributes {
        return iModelo.dataValues ;
    }

  
}   