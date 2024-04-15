import { Transaction } from "sequelize";
import Objetivo, { IObjetivo } from "../classes/Objetivo";
import ProgramaSIPPE, { IProgramaSIPPE } from "../classes/ProgramaSIPPE";
import Relacion, { IRelacion } from "../classes/Relacion";
import Valoracion, { IValoracion } from "../classes/Valoracion";
import Institucion, { IInstitucion } from "../classes/Institucion";
import { DataGetInstituciones } from "../types/base";

export type TBases = {
    listaObjetivos : IObjetivo[],
    listaProgramasSIPPE : IProgramaSIPPE[]
    listaRelaciones : IRelacion[],
    listaValoraciones : IValoracion[],
    unidadesAcademicas : ({idUnidadAcademica : number, nom : string})[]
}


export default class SBases {
    public static async mostrarBases( data : any, transaction ?: Transaction) 
    : Promise<TBases> 
    {
        let salida : TBases = {
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
                                                          .map( rel => ({idUnidadAcademica : rel.idRelacion, nom : rel.nom || '-'}))
        return salida;
    }

    public static async verInstituciones( data : DataGetInstituciones, transaction ?: Transaction ) 
    : Promise<IInstitucion[]>
    {
        let salida : IInstitucion[] = [];

        // implementar con db_instituciones

       const instituciones =  await Institucion.buscarPorPalabraClave(data.query, data.offset, data.limit,transaction);

       if(instituciones.length) {
         salida = instituciones.map( institucion => institucion.verDatos())
       }


        return salida;
    }
}