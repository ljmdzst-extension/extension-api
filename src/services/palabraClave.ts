import { Model, Transaction } from "sequelize";
import { IServiciosModelo } from "./IServiciosModelo";
import { PropuestaPalabraClave, PropuestaPalabraClaveAttributes, PropuestaPalabraClaveCreationAttributes } from "../models/PropuestaPalabraClave";
import { PalabraClave, PalabraClaveAttributes, PalabraClaveCreationAttributes } from "../models/PalabraClave";

export interface ISPalabraClave extends IServiciosModelo{
    definirPersistenciaPalabra(iPropuestaPalabraClave : PropuestaPalabraClave, transaction?: Transaction | undefined): Promise<void>;
    guardarDatosPalabraEnBD(iPropuestaPalabraClave : PropuestaPalabraClave, transaction?: Transaction | undefined): Promise<void>;
    crearPalabraClave ( propPalabra : TPalabraClaveIn ) : PropuestaPalabraClave;
}

export type TPalabraClaveIn = PropuestaPalabraClaveCreationAttributes & {
    palabraClave : PalabraClaveCreationAttributes
}

export type TPalabraClaveOut = PropuestaPalabraClaveAttributes & {
    palabraClave : PalabraClaveAttributes
}


export default class SPalabraClave implements ISPalabraClave {
    crearPalabraClave( propPalabra : TPalabraClaveIn): PropuestaPalabraClave {
        const iPropPalabra = PropuestaPalabraClave.build(propPalabra);
        iPropPalabra.palabraClave = PalabraClave.build(propPalabra.palabraClave);
        return iPropPalabra;
    }
    async definirPersistenciaPalabra(iPropuestaPalabraClave : PropuestaPalabraClave, transaction?: Transaction | undefined): Promise<void> {
        const iPalabra = iPropuestaPalabraClave.palabraClave; 
        await PalabraClave.findByPk(iPalabra.idPalabraClave,{transaction}).then( resp => {
            iPalabra.isNewRecord = resp === null ;
           
        });
        
    }
    async definirPersistencia(iPropuestaPalabraClave : PropuestaPalabraClave, transaction?: Transaction | undefined): Promise<void> {
   
        await PropuestaPalabraClave.findOne({where:{
            idPalabraClave : iPropuestaPalabraClave.idPalabraClave,
            codigoPropuesta : iPropuestaPalabraClave.codigoPropuesta
        },transaction, paranoid : false}).then( resp => {
            iPropuestaPalabraClave.isNewRecord = resp === null ;
           
        });
        
    }
    
   
    async leerDatosDeBD(iPropuestaPalabraClave : PropuestaPalabraClave, transaction?: Transaction | undefined): Promise<void> {
        await iPropuestaPalabraClave.getPalabraClave({transaction}).then( resp => iPropuestaPalabraClave.palabraClave = resp);
    }
    async guardarDatosEnBD(iPropuestaPalabraClave : PropuestaPalabraClave, transaction?: Transaction | undefined): Promise<void> {
        if(!iPropuestaPalabraClave.isNewRecord) {
            await iPropuestaPalabraClave.restore({transaction});
        }
        await iPropuestaPalabraClave.save({transaction});
       
    }
    async guardarDatosPalabraEnBD(iPropuestaPalabraClave : PropuestaPalabraClave, transaction?: Transaction | undefined){
        await iPropuestaPalabraClave.palabraClave.save({transaction}).then( resp => {
            iPropuestaPalabraClave.idPalabraClave = resp.idPalabraClave;
        });
    }
    verDatos(iPropuestaPalabraClave : PropuestaPalabraClave) {
        return {
            ...iPropuestaPalabraClave.dataValues,
            palabraClave : iPropuestaPalabraClave.palabraClave.dataValues
        }
    }
    editarDatos(
        iPropuestaPalabraClave : PropuestaPalabraClave, 
        data: PropuestaPalabraClaveCreationAttributes & { 
            palabra : PalabraClaveCreationAttributes
        }
    ): void {
        iPropuestaPalabraClave.set( data );
        iPropuestaPalabraClave.palabraClave.set(data.palabra);
    }

}