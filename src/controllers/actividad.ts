
import cli from 'cli-color'
import Actividad, { ACTIVIDAD_NULA, IResponseActividad } from "../classes/Actividad";
import { ESTADO_BD } from "../types/general";
import { request, response } from "express";
import { HttpHelpers } from '../helpers/general';

export const cargarActividad =  async ( req : typeof request , resp : typeof response) =>
    {
        
       try {
            let salida : IResponseActividad = ACTIVIDAD_NULA;
            
            const data = req.body;

            const iActividad = new Actividad(data); 

            console.log(iActividad.verDatos())
            
            await iActividad.guardarEnBD();
            
            salida = iActividad.verDatos();

            HttpHelpers.responderPeticionOk(resp, salida);

       } catch (error : any) {
            if(!error.status) console.log(cli.red(JSON.stringify(error,null,2)));
            
            HttpHelpers.responderPeticionError(resp, error.message,error.status );
       }

        
    }

export const verActividad = async ( req : typeof request , resp : typeof response)  =>
    {
        try {
            let salida : IResponseActividad = ACTIVIDAD_NULA;

            const {idActividad} = req.params;

            await Actividad.buscarPorIDBD(Number(idActividad)).then(
                iActividad => {
                    console.log("consulta terminada ..");
                    salida = iActividad.verDatos();

                    HttpHelpers.responderPeticionOk(resp, salida);
                }
            )

         } catch (error : any) {
            if( (!error.status) || error.status === 500  ) console.log(cli.red(JSON.stringify(error)));
            
            HttpHelpers.responderPeticionError(resp, error.message,error.status );
       }


    }

export const editarActividad = async ( req : typeof request , resp : typeof response)  =>

    {

        try {
            
        let salida : IResponseActividad = ACTIVIDAD_NULA;

        const data = req.body;

        const iActividad = await Actividad.buscarPorIDBD(data.idActividad) ;

        iActividad.editar(data);
        
        await iActividad.guardarEnBD();

        salida = iActividad.verDatos();

       
        HttpHelpers.responderPeticionOk(resp, salida);
         } catch (error : any) {
            if(!error.status) console.log(cli.red(error));
            
            HttpHelpers.responderPeticionError(resp, error.message,error.status );
       }
    }

export const darDeBajaActividad = async ( req : typeof request , resp : typeof response)=>
    {

        try {

            const {idActividad} = req.body;

            const iActividad = await Actividad.buscarPorIDBD( idActividad );

            iActividad.estadoEnBD = ESTADO_BD.B;

            await iActividad.guardarEnBD();

            HttpHelpers.responderPeticionOk(resp, '');
            
        } catch (error : any) {
            if(!error.status) console.log(cli.red(error));
            
            HttpHelpers.responderPeticionError(resp, error.message,error.status );
        }
    }

export const suspenderActividad =async ( req : typeof request , resp : typeof response) =>
    {
        try {
            let salida : IResponseActividad = ACTIVIDAD_NULA;
            
            const {idActividad,motivoCancel} = req.body;

            const iActividad = await Actividad.buscarPorIDBD(idActividad) ;


            if(motivoCancel) {
                iActividad.editar(iActividad.verDatos())
                iActividad.cancelar(motivoCancel);
            }
            
            await iActividad.guardarEnBD();

            salida = iActividad.verDatos();

            HttpHelpers.responderPeticionOk(resp, salida);
        
         } catch (error : any) {
            if(!error.status) console.log(cli.red(error));
            
            HttpHelpers.responderPeticionError(resp, error.message,error.status );
       }
    }
    
export const restaurarActividad = async ( req : typeof request , resp : typeof response) => {

        try {

            const {idActividad} = req.body;

            const iActividad = await Actividad.buscarPorIDBD(idActividad);
            iActividad.editar(iActividad.verDatos());
            iActividad.restaurar();

            await iActividad.guardarEnBD();

            HttpHelpers.responderPeticionOk(resp, '');

        } catch (error : any) {
            if(!error.status) console.log(cli.red(error));
            
            HttpHelpers.responderPeticionError(resp, error.message,error.status );
        }
    }