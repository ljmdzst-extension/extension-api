import Actividad , {TActividad} from './classes/actividad';
import Area, { TArea } from './classes/area';
import Enlace, { TEnlace } from './classes/enlace';
import FechaPuntual, { TFecha } from './classes/fecha-puntual';
import Institucion, { TInstitucion } from './classes/institucion';
import Meta, { TMeta } from './classes/meta';
import Objetivo, { TObjetivo } from './classes/objetivo';
import Programa, { TPrograma } from './classes/programa';
import ProgramaSIPPE, { TProgramaSIPPE } from './classes/programa-sipppe';

import TipoObjetivo, { TTipoObjetivo } from './classes/tipo-objetivo';
import TipoRelacion, { TTipoInstitucion } from './classes/tipo-institucion';
import Ubicacion, { TUbicacion } from './classes/ubicacion';
import Permiso, {TPermiso} from './classes/permiso';
import Categoria, {TCategoria} from './classes/categoria';
import Usuario, { TUsuario } from './classes/usuario';


import IModelActividad from './models/actividad';
import IModelUsuario from './models/usuario';
import IModelPersona from './models/persona';
import IModelArea from './models/area';
import IModelBases from './models/bases';

import { IModelPrograma } from './models/programa';

import PeriodoDeTrabajo,{TPeriodoDeTrabajo} from './classes/periodo-de-trabajo';

import { TValoracion } from './types/valoracion';
import IModelCategoria from './models/categoria';
import IModelObjetivo from './models/obejtivo';
import IModelPermiso from './models/permiso';
import IModelTipoObjetivo from './models/tipo-objetivo';
import IModelTipoRelacion from './models/tipo-relacion';
import IModelEnlace from './models/enlace';
import IModelUbicacion from './models/ubicacion';
import IModelProgramaSIPPE from './models/programa-sippe';
import IModelInstitucion from './models/institucion';
import PersonaFisica, { TPersonaFisica } from './classes/persona-fisica';
import PersonaJuridica, { TPersonaJuridica } from './classes/persona-juridica';


type _TActividad = TActividad;
type _TArea = TArea;
type _TEnlace = TEnlace;
type _TFechaPuntual = TFecha;
type _TInstitucion = TInstitucion;
type _TMeta = TMeta;
type _TObjetivo = TObjetivo;
type _TPrograma = TPrograma;
type _TProgramaSIPPE = TProgramaSIPPE;
type _TTipoObjetivo = TTipoObjetivo;
type _TTipoInstitucion = TTipoInstitucion;
type _TUbicacion = TUbicacion;
type _TPersonaFisica = TPersonaFisica;
type _TPersonaJuridica = TPersonaJuridica;
type _TCategoria = TCategoria;
type _TPermiso = TPermiso;
type _TUsuario = TUsuario;
type _TPeriodoDeTrabajo = TPeriodoDeTrabajo;

type _TValoracion = TValoracion;

type _TBases = { 
    areas: PeriodoDeTrabajo[]; 
    objetivos: Objetivo[]; 
    categorias: Categoria[]; 
    permisos: Permiso[];
    programasSIPPE: ProgramaSIPPE[]; 
}

interface MActividad extends IModelActividad {};
interface MUsuario extends IModelUsuario {}
interface MPersona extends IModelPersona{}
interface MPrograma extends IModelPrograma { }
interface MArea extends IModelArea {}
interface MBases extends IModelBases {}
interface MCategoria extends IModelCategoria {}
interface MObjetivo extends IModelObjetivo {}
interface MPermiso extends IModelPermiso{}
interface MTipoObjetivo extends IModelTipoObjetivo {} 
interface MTipoRelacion extends IModelTipoRelacion {}
interface MEnlace extends IModelEnlace {}
interface MUbicacion extends IModelUbicacion {}
interface MProgramaSIPPE extends IModelProgramaSIPPE {}
interface MInstitucion extends IModelInstitucion  {}
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
const _TipoObjetivo = TipoObjetivo;
const _TipoRelacion = TipoRelacion;
const _Ubicacion = Ubicacion;
const _PersonaFisica = PersonaFisica;
const _PersonaJuridica = PersonaJuridica;
const _Categoria = Categoria;
const _Permiso = Permiso;
const _Usuario = Usuario;

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
    export class TipoObjetivo extends _TipoObjetivo {};
    export class TipoRelacion extends _TipoRelacion {};
    export class Ubicacion extends _Ubicacion {};
    export class PersonaFisica extends _PersonaFisica {};
    export class PersonaJuridica extends _PersonaJuridica {};
    export class Permiso extends _Permiso {};
    export class Usuario extends _Usuario {};
    export class Categoria extends _Categoria {};

    export type TActividad = _TActividad;
    export type TArea = _TArea;
    export type TEnlace = _TEnlace;
    export type TFechaPuntual = _TFechaPuntual;
    export type TInstitucion = _TInstitucion;
    export type TMeta = _TMeta;
    export type TObjetivo = _TObjetivo;
    export type TPrograma = _TPrograma;
    export type TProgramaSIPPE = _TProgramaSIPPE;
    export type TTipoObjetivo = _TTipoObjetivo;
    export type TTipoInstitucion = _TTipoInstitucion;
    export type TUbicacion = _TUbicacion;  
    export type TUsuario = _TUsuario;
    export type TCategoria = _TCategoria;
    export type TPermiso = _TPermiso;
    export type TPeriodoDeTrabajo = _TPeriodoDeTrabajo;

    export type TBase = _TBases;
    export type TValoracion = _TValoracion;

    export interface IModelActividad extends MActividad{};
    export interface IModelUsuario extends MUsuario {};
    export interface IModelPersona extends MPersona {};
    export interface IModelPrograma extends MPrograma {};
    export interface IModelArea extends MArea {};
    export interface IModelBases extends MBases {};
    export interface IModelCategoria extends MCategoria{};
    export interface IModelObjetivo extends MObjetivo {};
    export interface IModelPermiso extends MPermiso {};
    export interface IModelTipoObjetivo extends MTipoObjetivo {};
    export interface IModelTipoRelacion extends MTipoRelacion {};
    export interface IModelEnlace extends MEnlace {};
    export interface IModelUbicacion extends MUbicacion {};
    export interface IModelProgramaSIPPE extends MProgramaSIPPE {};
    export interface IModelInstitucion extends MInstitucion {};
}

