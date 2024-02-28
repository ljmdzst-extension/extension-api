import { Transaction } from "sequelize";
import { IServiciosModelo } from "./IServiciosModelo";
import { PropuestaRelacionada, PropuestaRelacionadaCreationAttributes } from "../models/PropuestaRelacionada";




export default class SPropuestaRelacionada implements IServiciosModelo {
   
    async definirPersistencia(iPropuestaRelacionada : PropuestaRelacionada, transaction?: Transaction | undefined): Promise<void> {
   
        await PropuestaRelacionada.findOne({where:{
            codigoPropuestaRelacionada : iPropuestaRelacionada.codigoPropuestaRelacionada,
            codigoPropuesta : iPropuestaRelacionada.codigoPropuesta
        },transaction, paranoid : false}).then( resp => {
            iPropuestaRelacionada.isNewRecord = resp === null ;
           
        });
        
    }
    
    async leerDatosDeBD(iPropuestaRelacionada : PropuestaRelacionada, transaction?: Transaction | undefined): Promise<void> {
       
    }

    async guardarDatosEnBD(iPropuestaRelacionada : PropuestaRelacionada, transaction?: Transaction | undefined): Promise<void> {
        if(!iPropuestaRelacionada.isNewRecord) {
            await iPropuestaRelacionada.restore({transaction});
        }
        await iPropuestaRelacionada.save({transaction});
       
    }
 
    verDatos(iPropuestaRelacionada : PropuestaRelacionada) {
        return {
            ...iPropuestaRelacionada.dataValues
        }
    }
    editarDatos(
        iPropuestaRelacionada : PropuestaRelacionada, 
        data: PropuestaRelacionadaCreationAttributes 
    ): void {
        iPropuestaRelacionada.set( data );
    }

}