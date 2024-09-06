import { Transaction } from "sequelize";
import Objetivo, { IObjetivo } from "../classes/Objetivo";
import ProgramaSIPPE, { IProgramaSIPPE } from "../classes/ProgramaSIPPE";
import Relacion, { IRelacion } from "../classes/Relacion";
import Valoracion, { IValoracion } from "../classes/Valoracion";
import Institucion, { IInstitucion } from "../classes/Institucion";
import { DataGetInstituciones } from "../types/base";
import { BD } from "../config/dbConfig";
import { AreaPrograma } from "../models/AreaPrograma";
import { Programa } from "../models/Programa";
import { Area } from "../models/Area";
import { IPrograma } from "../classes/Programa";
import Permiso, { IPermiso } from "../classes/Permiso";
import Categoria, { ICategoria } from "../classes/Categoria";

export type TBases = {
    listaObjetivos : IObjetivo[],
    listaProgramasSIPPE : IProgramaSIPPE[]
    listaRelaciones : IRelacion[],
    listaValoraciones : IValoracion[],
    listaPermisos : IPermiso[],
    listaCategorias : ICategoria[],
    unidadesAcademicas : ({idUnidadAcademica : number, nom : string})[],
    lAreasProgramasAnios : ({anio : number, listaProgramas : IPrograma[]})[]
}


export default class SBases {
    public static async mostrarBases(  transaction ?: Transaction) 
    : Promise<TBases> 
    {
        let salida : TBases = {
            listaObjetivos : [],
            listaProgramasSIPPE : [],
            listaRelaciones : [],
            listaValoraciones : [],
            listaPermisos : [],
            listaCategorias : [],
            unidadesAcademicas : [],
            lAreasProgramasAnios : []
        }

        salida.listaPermisos = await Permiso.verListaBD(transaction);
        
        salida.listaCategorias = await Categoria.verListaBD(transaction);

        salida.listaRelaciones = await Relacion.verListaBD(transaction);

        salida.listaObjetivos = await Objetivo.verListaBD(transaction);

        salida.listaProgramasSIPPE = await ProgramaSIPPE.verListaBD(transaction);

        salida.listaValoraciones= await Valoracion.verListaBD(transaction);

        salida.unidadesAcademicas = salida.listaRelaciones.filter( rel => rel.tipoRelacion?.idTipoRelacion === 3 )
                                                          .map( rel => ({idUnidadAcademica : rel.idRelacion, nom : rel.nom || '-'}));
        
        const lAreaProgramas : AreaPrograma[] = [];                                                  
        const lProgramas : Map<number,Programa> = new Map();
        const lAreas : Map<number,Area> = new Map();

        await Promise.all([
            BD.AreaPrograma.findAll({transaction}).then(resp => lAreaProgramas.push(...resp)),
            BD.Programa.findAll({transaction}).then(resp => resp.forEach( p => lProgramas.set( p.idPrograma, p ))),
            BD.Area.findAll({transaction}).then(resp => resp.forEach( a => lAreas.set(a.idArea,a)))
        ]);
        const anios : Set<number> = new Set();

        lAreaProgramas.forEach( ap => anios.add(ap.anio));

        anios.forEach( a => {
            const apsDelAnio = lAreaProgramas.filter( ap => ap.anio === a);
            const listaProgramas : IPrograma [ ] = [];
            
            apsDelAnio.forEach( apa => {
                
                let itemProg = listaProgramas.find( _p => _p.idPrograma === apa.idPrograma);
                if(!itemProg) {
                    itemProg = { 
                        idPrograma : apa.idPrograma, 
                        nom : `${lProgramas.get(apa.idPrograma)?.nom}` ,
                        listaAreas : []  
                    } 
                    listaProgramas.push( itemProg )

                }
                const area = lAreas.get(apa.idArea);
                if(area && itemProg.listaAreas.every( a => a.idArea !== area.idArea)) {
                    itemProg.listaAreas.push(area.dataValues);
                }
               

            });

            salida.lAreasProgramasAnios.push(
                {
                    anio : a,
                    listaProgramas : listaProgramas
                }
            )
        })
            
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