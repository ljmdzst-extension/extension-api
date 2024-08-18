import { CategoriaAttributes, CategoriaCreationAttributes } from "../models/Categoria"
import { PermisoAttributes, PermisoCreationAttributes } from "../models/Permiso"
import { PersonaCreationAttributes } from "../models/Persona"
import { UsuarioCreationAttributes } from "../models/Usuario"

export type permisoUsuario = {
    categoria : string,
    permiso : string
}

export type DataRegistroUsuario = PersonaCreationAttributes & UsuarioCreationAttributes & {confirmPass : string};

export type usuarioPayload = {
    idUsuario : string,
    ape : string, 
    nom : string, 
    email : string,
    token : string,
    categoria ?: {
        idCategoria ?: number,
        nom ?: number,
        permisos : {
            idPermiso ?: number,
            nom ?: number
        }[]
    }
}