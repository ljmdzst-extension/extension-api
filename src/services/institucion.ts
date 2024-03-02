import { Model, Transaction } from "sequelize";
import { Institucion, InstitucionAttributes, InstitucionCreationAttributes } from "../models/Institucion";
import { Propuesta } from "../models/Propuesta";
import { PropuestaInstitucion, PropuestaInstitucionAttributes, PropuestaInstitucionCreationAttributes } from "../models/PropuestaInstitucion";
import { IServiciosModelo } from "./IServiciosModelo";
import { Responsable, ResponsableAttributes, ResponsableCreationAttributes } from "../models/Responsable";
import { Persona, PersonaAttributes, PersonaCreationAttributes } from "../models/init-models";

export type TInstitucionIn =  PropuestaInstitucionCreationAttributes & {
    institucion : InstitucionCreationAttributes & {
        responsable : ResponsableCreationAttributes & {
            persona : PersonaCreationAttributes
        }
    }
}

export type TInstitucionOut =  PropuestaInstitucionAttributes & {
    institucion : InstitucionAttributes & {
        responsable : ResponsableAttributes & {
            persona : PersonaAttributes
        }
    }
}
export interface IServiciosInstitucion extends IServiciosModelo {
    crearInstitucion( data : TInstitucionIn) : PropuestaInstitucion;
    leerDatosResponsable(iInstitucion : Institucion  , transaction ?: Transaction) : Promise<void>;
    leerDatosPersonalesResponsable(iInstitucion : Institucion, transaction ?: Transaction) : Promise<void>;
    guardarDatosResponsable(iInstitucion : Institucion  , transaction ?: Transaction) : Promise<void>;
    guardarDatosPersonalesResponsable(iInstitucion : Institucion, transaction?: Transaction | undefined): Promise<void>;
    definirPersistenciaResponsable(iPropInst : PropuestaInstitucion, transaction?: Transaction | undefined) : Promise<void> ;
    definirPersistenciaPersonaResp(iPropInst : PropuestaInstitucion, transaction?: Transaction | undefined) : Promise<void>;
}
export default class ServiciosInstitucion implements IServiciosInstitucion {
    private iServiciosResponsable !: ServiciosResponsable;

