import { domain } from "../domain";

export default class GestionDeUsuarios {

    static async altaUsuario( data : domain.TDataUsuario, p : domain.Persona , MUsuario : domain.IModelUsuario, VUsuario : domain.IValidatorUsuario ) {

        if(! VUsuario.validar(data) ) throw new Error('Revise los campos ingresados del usuario');
        if(!data.categoria ) throw new Error('El usuario debe tener una categoría');
        if(!data.listaPermisos) throw new Error('El usuario debe tener una lista de permisos');
        const c = new domain.Categoria(data.categoria);
        const cPermisos = data.listaPermisos.map( dataPermiso => new domain.Permiso(dataPermiso));

        let u = new domain.Usuario( data , p, c, cPermisos );

        u = await MUsuario.guardarDatos(u);
        
        return u;
    }

    static async editarUsuario( data : domain.TDataUsuario , MUsuario : domain.IModelUsuario, VUsuario : domain.IValidatorUsuario) {
        if(!VUsuario.validar(data) ) throw new Error('Revise los campos ingresados del usuario');
        if(!data.categoria ) throw new Error('El usuario debe tener una categoría');
        if(!data.listaPermisos) throw new Error('El usuario debe tener una lista de permisos');
        if(!data.persona) throw new Error('El usuario debe tener datos personales');

        let u = await MUsuario.buscarPorId(data.idUsuario);

        if(!u) throw new Error(`No existe usuario cargado con ese id : ${data.idUsuario}`);

        u.editar(data);
        
        u = await MUsuario.guardarDatos(u);

        return u;
    }

}