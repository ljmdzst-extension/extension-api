import { request, response } from "express";
import sequelizeExtension from "../config/dbConfig";



export const editarPlanificacion = async( req : typeof request, res : typeof response )=>{

    const transaction = await sequelizeExtension.transaction({logging : sql =>  console.log(sql) });

    try {

      
    } catch (error : any) {
        await transaction.rollback();
       console.log('error',error.status,' - ',error.message);
        res.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.message
        })
    }

}