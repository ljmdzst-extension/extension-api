
import { initModels } from "../models/init-models";
import { request, response } from "express";
import ServiciosPropuesta from '../services/propuesta';
import sequelizeExtension from "../config/dbConfig";
import { ValidationError } from "sequelize";

export const getPropuesta = async(req : typeof request , res : typeof response)=>{
    
    try {
        const {codigoPropuesta} = req.params;
        
        const {Propuesta} = initModels(sequelizeExtension);

        const iPropuesta = await Propuesta.findByPk(codigoPropuesta);
        
        if(!iPropuesta) throw { status : 400 , message : 'propuesta no encontrada'}
        
        const iServiciosPropuesta = new ServiciosPropuesta();
        
        await iServiciosPropuesta.leerDatosDeBD(iPropuesta);
    
   
        res.status(200).json({
            ok : true,
            data : iServiciosPropuesta.verDatos(iPropuesta),
            error : null
        })
        

    } catch (error : any) {
        console.log('error',error.status,' - ',error.message);
        res.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.message
        })
    }
}

export const postPropuesta = async(req : typeof request , res : typeof response)=>{
    const transaction = await sequelizeExtension.transaction();
    try {
      

    } catch (error : any) {
        await transaction.rollback();
        console.log('error',error.status,' - ',error.message);
        res.status(500).json({
            ok : false,
            data : null,
            error : 'Error de servidor'
        })
    }
}
export const putPropuesta = async(req : typeof request , res : typeof response)=>{
    try {


       const {codigoPropuesta} = req.params;


       const data  = req.body;

       const {Propuesta} = initModels(sequelizeExtension);

       const iPropuesta = await Propuesta.findByPk(codigoPropuesta);
       
       if(!iPropuesta) throw { status : 400 , message : 'propuesta no encontrada'}
       
       const iServiciosPropuesta = new ServiciosPropuesta();

       iServiciosPropuesta.editarDatos(iPropuesta,data);

       await iServiciosPropuesta.guardarDatosEnBD(iPropuesta);



       res.status(200).json({
        ok : true,
        data :iServiciosPropuesta.verDatos(iPropuesta),
        error : null
       })


    } catch (error : any) {
        console.log('error',error.status,' - ',error.message);
        if(error instanceof ValidationError){
            console.log(error)
            res.status(400).json({
                ok : false,
                data : null,
                error : error.errors.map( error => error.message)
            })
        } else {
            console.log(error)
            res.status(500).json({
                ok : false,
                data : null,
                error : 'Error de servidor'
            })
        }
       
    }
}
export const deletePropuesta = async(req : typeof request , res : typeof response)=>{
    try {
        /**... */
        

    } catch (error : any) {
        console.log('error',error.status,' - ',error.message);
        res.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.message
        })
    }
}

