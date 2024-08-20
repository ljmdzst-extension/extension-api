import sequelizeExtension from "../../../Mysql-Sequelize/config/dbConfig";
import SBases from "../../../Mysql-Sequelize/services/bases";
import { request, response } from "express";
import { Relacion as ModelRelacion } from "../../../models/Relacion";


export const verBases = async(req : typeof request , res : typeof response)=>{
    const transaction = await sequelizeExtension.transaction();
    try {
        
        const otrasBases = await SBases.mostrarBases({},transaction);

        transaction.afterCommit(async()=>{
            res.status(200).json({
                ok : true,
                data : {
                    lAreas : await ModelRelacion.initModel(sequelizeExtension).findAll(),
                    ...otrasBases
                }
            })
        })

        await transaction.commit();
        

    } catch (error : any) {

        res.status(error.status || 500).json({
            ok : false,
            error : error.message || 'error de servidor'
        })   
    }
}

export const verInstituciones = async(req : typeof request , res : typeof response)=>{
    try {

        const {query,offset,limit} = req.params;

        const instituciones = await SBases.verInstituciones({ query , offset : Number(offset), limit : Number(limit)} )
        
        res.status(200).json({
            ok : true,
            data : instituciones,
            error : null
                
        })

    } catch (error : any) {
        res.status(error.status || 500).json({
            ok : false,
            error : error.message || 'error de servidor'
        })  
    }
}
