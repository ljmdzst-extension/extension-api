import BusquedaActividades from './BusquedaActividades';
import GestionDeActividades from './GestionDeActividades';
import GestionDePersonas from './GestionDePersonas';
import GestionDeUsuarios from './GestionDeUsuarios';
import IValidatorActividad from './validators/actividad';
import IValidatorPersona from './validators/persona';
import IValidatorUsuario from './validators/usuario';

const _GestionDeActividades = GestionDeActividades;
const _GestionDePersonas = GestionDePersonas;
const _GestionDeUsuarios = GestionDeUsuarios;
const _BusquedaDeActividades = BusquedaActividades;


export namespace aplication {
    export class GestionDeActividades extends _GestionDeActividades {}
    export class GestionDePersonas extends _GestionDePersonas {}
    export class GestionDeUsuarios extends _GestionDeUsuarios {}
    export class BusquedaActividades extends _BusquedaDeActividades {}
    export interface IVActividad extends IValidatorActividad {}
    export interface IVPersona extends IValidatorPersona {}
    export interface IVUsuario extends IValidatorUsuario {}
    
}