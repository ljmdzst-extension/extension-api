import { Model, Transaction } from "sequelize";
import { IServiciosModelo } from "./IServiciosModelo";
import { PropuestaPalabraClave, PropuestaPalabraClaveCreationAttributes } from "../models/PropuestaPalabraClave";
import { PalabraClave, PalabraClaveCreationAttributes } from "../models/PalabraClave";

export default class SPalabraClave implements IServiciosModelo {
    async definirPersistencia(iPropuestaPalabraClave : PropuestaPalabraClave, transaction?: Transaction | undefined): Promise<void> {
        const iPalabra = iPropuestaPalabraClave.palabraClave; 
        await PalabraClave.findByPk(iPalabra.idPalabraClave,{paranoid : false, transaction}).then( resp => iPalabra.isNewRecord = resp === null );
    }

    async leerDatosDeBD(iPropuestaPalabraClave : PropuestaPalabraClave, transaction?: Transaction | undefined): Promise<void> {
        await iPropuestaPalabraClave.getPalabraClave({transaction}).then( resp => iPropuestaPalabraClave.palabraClave = resp);
    }
    async guardarDatosEnBD(iPropuestaPalabraClave : PropuestaPalabraClave, transaction?: Transaction | undefined): Promise<void> {
        await iPropuestaPalabraClave.palabraClave.save({transaction});
        await iPropuestaPalabraClave.setPalabraClave(iPropuestaPalabraClave.palabraClave,{transaction});
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