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
    editarDatos(
        iInstitucion : PropuestaInstitucion, 
        data :PropuestaInstitucionCreationAttributes & {
        institucion : InstitucionCreationAttributes & {
            responsable : ResponsableCreationAttributes & {
                persona : PersonaCreationAttributes
            }
        }
    } ) {
        iInstitucion.set(data);
        iInstitucion.institucion.set(data.institucion);

        if(data.institucion.responsable) {
            const ultimoResponsable = iInstitucion.institucion.responsables[iInstitucion.institucion.responsables.length -1];
            if(ultimoResponsable){
                this.iServiciosResponsable.editarDatos(ultimoResponsable,data.institucion.responsable);

            }
        }


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

    async guardarDatos( propInst : PropuestaInstitucion ,transaction : Transaction ) {
        propInst.isNewRecord = await PropuestaInstitucion.findByPk(propInst.idInstitucion,{attributes : ['idInstitucion'],transaction}) === null;
        
        propInst.institucion.isNewRecord = await Institucion.findByPk(propInst.idInstitucion,{attributes : ['idInstitucion'],transaction}) === null;
        
        await propInst.institucion.save({transaction});
        await propInst.save({transaction});
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
            ...iPropuestaInstitucion.dataValues,
            institucion : iPropuestaInstitucion.institucion.dataValues
           
        } ;

        if(iPropuestaInstitucion.institucion.responsables.length){
            const vigente = iPropuestaInstitucion.institucion.responsables[iPropuestaInstitucion.institucion.responsables.length -1];
            salida = {
                ...salida,
               institucion : {
                ...salida.institucion,
                responsable : {
                    ...vigente.dataValues,
                    persona : vigente.persona.dataValues
                }
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
    editarDatos(iResponsable :Responsable, data : ResponsableCreationAttributes & { persona : PersonaCreationAttributes}) {
        iResponsable.set(data);
        iResponsable.persona.set(data.persona);
    }
    

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
        iResponsable.isNewRecord = await Responsable.findOne({where : {idInstitucion : iResponsable.idInstitucion, nroDoc : iResponsable.nroDoc },transaction}) === null;
        await iResponsable.save({transaction});
    }
    async guardarDatosPersonales( iResponsable : Responsable ,transaction ?: Transaction ) {
        
        iResponsable.persona.isNewRecord = await Persona.findByPk(iResponsable.persona.nroDoc, { attributes : ['nroDoc'],transaction}) === null;

        await iResponsable.persona.save({transaction});

             
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