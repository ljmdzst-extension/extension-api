import Categoria from "../classes/categoria"
import Institucion from "../classes/institucion"
import Objetivo from "../classes/objetivo"
import PeriodoDeTrabajo from "../classes/periodo-de-trabajo"
import Permiso from "../classes/permiso"
import ProgramaSIPPE from "../classes/programa-sipppe"
import Relacion from "../classes/Relacion"

export default interface IModelBases {
    verBases( ) : Promise<{
        areas : PeriodoDeTrabajo[],
        objetivos : Objetivo[],
        relaciones : Relacion[],
        categorias : Categoria[],
        permisos : Permiso[],
        programasSIPPE : ProgramaSIPPE[]
    }>

    verInstituciones( filtro : string, offset ?: number, limit ?: number ) : Promise<Institucion[]>;
}