    constructor(){
        this.iServiciosResponsable = new ServiciosResponsable();
    }
    async definirPersistencia(iPropInst : PropuestaInstitucion, transaction?: Transaction | undefined): Promise<void> {
        if(process.env.NODE_ENV === 'development') console.log(this.definirPersistencia.name)
         await Institucion.findByPk(iPropInst.institucion.idInstitucion,{transaction}).then( resp => iPropInst.institucion.isNewRecord = resp === null)
    }
    async definirPersistenciaResponsable(iPropInst : PropuestaInstitucion, transaction?: Transaction | undefined) : Promise<void> {
        if(process.env.NODE_ENV === 'development') console.log(this.definirPersistenciaResponsable.name)
         await this.iServiciosResponsable.definirPersistencia(iPropInst.institucion.responsables[0],transaction);

    }
    async definirPersistenciaPersonaResp(iPropInst : PropuestaInstitucion, transaction?: Transaction | undefined) : Promise<void>{
        if(process.env.NODE_ENV === 'development') console.log(this.definirPersistenciaPersonaResp.name)
        const responsable = iPropInst.institucion.responsables[0];
        await this.iServiciosResponsable.definirPersistenciaPersona(responsable,transaction);
    }
    editarDatos(
        iPropInst : PropuestaInstitucion, 
        data :PropuestaInstitucionCreationAttributes & {
        institucion : InstitucionCreationAttributes & {
            responsable : ResponsableCreationAttributes & {
                persona : PersonaCreationAttributes
            }
        }
    } ) {
        iPropInst.set(data);
        iPropInst.institucion.set(data.institucion);

        if(data.institucion.responsable) {
            const ultimoResponsable = iPropInst.institucion.responsables[iPropInst.institucion.responsables.length -1];
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

    async guardarDatosEnBD( propInst : PropuestaInstitucion ,transaction : Transaction ) {
        
        await propInst.institucion.save({transaction}).then( resp => {
            propInst.idInstitucion = resp.idInstitucion;
            if(propInst.institucion.responsables.length) {
                propInst.institucion.responsables[0].idInstitucion = resp.idInstitucion;
                
            }
        } );
    }
    async guardarDatosResponsable(iInstitucion : Institucion  , transaction ?: Transaction){
        if(iInstitucion.responsables && iInstitucion.responsables.length){
            await this.iServiciosResponsable.guardarDatosEnBD(iInstitucion.responsables[iInstitucion.responsables.length -1],transaction);
        }
       
    }
    async guardarDatosPersonalesResponsable(iInstitucion : Institucion, transaction?: Transaction | undefined): Promise<void> {
        if(iInstitucion.responsables &&  iInstitucion.responsables.length){
            await this.iServiciosResponsable.guardarDatosPersonales(iInstitucion.responsables[iInstitucion.responsables.length -1],transaction);
        }
    }
   
    async leerDatosDeBD ( iPropuestaInstitucion : PropuestaInstitucion , transaction ?: Transaction ) {
        await iPropuestaInstitucion.getInstitucion({transaction}).then(resp => iPropuestaInstitucion.institucion = resp );
    } 
    async leerDatosResponsable(iInstitucion : Institucion  , transaction ?: Transaction){
        iInstitucion.responsables = [];
        await this.iServiciosResponsable.leerDatosDeBD(iInstitucion,transaction);
    }
    async leerDatosPersonalesResponsable(iInstitucion : Institucion, transaction?: Transaction | undefined): Promise<void> {
        if(iInstitucion.responsables && iInstitucion.responsables.length){
            await this.iServiciosResponsable.leerDatosPersonales(iInstitucion.responsables[iInstitucion.responsables.length -1],transaction);
        }
    }
    verDatos(iPropuestaInstitucion: PropuestaInstitucion )  : TInstitucionOut {
        let salida : TInstitucionOut =  {
            ...iPropuestaInstitucion.dataValues,
            institucion : {
                ...iPropuestaInstitucion.institucion.dataValues,
               responsable : {
                nroDoc : '',
                idInstitucion : 0,
                desde : '',
                persona : {
                    nroDoc : '',
                    tipoDoc : 1,
                    ape : '',
                    nom : ''
                }
               }
            }
           
        } ;
        const responsables = iPropuestaInstitucion.institucion.responsables;
        if(responsables && responsables.length){
            const vigente = responsables[responsables.length -1];
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
    definirPersistencia(iResponsable :Responsable, transaction?: Transaction | undefined): Promise<void>;
    definirPersistenciaPersona(iResponsable :Responsable, transaction?: Transaction | undefined) : Promise<void>;
}

export  class ServiciosResponsable implements IServiciosResponsable {
   
    async definirPersistencia(iResponsable :Responsable, transaction?: Transaction | undefined): Promise<void> {
        const {desde,hasta,...claves} = iResponsable.dataValues;
        await Responsable.findOne({where : {...claves},transaction}).then( resp => iResponsable.isNewRecord = resp === null)
    }
    async definirPersistenciaPersona(iResponsable :Responsable, transaction?: Transaction | undefined) : Promise<void>{
        await Persona.findByPk(iResponsable.persona.nroDoc,{transaction}).then( resp => iResponsable.persona.isNewRecord = resp === null)
    }
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

    async guardarDatosEnBD( iResponsable : Responsable ,transaction ?: Transaction ) {
        iResponsable.isNewRecord = await Responsable.findOne({where : {idInstitucion : iResponsable.idInstitucion, nroDoc : iResponsable.nroDoc },transaction}) === null;
        await iResponsable.save({transaction});
    }
    async guardarDatosPersonales( iResponsable : Responsable ,transaction ?: Transaction ) {
        
        iResponsable.persona.isNewRecord = await Persona.findByPk(iResponsable.persona.nroDoc, { attributes : ['nroDoc'],transaction}) === null;

        await iResponsable.persona.save({transaction});

             
    }
    async leerDatosDeBD ( iInstitucion : Institucion , transaction ?: Transaction ) {
        await iInstitucion.getResponsables({transaction}).then(resp => iInstitucion.responsables = resp );
    }

    async leerDatosPersonales( iResponsable : Responsable , transaction ?: Transaction) : Promise<Persona> {
        return iResponsable.getPersona({transaction}).then( resp => iResponsable.persona = resp);
    }

    verDatos(iModelo: Institucion ) : InstitucionAttributes {
        return iModelo.dataValues ;
    }

  
}   