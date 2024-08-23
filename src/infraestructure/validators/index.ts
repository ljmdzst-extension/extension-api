import VActividad from "./actividad"
import VPersona from "./persona";
import VUsuario from "./usuario";

const _VActividad = VActividad;
const _VUsuario = VUsuario;
const _VPersona = VPersona;


export namespace validators{
    export  class VActividad extends _VActividad {};
    export  class VUsuario extends _VUsuario {};
    export  class VPersona extends _VPersona {};
     
}