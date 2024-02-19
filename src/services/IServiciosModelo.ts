import { Model, Transaction } from "sequelize";


export interface IServiciosModelo {
    leerDatos( iModelo : Model, transaction ?: Transaction ) : Promise<void>;
    guardarDatos( iModelo : Model, transaction ?: Transaction ) : Promise<void>;
    verDatos( iModelo : Model ) : any;
}