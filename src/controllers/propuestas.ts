import { request, response } from "express";
import sequelizePropuestas from "../config/dbConfig";
import logger from "../config/logsConfig";
import { Persona, PropuestaAttributes, initModels } from "../models/init-models";


export const verPropuestas = async(req : typeof request , res : typeof response)=>{

    const transaction = await sequelizePropuestas.transaction({logging : console.log});
    try {
        /**... */
        let salida : PropuestaAttributes[] = [];

        const {Propuesta,Usuario} = initModels(sequelizePropuestas);

        const { idUsuario } = req.params;

        const iUsuario = await Usuario.findByPk(idUsuario);

        if(!iUsuario) throw { status : 500 , message : `No existe el usuario : ${idUsuario}`}
        
        const iPersona : Persona = await iUsuario.getPersona({attributes : ['ape','nom']});

        const lPropuestas = await Propuesta.findAll({
            attributes : ['codigoPropuesta','titulo','modalidad','duracion'],
            where : {idUsuario},
            transaction
        });
       

        if(lPropuestas.length) {

        salida = lPropuestas.map( propuesta => ({ 
            codigoPropuesta : propuesta.codigoPropuesta,  
            titulo : propuesta.titulo,
            modalidad : propuesta.modalidad,
            duracion : propuesta.duracion,
            responsable : `${iPersona.ape}, ${iPersona.nom}`,
            idUsuario : iUsuario.idUsuario
        }))

        }

        transaction.afterCommit(()=>{
            res.status(200).json({
                ok : true,
                data : salida,
                error : null
            })
        })

        await transaction.commit();


       

    } catch (error : any) {
        await transaction.rollback();
        console.log(error);
        res.status(500).json({
            ok :false,
            data : null,
            error : 'Error de servidor'
        })
    }
}