import Actividad , {TDataActividad} from './classes/Actividad';
import Area, { TDataArea } from './classes/Area';
import Enlace, { TDataEnlace } from './classes/Enlace';
import FechaPuntual, { TDataFecha } from './classes/FechaPuntual';
import Institucion, { TDataInstitucion } from './classes/Institucion';
import Meta, { TDataMeta } from './classes/Meta';
import Objetivo, { TDataObjetivo } from './classes/Objetivo';
import Programa, { TDataPrograma } from './classes/Programa';
import ProgramaSIPPE, { TDataProgramaSIPPE } from './classes/ProgramaSIPPE';
import Relacion, { TDataRelacion } from './classes/Relacion';
import TipoObjetivo, { TDataTipoObjetivo } from './classes/TipoObjetivo';
import TipoRelacion, { TDataTipoRelacion } from './classes/TipoRelacion';
import Ubicacion, { TDataUbicacion } from './classes/Ubicacion';

import IModelActividad from './models/actividad'
import IValidatorActividad from './validators/actividad';

type _TDataActividad = TDataActividad;
type _TDataArea = TDataArea;
type _TDataEnlace = TDataEnlace;
type _TDataFechaPuntual = TDataFecha;
type _TDataInstitucion = TDataInstitucion;
type _TDataMeta = TDataMeta;
type _TDataObjetivo = TDataObjetivo;
type _TDataPrograma = TDataPrograma;
type _TDataProgramaSIPPE = TDataProgramaSIPPE;
type _TDataRelacion = TDataRelacion;
type _TDataTipoObjetivo = TDataTipoObjetivo;
type _TDataTipoRelacion = TDataTipoRelacion;
type _TDataUbicacion = TDataUbicacion;

interface MActividad extends IModelActividad {};

const _Actividad = Actividad;
const _Area = Area;
const _Enlace = Enlace;
const _FechaPuntual = FechaPuntual;
const _Institucion = Institucion;
const _Meta = Meta;
const _Objetivo = Objetivo;
const _Programa = Programa;
const _ProgramaSIPPE = ProgramaSIPPE;
const _Relacion = Relacion;
const _TipoObjetivo = TipoObjetivo;
const _TipoRelacion = TipoRelacion;
const _Ubicacion = Ubicacion;

interface VActividad extends IValidatorActividad {}


export namespace domain {
    export class Actividad extends _Actividad {};
    export class Area extends _Area {};
    export class Enlace extends _Enlace {};
    export class FechaPuntual extends _FechaPuntual {};
    export class Institucion extends _Institucion {};
    export class Meta extends _Meta {};
    export class Objetivo extends _Objetivo {};
    export class Programa extends _Programa {};
    export class ProgramaSIPPE extends _ProgramaSIPPE {};
    export class Relacion extends _Relacion {};
    export class TipoObjetivo extends _TipoObjetivo {};
    export class TipoRelacion extends _TipoRelacion {};
    export class Ubicacion extends _Ubicacion {};
    export type TDataActividad = _TDataActividad;
    export type TDataArea = _TDataArea;
    export type TDataEnlace = _TDataEnlace;
    export type TDataFechaPuntual = _TDataFechaPuntual;
    export type TDataInstitucion = _TDataInstitucion;
    export type TDataMeta = _TDataMeta;
    export type TDataObjetivo = _TDataObjetivo;
    export type TDataPrograma = _TDataPrograma;
    export type TDataProgramaSIPPE = _TDataProgramaSIPPE;
    export type TDataRelacion = _TDataRelacion;
    export type TDataTipoObjetivo = _TDataTipoObjetivo;
    export type TDataTipoRelacion = _TDataTipoRelacion;
    export type TDataUbicacion = _TDataUbicacion;  
    export interface IModelActividad extends MActividad{};
    export interface IValidatorActividad extends VActividad {};
}

