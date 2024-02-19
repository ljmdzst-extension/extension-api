import { Model, Transaction } from "sequelize";
import { Institucion, InstitucionAttributes } from "../models/Institucion";
import { Propuesta } from "../models/Propuesta";
import { PropuestaInstitucion } from "../models/PropuestaInstitucion";
import { IServiciosModelo } from "./IServiciosModelo";


export default class ServiciosInstitucion implements IServiciosModelo {
    
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
   
    async leerDatos ( iInstitucion : Institucion , transaction ?: Transaction )  {
        iInstitucion.responsables = await iInstitucion.getResponsables({transaction});
        
    }
    verDatos(iModelo: Institucion ) : InstitucionAttributes {
        return iModelo.dataValues ;
    }

 
  
}   


