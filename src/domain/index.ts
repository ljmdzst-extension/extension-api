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
import Persona, {TDataPersona} from './classes/Persona';
import Permiso, {TDataPermiso} from './classes/Permiso';
import Categoria, {TDataCategoria} from './classes/Categoria';
import Usuario, { TDataUsuario } from './classes/Usuario';
import IModelActividad from './models/actividad';
import IModelUsuario from './models/usuario';
import IModelPersona from './models/persona';
import IModelArea from './models/area';
import IModelBases from './models/bases';
import IValidatorActividad from '../aplication/validators/actividad';
import IValidatorUsuario from '../aplication/validators/usuario';

import { IModelPrograma } from './models/programa';

import PeriodoDeTrabajo,{TDataPeriodoDeTrabajo} from './classes/PeriodoDeTrabajo';

import { TValoracion } from './types/valoracion';


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
type _TDataPersona = TDataPersona;
type _TDataCategoria = TDataCategoria;
type _TDataPermiso = TDataPermiso;
type _TDataUsuario = TDataUsuario;
type _TDataPeriodoDeTrabajo = TDataPeriodoDeTrabajo;

type _TValoracion = TValoracion;
interface MActividad extends IModelActividad {};
interface MUsuario extends IModelUsuario {}
interface MPersona extends IModelPersona{}
interface MPrograma extends IModelPrograma { }
interface MArea extends IModelArea {}
interface MBases extends IModelBases {}
const _Actividad = Actividad;
const _Area = Area;
const _PeriodoDeTrabajo = PeriodoDeTrabajo;
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
const _Persona = Persona;
const _Categoria = Categoria;
const _Permiso = Permiso;
const _Usuario = Usuario;
interface VActividad extends IValidatorActividad {}
interface VUsuario extends IValidatorUsuario{}

export namespace domain {
    export class Actividad extends _Actividad {};
    export class Area extends _Area {};
    export class PeriodoDeTrabajo extends _PeriodoDeTrabajo {};
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
    export class Persona extends _Persona {};
    export class Permiso extends _Permiso {};
    export class Usuario extends _Usuario {};
    export class Categoria extends _Categoria {};

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
    export type TDataPersona =_TDataPersona;
    export type TDataUsuario = _TDataUsuario;
    export type TDataCategoria = _TDataCategoria;
    export type TDataPermiso = _TDataPermiso;
    export type TDataPeriodoDeTrabajo = _TDataPeriodoDeTrabajo;
    export type TDataBases ={ 
        areas: PeriodoDeTrabajo[]; 
        objetivos: Objetivo[]; 
        relaciones: Relacion[]; 
        categorias: Categoria[]; 
        permisos: Permiso[];
        programasSIPPE: ProgramaSIPPE[]; 
    }
    export type TValoracion = _TValoracion;

    export interface IModelActividad extends MActividad{};
    export interface IModelUsuario extends MUsuario {};
    export interface IModelPersona extends MPersona {};
    export interface IModelPrograma extends MPrograma {};
    export interface IModelArea extends MArea {};
    export interface IModelBases extends MBases {};
    export interface IValidatorActividad extends VActividad {};
    export interface IValidatorUsuario extends VUsuario {};
}

