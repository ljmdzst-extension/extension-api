import { Model, Transaction } from "sequelize";
import { IServiciosModelo } from "./IServiciosModelo";
import { PropuestaLineaTematica, PropuestaLineaTematicaCreationAttributes } from "../models/PropuestaLineaTematica";
import { LineaTematica, LineaTematicaCreationAttributes } from "../models/LineaTematica";


export default class SLineaTematica implements IServiciosModelo {
   
    async definirPersistencia(iPropuestaLineaTematica : PropuestaLineaTematica, transaction?: Transaction | undefined): Promise<void> {
   
        await PropuestaLineaTematica.findOne({where:{
            idLineaTematica : iPropuestaLineaTematica.idLineaTematica,
            codigoPropuesta : iPropuestaLineaTematica.codigoPropuesta
        },transaction, paranoid : false}).then( resp => {
            iPropuestaLineaTematica.isNewRecord = resp === null ;
           
        });
        
    }
    
    async leerDatosDeBD(iPropuestaLineaTematica : PropuestaLineaTematica, transaction?: Transaction | undefined): Promise<void> {
       
    }

    async guardarDatosEnBD(iPropuestaLineaTematica : PropuestaLineaTematica, transaction?: Transaction | undefined): Promise<void> {
        if(!iPropuestaLineaTematica.isNewRecord) {
            await iPropuestaLineaTematica.restore({transaction});
        }
        await iPropuestaLineaTematica.save({transaction});
       
    }
 
    verDatos(iPropuestaLineaTematica : PropuestaLineaTematica) {
        return {
            ...iPropuestaLineaTematica.dataValues
        }
    }
    editarDatos(
        iPropuestaLineaTematica : PropuestaLineaTematica, 
        data: PropuestaLineaTematicaCreationAttributes & { 
            palabra : LineaTematicaCreationAttributes
        }
    ): void {
        iPropuestaLineaTematica.set( data );
    }

}