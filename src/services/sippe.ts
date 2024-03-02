import { Model, Transaction } from "sequelize";
import { IServiciosModelo } from "./IServiciosModelo";
import { PropuestaProgramaExtension, PropuestaProgramaExtensionAttributes, PropuestaProgramaExtensionCreationAttributes } from "../models/PropuestaProgramaExtension";


export type TPropuestaProgramaExtensionIn = PropuestaProgramaExtensionCreationAttributes 

export type TPropuestaProgramaExtensionOut = PropuestaProgramaExtensionAttributes 



export default class SProgramaExtension implements IServiciosModelo {
   
    async definirPersistencia(iPropuestaProgramaExtension : PropuestaProgramaExtension, transaction?: Transaction | undefined): Promise<void> {
   
        await PropuestaProgramaExtension.findOne({where:{
            idProgramaExtension : iPropuestaProgramaExtension.idProgramaExtension,
            codigoPropuesta : iPropuestaProgramaExtension.codigoPropuesta
        },transaction, paranoid : false}).then( resp => {
            iPropuestaProgramaExtension.isNewRecord = resp === null ;
           
        });
        
    }
    
    async leerDatosDeBD(iPropuestaProgramaExtension : PropuestaProgramaExtension, transaction?: Transaction | undefined): Promise<void> {
       
    }

    async guardarDatosEnBD(iPropuestaProgramaExtension : PropuestaProgramaExtension, transaction?: Transaction | undefined): Promise<void> {
        if(!iPropuestaProgramaExtension.isNewRecord) {
            await iPropuestaProgramaExtension.restore({transaction});
        }
        await iPropuestaProgramaExtension.save({transaction});
       
    }
 
    verDatos(iPropuestaProgramaExtension : PropuestaProgramaExtension) {
        return {
            ...iPropuestaProgramaExtension.dataValues
        }
    }
    editarDatos(
        iPropuestaProgramaExtension : PropuestaProgramaExtension, 
        data: PropuestaProgramaExtensionCreationAttributes 
    ): void {
        iPropuestaProgramaExtension.set( data );
    }

}