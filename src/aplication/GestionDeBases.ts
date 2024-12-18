import { domain } from "../domain";

type TBases = {
    listaCategorias : domain.TCategoria[],
    listaPermisos : domain.TPermiso[],
    listaObjetivos : domain.TObjetivo[],
    listaProgramasSIPPE : domain.TProgramaSIPPE[],
    listaRelaciones : domain.T[],
    listaValoraciones : domain.TValoracion[],
    unidadesAcademicas : domain.TRelacion[],
    lAreasProgramasAnios : domain.TPeriodoDeTrabajo[]
}

export default class GestionDeBases {

    public static async mostrarBases( MBases : domain.IModelBases  ) : Promise<TBases >{
        let salida : TBases = {
            listaCategorias : [],
            listaPermisos : [],
            listaObjetivos: [],
            listaProgramasSIPPE: [],
            listaRelaciones: [],
            listaValoraciones: [],
            unidadesAcademicas: [],
            lAreasProgramasAnios: []
        }
        const dbBases = await MBases.verBases();

        salida.listaObjetivos = dbBases.objetivos.map( o => o.verDatos());
        salida.listaRelaciones = dbBases.relaciones.filter( r => r.verDatos().tipoRelacion?.nom !== 'U.A.' ).map( r => r.verDatos());
        salida.unidadesAcademicas = dbBases.relaciones.filter( r => r.verDatos().tipoRelacion?.nom === 'U.A.' ).map( r => r.verDatos());
        salida.listaValoraciones = [
            { idValoracion : 1, nom : 'Muy bueno' },
            { idValoracion : 2, nom : 'Bueno' },
            { idValoracion : 3, nom : 'Regular' },
            { idValoracion : 4, nom : 'Malo' },
        ]
        salida.listaProgramasSIPPE = dbBases.programasSIPPE.map( ps => ps.verDatos());
        salida.lAreasProgramasAnios = dbBases.areas.map( a => a.verDatos());
        salida.listaCategorias = dbBases.categorias.map( c => c.verDatos());
        salida.listaPermisos = dbBases.permisos.map( p => p.verDatos())


        return salida;


    }

}