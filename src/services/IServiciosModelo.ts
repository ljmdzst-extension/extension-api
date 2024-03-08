import { Model, Transaction } from "sequelize";


export interface IServiciosModelo {
    leerDatosDeBD( iModelo : Model, transaction ?: Transaction ) : Promise<void>;
    guardarDatosEnBD( iModelo : Model, transaction ?: Transaction ) : Promise<void>;
    definirPersistencia(iModelo : Model, transaction ?: Transaction) : Promise<void>;
    verDatos( iModelo : Model ) : any;
    editarDatos( iModelo : Model , data : any  ) : void;
}