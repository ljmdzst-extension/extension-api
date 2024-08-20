import Persona, { TDataPersona } from "../classes/Persona";

export default interface IModelPersona {
    buscarPorNroDoc( nroDoc : string ) : Promise<Persona| null>;
    buscarPor( parametros : TDataPersona) : Promise<Persona|null>;
    verLista( offset ?: number, limit ?: number ) : Promise<Persona[]>;
    guardarDatos( persona : Persona) : Promise<Persona>;
    darDeBAja( nroDoc : string ) : Promise<Persona>;
    
} 