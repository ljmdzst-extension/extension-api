import { Transaction } from "sequelize";
import Objetivo, { IObjetivo } from "../classes/Objetivo";
import ProgramaSIPPE, { IProgramaSIPPE } from "../classes/ProgramaSIPPE";
import Relacion, { IRelacion } from "../classes/Relacion";
import Valoracion, { IValoracion } from "../classes/Valoracion";
import Institucion, { IInstitucion } from "../classes/Institucion";
import { DataGetInstituciones } from "../types/base";
import { IArea } from "../classes/Area";
import { BD } from "../config/dbConfig";
import { AreaPrograma } from "../models/AreaPrograma";
import { Programa } from "../models/Programa";
import { Area } from "../models/Area";
import { IPrograma } from "../classes/Programa";

export type TBases = {
    listaObjetivos : IObjetivo[],
    listaProgramasSIPPE : IProgramaSIPPE[]
    listaRelaciones : IRelacion[],
    listaValoraciones : IValoracion[],
    unidadesAcademicas : ({idUnidadAcademica : number, nom : string})[],
    lAreasProgramasAnios : ({anio : number, listaProgramas : IPrograma[]})[]
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
            unidadesAcademicas : [],
            lAreasProgramasAnios : []
        }

        salida.listaRelaciones = await Relacion.verListaBD(transaction);

        salida.listaObjetivos = await Objetivo.verListaBD(transaction);

        salida.listaProgramasSIPPE = await ProgramaSIPPE.verListaBD(transaction);

        salida.listaValoraciones= await Valoracion.verListaBD(transaction);

        salida.unidadesAcademicas = salida.listaRelaciones.filter( rel => rel.tipoRelacion?.idTipoRelacion === 3 )
                                                          .map( rel => ({idUnidadAcademica : rel.idRelacion, nom : rel.nom || '-'}));
        
        const lAreaProgramas : Map<number,AreaPrograma[]> = new Map();                                                  
        const lProgramas : Map<number,Programa> = new Map();
        const lAreas : Map<number,Area> = new Map();

        await Promise.all([
            BD.AreaPrograma.findAll({transaction}).then(resp => resp.forEach( ap => {
                const _lAreaPrograma = lAreaProgramas.get(ap.anio);
                if(_lAreaPrograma){
                    lAreaProgramas.set(ap.anio,[ ..._lAreaPrograma, ap]);
                }else {
                    lAreaProgramas.set(ap.anio,[]);
                }
            } )),
            BD.Programa.findAll({transaction}).then(resp => resp.forEach( p => lProgramas.set( p.idPrograma, p ))),
            BD.Area.findAll({transaction}).then(resp => resp.forEach( a => lAreas.set(a.idArea,a)))
        ]);
         lAreaProgramas.forEach( ( areasPrograma,anio )=> {
            const _lProgramas : Programa[] = [];
            areasPrograma.forEach( ap => {
                const p = lProgramas.get(ap.idPrograma);
                if(p){
                    _lProgramas.push(p);
                }
            });

            salida.lAreasProgramasAnios.push( {
                anio : anio,
                listaProgramas : [...new Set([
                    ..._lProgramas.map( _p => {
                        const _lAreas : Area[] = [];
                        areasPrograma.filter(ap => ap.idPrograma === _p.idPrograma)
                                    .forEach( ap => {
                                        const a = lAreas.get(ap.idArea);
                                        if( a ){
                                            _lAreas.push(a);
                                        }
                                    }) 
                        return {
                            ..._p.dataValues,
                            listaAreas : _lAreas
                        }
                    })
                ]).values()]
            } )
         } )

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