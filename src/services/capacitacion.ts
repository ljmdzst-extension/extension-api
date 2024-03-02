import { Transaction } from "sequelize";
import { IServiciosModelo } from "./IServiciosModelo";
import { PropuestaCapacitacion, PropuestaCapacitacionAttributes, PropuestaCapacitacionCreationAttributes } from "../models/PropuestaCapacitacion";
import { CapacitacionAttributes, CapacitacionCreationAttributes } from "../models/Capacitacion";

export type TPropuestaCapacitacionIn = PropuestaCapacitacionCreationAttributes 

export type TPropuestaCapacitacionOut = PropuestaCapacitacionAttributes 

export default class SCapacitacion implements IServiciosModelo {
   
    async definirPersistencia(iPropuestaCapacitacion : PropuestaCapacitacion, transaction?: Transaction | undefined): Promise<void> {
   
        await PropuestaCapacitacion.findOne({where:{
            idCapacitacion : iPropuestaCapacitacion.idCapacitacion,
            codigoPropuesta : iPropuestaCapacitacion.codigoPropuesta
        },transaction, paranoid : false}).then( resp => {
            iPropuestaCapacitacion.isNewRecord = resp === null ;
           
        });
        
    }
    
    async leerDatosDeBD(iPropuestaCapacitacion : PropuestaCapacitacion, transaction?: Transaction | undefined): Promise<void> {
       
    }

    async guardarDatosEnBD(iPropuestaCapacitacion : PropuestaCapacitacion, transaction?: Transaction | undefined): Promise<void> {
        if(!iPropuestaCapacitacion.isNewRecord) {
            await iPropuestaCapacitacion.restore({transaction});
        }
        await iPropuestaCapacitacion.save({transaction});
       
    }
 
    verDatos(iPropuestaCapacitacion : PropuestaCapacitacion) {
        return {
            ...iPropuestaCapacitacion.dataValues
        }
    }
    editarDatos(
        iPropuestaCapacitacion : PropuestaCapacitacion, 
        data: PropuestaCapacitacionCreationAttributes 
    ): void {
        iPropuestaCapacitacion.set( data );
    }

}