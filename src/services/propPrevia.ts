import { Transaction } from "sequelize";
import { IServiciosModelo } from "./IServiciosModelo";
import { PropuestaPrevia, PropuestaPreviaAttributes, PropuestaPreviaCreationAttributes } from "../models/PropuestaPrevia";


export type TPropuestaPreviaIn = PropuestaPreviaCreationAttributes 

export type TPropuestaPreviaOut = PropuestaPreviaAttributes 


export default class SPropuestaPrevia implements IServiciosModelo {
   
    async definirPersistencia(iPropuestaPrevia : PropuestaPrevia, transaction?: Transaction | undefined): Promise<void> {
   
        await PropuestaPrevia.findOne({where:{
            codigoPropuestaPrevia : iPropuestaPrevia.codigoPropuestaPrevia,
            codigoPropuesta : iPropuestaPrevia.codigoPropuesta
        },transaction, paranoid : false}).then( resp => {
            iPropuestaPrevia.isNewRecord = resp === null ;
           
        });
        
    }
    
    async leerDatosDeBD(iPropuestaPrevia : PropuestaPrevia, transaction?: Transaction | undefined): Promise<void> {
       
    }

    async guardarDatosEnBD(iPropuestaPrevia : PropuestaPrevia, transaction?: Transaction | undefined): Promise<void> {
        if(!iPropuestaPrevia.isNewRecord) {
            await iPropuestaPrevia.restore({transaction});
        }
        await iPropuestaPrevia.save({transaction});
       
    }
 
    verDatos(iPropuestaPrevia : PropuestaPrevia) {
        return {
            ...iPropuestaPrevia.dataValues
        }
    }
    editarDatos(
        iPropuestaPrevia : PropuestaPrevia, 
        data: PropuestaPreviaCreationAttributes 
    ): void {
        iPropuestaPrevia.set( data );
    }

}