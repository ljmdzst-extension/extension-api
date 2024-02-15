import {  Transaction } from "sequelize";
import Actividad, { ACTIVIDAD_NULA, IResponseActividad } from "../classes/Actividad";
import { ESTADO_BD } from "../types/general";
import { DataDeleteActividad, DataGetActividad, DataPostActividad, DataPutActividad } from "../types/actividad";

 

class ControllerActividad {


    public static async cargarActividad ( data : DataPostActividad , transaction : Transaction ) 
    : Promise<IResponseActividad>
    {
        
        let salida : IResponseActividad = ACTIVIDAD_NULA;
        
        const iActividad = new Actividad(data); 

        await iActividad.guardarEnBD(transaction);
        
        salida = iActividad.verDatos();

        return salida;
    }

    public static async verActividad( data : DataGetActividad, transaction : Transaction ) 
    : Promise<IResponseActividad> 
    {
        let salida : IResponseActividad = ACTIVIDAD_NULA;

        const iActividad = await Actividad.buscarPorIDBD(data.idActividad,transaction);

        salida = iActividad.verDatos();

        return salida;
    }

    public static async editarActividad ( data : DataPutActividad, transaction : Transaction, transactionInsituciones ?: Transaction ) 
    : Promise<IResponseActividad> 
    {

        let salida : IResponseActividad = ACTIVIDAD_NULA;

        const iActividad = await Actividad.buscarPorIDBD(data.idActividad,transaction) ;

        iActividad.editar(data);
        
        await iActividad.guardarEnBD(transaction,transactionInsituciones);

        salida = iActividad.verDatos();

       
        
        return salida;
    }

    public static async darDeBajaActividad ( data : DataDeleteActividad, transaction : Transaction )
    : Promise<boolean> 
    {
        let salida : boolean = false;

        const iActividad = await Actividad.buscarPorIDBD( data.idActividad, transaction );

        iActividad.estadoEnBD = ESTADO_BD.B;

        await iActividad.guardarEnBD(transaction);

        return salida;
    }

    public static async suspenderActividad ( data : DataPutActividad, transaction  : Transaction,  transactionInsituciones ?: Transaction)
    : Promise<IResponseActividad> 
    {
        let salida : IResponseActividad = ACTIVIDAD_NULA;

        const iActividad = await Actividad.buscarPorIDBD(data.idActividad,transaction) ;


        if(data.motivoCancel) {
            iActividad.editar(iActividad.verDatos())
            iActividad.cancelar(data.motivoCancel);
        }
        
        await iActividad.guardarEnBD(transaction,transactionInsituciones);

        salida = iActividad.verDatos();
        
        return salida;
    }
    
}

export default ControllerActividad;