import BusquedaActividades from './BusquedaActividades';
import BusquedaAreas from './BusquedaAreas';
import BusquedaProgramas from './BusquedaProgramas';
import BusquedaUsuarios from './BusquedaUsuarios';
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
const _BusquedaDeUsuarios = BusquedaUsuarios;
const _BusquedaProgramas = BusquedaProgramas;
const _BusquedaAreas = BusquedaAreas;


export namespace aplication {
    export class GestionDeActividades extends _GestionDeActividades {}
    export class GestionDePersonas extends _GestionDePersonas {}
    export class GestionDeUsuarios extends _GestionDeUsuarios {}
    export class BusquedaActividades extends _BusquedaDeActividades {}
    export class BusquedaUsaurios extends _BusquedaDeUsuarios {}
    export class BusquedaProgramas extends _BusquedaProgramas {}
    export class BusquedaAreas extends _BusquedaAreas {}
    export interface IVActividad extends IValidatorActividad {}
    export interface IVPersona extends IValidatorPersona {}
    export interface IVUsuario extends IValidatorUsuario {}
    
}