import { request, response } from "express";
import { Relacion as ModelRelacion } from "../models/Relacion";
import sequelizeExtension from "../config/dbConfig";
import { Transaction } from "sequelize";
import Objetivo, { IObjetivo } from "../classes/Objetivo";
import ProgramaSIPPE, { IProgramaSIPPE } from "../classes/ProgramaSIPPE";
import Relacion, { IRelacion } from "../classes/Relacion";
import Valoracion, { IValoracion } from "../classes/Valoracion";
import Institucion, { IInstitucion } from "../classes/Institucion";
import { DataGetInstituciones } from "../types/base";

export interface IBases {
    listaObjetivos : IObjetivo[],
    listaProgramasSIPPE : IProgramaSIPPE[]
    listaRelaciones : IRelacion[],
    listaValoraciones : IValoracion[],
    unidadesAcademicas : IRelacion[]
}

export const verBases = async(req : typeof request , res : typeof response)=>{
    const transaction = await sequelizeExtension.transaction();
    try {
        
        const otrasBases = await ControllerBases.mostrarBases({},transaction);

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

        res.status(500).json({
            ok : false,
            error
        })   
    }
}


export default class ControllerBases {

   

    public static async mostrarBases( data : any, transaction ?: Transaction) 
    : Promise<IBases> 
    {
        let salida : IBases = {
            listaObjetivos : [],
            listaProgramasSIPPE : [],
            listaRelaciones : [],
            listaValoraciones : [],
            unidadesAcademicas : []
        }

        salida.listaRelaciones = await Relacion.verListaBD(transaction);

        salida.listaObjetivos = await Objetivo.verListaBD(transaction);

        salida.listaProgramasSIPPE = await ProgramaSIPPE.verListaBD(transaction);

        salida.listaValoraciones= await Valoracion.verListaBD(transaction);

        salida.unidadesAcademicas = salida.listaRelaciones.filter( rel => rel.tipoRelacion?.idTipoRelacion === 3 )
        return salida;
    }

    public static async verInstituciones( data : DataGetInstituciones, transaction ?: Transaction , transactionInsituciones ?: Transaction ) 
    : Promise<IInstitucion[]>
    {
        let salida : IInstitucion[] = [];

        // implementar con db_instituciones

       const instituciones =  await Institucion.buscarPorPalabraClave(data.query, data.offset, data.limit,transactionInsituciones);

       if(instituciones.length) {
         salida = instituciones.map( institucion => institucion.verDatos())
       }


        return salida;
    }
}