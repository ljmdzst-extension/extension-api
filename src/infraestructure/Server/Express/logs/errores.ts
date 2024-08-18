
export type ERROR_LOG = { status : number ,message : string}

export namespace ERROR {
   export const ACTIVIDAD_INEXISTENTE : ERROR_LOG = { status : 400 , message : ' - No existe actividad con ese id' }
   export const ACTIVIDAD_NO_CORRESPONDE : ERROR_LOG = { status : 400, message : ' La actividad no corresponde al area indicada' }
   export const ACTIVIDAD_BAJA_BD : ERROR_LOG = { status : 500, message : ' No se pudo dar de baja la actividad, no existe el registro '}
   export const ACTIVIDAD_MOD_BD : ERROR_LOG = { status : 500, message : ' No se pudo modificar la actividad, no existe el registro '}
   export const ACTIVIDAD_NO_SUSPENDIDA : ERROR_LOG = { status : 400, message : ' La actividad no está suspendida '}
   export const AREA_INEXISTENTE : ERROR_LOG = {status : 500 , message : '- No existe area con ese id'}
   export const ENLACE_INEXISTENTE : ERROR_LOG = { status : 500 , message : ' - No existe actividad con ese id' }
   export const ENLACE_BAJA_BD : ERROR_LOG = { status : 500, message : ' No se pudo dar de baja el enlace, no existe el registro '}
   export const ENLACE_MOD_BD : ERROR_LOG = { status : 500, message : ' No se pudo modificar el enlace, no existe el registro '}
   export const FECHA_PUNTUAL_INEXISTENTE : ERROR_LOG =  { status : 500 , message : ' - No existe fecha puntual con ese id' }
   export const FECHA_FUERA_DE_RANGO : ERROR_LOG =  { status : 500 , message : ' - La fecha esta fuera del rango definido' }
   export const ACT_FECHA_PUNTUAL : ERROR_LOG =  { status : 500 , message : ' - La fecha no tiene actividad asignada' }
   export const FIREBASE_NO_INSTITUCION : ERROR_LOG = { status : 500 , message : ' No existe institución con ese id' }
   export const FIREBASE_CONEXION : ERROR_LOG = { status : 500 , message : ' Error al conectar con el servidor' }
   export const META_INEXISTENTE : ERROR_LOG =  { status : 500 , message : ' - No existe meta con ese id' }
   export const META_BAJA_BD : ERROR_LOG = { status : 500, message : ' No se pudo dar de baja la meta, no existe el registro '}
   export const META_MOD_BD : ERROR_LOG = { status : 500, message : ' No se pudo modificar la meta, no existe el registro '}
   export const OBJETIVO_INEXISTENTE : ERROR_LOG = { status : 500 , message : ' - No existe objetivo con ese id' } 
   export const OBJETIVO_BAJA_BD : ERROR_LOG = { status : 500, message : ' No se pudo dar de baja el objetivo, no existe el registro '}
   export const OBJETIVO_MOD_BD : ERROR_LOG = { status : 500, message : ' No se pudo modificar el objetivo, no existe el registro '}
   export const PROGRAMA_INEXISTENTE : ERROR_LOG =  { status : 500 , message : ' - No existe programa con ese id' }
   export const PROGRAMA_SIPPE_INEXISTENTE : ERROR_LOG =  { status : 500 , message : ' - No existe prog SIPPE con ese id' }
   export const PROGRAMA_SIPPE_BAJA_BD : ERROR_LOG = { status : 500, message : ' No se pudo dar de baja el programa, no existe el registro '}
   export const PROGRAMA_SIPPE_MOD_BD : ERROR_LOG = { status : 500, message : ' No se pudo modificar el programa, no existe el registro '}
   export const PUERTO_INEXISTENTE : ERROR_LOG = { status : 500 , message : ' - El puerto no tiene valor asignado' }
   export const RELACION_INEXISTENTE : ERROR_LOG =  { status : 500 , message : ' - No existe relación con ese id' }
   export const RELACION_BAJA_BD : ERROR_LOG = { status : 500, message : ' No se pudo dar de baja la relación, no existe el registro '}
   export const RELACION_MOD_BD : ERROR_LOG = { status : 500, message : ' No se pudo modificar la relación, no existe el registro '}
   export const TIPO_RELACION_INEXISTENTE : ERROR_LOG =  { status : 500 , message : ' - No existe tipo de relación con ese id' }
   export const TIPO_RELACION_FALTANTE : ERROR_LOG = { status : 500 , message : ' - Falta la data de tipo relacion.' }
   export const TIPO_OBJ_INEXISTENTE : ERROR_LOG = { status : 500 , message : ' - No existe tipo obj. con ese id' }
   export const TIPO_OBJ_FALTANTE : ERROR_LOG = { status : 500 , message : ' - Falta la data de tipo obj.' }
   export const UBICACION_INEXISTENTE : ERROR_LOG = { status : 500 , message : ' - No existe ubicacion con ese id' }
   export const UBICACION_BAJA_BD : ERROR_LOG = { status : 500, message : ' No se pudo dar de baja la ubicación, no existe el registro '}
   export const UBICACION_MOD_BD : ERROR_LOG = { status : 500, message : ' No se pudo modificar la ubicación, no existe el registro '}
   export const ACTIVIDAD_UBICACION : ERROR_LOG = { status : 500, message : `La Ubicacion no tienne una actividad asociada`}
   export const VALORACION_INEXISTENTE : ERROR_LOG =  { status : 500 , message : ' - No existe valoración con ese id' }
   export const INSTITUCION_INEXISTENTE : ERROR_LOG =  { status : 500 , message : ' - No existe insitucion con ese id' }
}
