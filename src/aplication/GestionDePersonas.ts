import Persona, { TDataPersona } from "../domain/classes/Persona";
import IModelPersona from "../domain/models/persona";
import IValidatorPersona from "./validators/persona";

export default class GestionDePersonas {
    static async altaPersona( data : TDataPersona, MPersona : IModelPersona , VPersona : IValidatorPersona) {

        if(!VPersona.validar(data)) throw new Error('data persona inválida, revise los campos');
        
        let p = new Persona(data);

        p = await MPersona.guardarDatos(p);

        return p;

    }
    static async findPersona( nroDoc : string , MPersona : IModelPersona, VPersona : IValidatorPersona) {
        if(!VPersona.validarNroDoc(nroDoc)) throw new Error('Nro doc inválido');

        const p = await MPersona.buscarPorNroDoc(nroDoc);

        return p;
    }
}