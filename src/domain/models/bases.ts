import Categoria from "../classes/Categoria"
import Institucion from "../classes/Institucion"
import Objetivo from "../classes/Objetivo"
import PeriodoDeTrabajo from "../classes/PeriodoDeTrabajo"
import Permiso from "../classes/Permiso"
import ProgramaSIPPE from "../classes/ProgramaSIPPE"
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