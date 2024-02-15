
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
    categorias : permisoUsuario[]
}