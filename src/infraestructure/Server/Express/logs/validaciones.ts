export type VALIDACION_LOG = { status : 400 , message : string}

export namespace INVALIDO {

    export const NOM_VALORACION : VALIDACION_LOG = { status : 400, message : 'nombre de valoración es obligatorio y máx. 255 caracteres'}
    export const ID_VALORACION : VALIDACION_LOG = { status : 400, message : 'id de valoración es obligatorio'}
    export const ENLACE_UBICACION : VALIDACION_LOG = { status : 400, message : 'enlace de ubicación debe tener formato url válido'}
    export const NOM_UBICACION : VALIDACION_LOG = { status : 400, message : 'nombre de ubicación es obligatorio y máx. 255 caracteres'}
    export const ENLACE_UBICACION_LARGO : VALIDACION_LOG = { status : 400, message : 'enlace de ubicación es obligatorio y máx. 2083 caracteres'}
    
    export const ID_TIPO_REL : VALIDACION_LOG = { status : 400, message : 'id tipo relación obligatorio'}
    export const ID_TIPO_OBJ : VALIDACION_LOG = { status : 400, message : 'id tipo objetivo obligatorio'}
    export const ID_REL_VACIO : VALIDACION_LOG ={ status : 400, message : 'id relacion obligatorio'}
    export const ID_REL_INVALIDO : VALIDACION_LOG ={ status : 400, message : 'id relacion inválido'}
    export const ID_PROG_SIPPE : VALIDACION_LOG ={ status : 400, message : 'id prog. sippe obligatorio'}
    export const ID_PROG_SIPPEL_INVALIDO : VALIDACION_LOG ={ status : 400, message : 'id prog. sippe inválido'}
    export const ID_SUB_PROG_SIPPE : VALIDACION_LOG ={ status : 400, message : 'subProgramaDe debe ser distinto de cero'}

    export const ANIO_PROG : VALIDACION_LOG = { status : 400, message : 'el año no debe ser menor a 2023'}

    export const DESC_META : VALIDACION_LOG = { status : 400 , message : 'descripción de meta obligatorio'}
    export const RES_META : VALIDACION_LOG = { status : 400 , message : 'resultado de meta máx. 1000 caracteres'}
    export const OBS_META : VALIDACION_LOG = { status : 400 , message : 'descripción de meta máx. 1000 caracteres'}
    export const NOM_INSTITUCION : VALIDACION_LOG = { status : 400, message : 'nombre de institución es obligatorio y máx. 255 caracteres'}
    export const UBIC_INSTITUCION : VALIDACION_LOG = { status : 400, message : 'ubicación de institución debe tener formato url válido'}
    export const DESC_ENLACE : VALIDACION_LOG = { status : 400, message : 'nombre de institución es obligatorio y máx. 255 caracteres'}
    export const LINK_ENLACE : VALIDACION_LOG = { status : 400, message : 'ubicación de institución debe tener formato url válido'}
    export const ID_OBJ_VACIO : VALIDACION_LOG ={ status : 400, message : 'id objetivo obligatorio'}
    export const ID_OBJ_INVALIDO : VALIDACION_LOG ={ status : 400, message : 'id objetivo inválido'}
    
    export const FECHA_PUNTUAL : VALIDACION_LOG ={ status : 400, message : 'fecha puntual no puede ser mayor a la fecha actual'}
    export const RANGO_FECHA_PUNTUAL : VALIDACION_LOG ={ status : 400, message : 'fecha puntual fuera del periodo de la actividad'}
    export const ID_AREA_ACT : VALIDACION_LOG ={ status : 400, message : 'id area de actividad obligatorio'}
    export const DESC_ACT : VALIDACION_LOG ={ status : 400, message : 'descripción actividad obligatorio y máx 2000 caracteres'}

    export const MOT_CANCEL_ACT : VALIDACION_LOG ={ status : 400, message : 'motivo cancelaciòn actividad máx 500 caracteres'}
    export const RANGO_ACT : VALIDACION_LOG ={ status : 400, message : 'periodo de ejecución de actividad, fechaDesde debe ser anterior a fechaHasta'}

    export const ID_ACT_REP : VALIDACION_LOG ={ status : 400, message : 'ya existe una actividad con ese id'}
    export const ID_ACT : VALIDACION_LOG ={ status : 400, message : 'id actividad obligatorio'}
    
    export const NRO_ACT : VALIDACION_LOG ={ status : 400 , message : 'número de actividad obligatorio'}
}