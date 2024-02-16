import { CategoriaAttributes, CategoriaCreationAttributes } from "../models/Categoria"
import { PermisoAttributes, PermisoCreationAttributes } from "../models/Permiso"

export type permisoUsuario = {
    categoria : string,
    permiso : string
}

export type usuarioPayload = {
    idUsuario : string,
    ape : string, 
    nom : string, 
    email : string,
    token : string,
    categorias ?: {
        idCategoria ?: number,
        nom ?: number,
        permisos : {
            idPermiso ?: number,
            nom ?: number
        }[]
    }[]
}