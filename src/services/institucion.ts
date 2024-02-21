import { Model, Transaction } from "sequelize";
import { Institucion, InstitucionAttributes, InstitucionCreationAttributes } from "../models/Institucion";
import { Propuesta } from "../models/Propuesta";
import { PropuestaInstitucion, PropuestaInstitucionCreationAttributes } from "../models/PropuestaInstitucion";
import { IServiciosModelo } from "./IServiciosModelo";
import { Responsable, ResponsableCreationAttributes } from "../models/Responsable";
import { Persona, PersonaCreationAttributes } from "../models/init-models";

export interface IServiciosInstitucion extends IServiciosModelo {
    crearInstitucion( data :  PropuestaInstitucionCreationAttributes & {
        institucion : InstitucionCreationAttributes & {
            responsable : ResponsableCreationAttributes & {
                persona : PersonaCreationAttributes
            }
        }
    }) : PropuestaInstitucion;
    leerDatosResponsable(iInstitucion : Institucion  , transaction ?: Transaction) : Promise<void>;
    leerDatosPersonalesResponsable(iInstitucion : Institucion, transaction ?: Transaction) : Promise<void>;
    guardarDatosResponsable(iInstitucion : Institucion  , transaction ?: Transaction) : Promise<void>;
    guardarDatosPersonalesResponsable(iInstitucion : Institucion, transaction?: Transaction | undefined): Promise<void>
}
export default class ServiciosInstitucion implements IServiciosInstitucion {
    private iServiciosResponsable !: ServiciosResponsable;

    constructor(){
        this.iServiciosResponsable = new ServiciosResponsable();
    }

    crearInstitucion( data : PropuestaInstitucionCreationAttributes & {
        institucion : InstitucionCreationAttributes & {
            responsable : ResponsableCreationAttributes & {
                persona : PersonaCreationAttributes
            }
        }
    }){
        
            const nuevaInstitucion = Institucion.build(data.institucion);
            
            nuevaInstitucion.responsables = [];
            if(data.institucion.responsable){
                const responsable = this.iServiciosResponsable.crearResponsable(data.institucion.responsable);
                nuevaInstitucion.responsables.push(responsable);
                
            }
            const iPropInst = PropuestaInstitucion.build(data);
            iPropInst.institucion = nuevaInstitucion;
            return iPropInst;
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

        await this.guardarDatosPersonalesResponsable(iInstitucion,transaction);
        await this.guardarDatosResponsable(iInstitucion,transaction);
        
      
    }
    async guardarDatosResponsable(iInstitucion : Institucion  , transaction ?: Transaction){
        if(iInstitucion.responsables && iInstitucion.responsables.length){
            await this.iServiciosResponsable.guardarDatos(iInstitucion.responsables[iInstitucion.responsables.length -1],transaction);
        }
       
    }
    async guardarDatosPersonalesResponsable(iInstitucion : Institucion, transaction?: Transaction | undefined): Promise<void> {
        if(iInstitucion.responsables &&  iInstitucion.responsables.length){
            await this.iServiciosResponsable.guardarDatosPersonales(iInstitucion.responsables[iInstitucion.responsables.length -1],transaction);
        }
    }
   
    async leerDatos ( iPropuestaInstitucion : PropuestaInstitucion , transaction ?: Transaction ) {
        await iPropuestaInstitucion.getInstitucion({transaction}).then(resp => iPropuestaInstitucion.institucion = resp );
    } 
    async leerDatosResponsable(iInstitucion : Institucion  , transaction ?: Transaction){
        iInstitucion.responsables = [];
        await this.iServiciosResponsable.leerDatos(iInstitucion,transaction);
    }
    async leerDatosPersonalesResponsable(iInstitucion : Institucion, transaction?: Transaction | undefined): Promise<void> {
        if(iInstitucion.responsables && iInstitucion.responsables.length){
            await this.iServiciosResponsable.leerDatosPersonales(iInstitucion.responsables[iInstitucion.responsables.length -1],transaction);
        }
    }
    verDatos(iPropuestaInstitucion: PropuestaInstitucion )  {
        let salida : any =  {
            ...iPropuestaInstitucion.institucion.dataValues,
            antecedentes : iPropuestaInstitucion.antecedentes,
        } ;

        if(iPropuestaInstitucion.institucion.responsables.length){
            const vigente = iPropuestaInstitucion.institucion.responsables[iPropuestaInstitucion.institucion.responsables.length -1];
            salida = {
                ...salida,
                responsable : {
                    ...vigente.dataValues,
                    persona : vigente.persona.dataValues
                },
            }
        }

        return salida;
    }

  
}   

interface IServiciosResponsable extends IServiciosModelo {
    leerDatosPersonales(iResponsable : Responsable , transaction ?: Transaction) : Promise<Persona>;
}

export  class ServiciosResponsable implements IServiciosResponsable {
    

    crearResponsable( data :  ResponsableCreationAttributes & { persona : PersonaCreationAttributes}) {
          
        const personaResponsable = Persona.build(data.persona);
        const responsable = Responsable.build(data);
        
        responsable.persona = personaResponsable;
        return responsable;
    }

    static asociarPersona( iResponsable : Responsable, iPersona : Persona  ){  
        iResponsable.persona = iPersona;
    } 

    async guardarDatos( iResponsable : Responsable ,transaction ?: Transaction ) {
        
        await iResponsable.save({transaction});
    }
    async guardarDatosPersonales( iResponsable : Responsable ,transaction ?: Transaction ) {
        
        await Persona.findOrCreate({
            defaults : iResponsable.persona,
            where : {nroDoc : iResponsable.persona.nroDoc}, 
            transaction
        }).then( ([persona,creado]) => {
            iResponsable.persona = persona;
            iResponsable.set('nroDoc',iResponsable.persona.nroDoc); 
        } );
             
    }
    async leerDatos ( iInstitucion : Institucion , transaction ?: Transaction ) {
        await iInstitucion.getResponsables({transaction}).then(resp => iInstitucion.responsables = resp );
    }

    async leerDatosPersonales( iResponsable : Responsable , transaction ?: Transaction) : Promise<Persona> {
        return iResponsable.getPersona({transaction}).then( resp => iResponsable.persona = resp);
    }

    verDatos(iModelo: Institucion ) : InstitucionAttributes {
        return iModelo.dataValues ;
    }

  
}   