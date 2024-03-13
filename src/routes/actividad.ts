
import { Router } from "express";
import { 
    validarActividadExistente,
    validarActividadSuspendida,
    validarCampos,
    validarCamposActividad, 
    validarMotivoSuspension, 
    validarParametros, 
    validarSchema
} from "../middlewares/actividad";

import { 
    cargarActividad, 
    darDeBajaActividad, 
    editarActividad, 
    restaurarActividad, 
    suspenderActividad, 
    verActividad 
} from "../controllers/actividad";

import {check} from 'express-validator';
import { validarPermisoGestionMetas } from "../middlewares/permisos";

const routerActividad = Router();

routerActividad.get ( 
    '/:idActividad',
    check('idActividad','Debe ingresar un id de actividad como parámetro').isNumeric(),
    validarParametros, 
    verActividad 
);

routerActividad.post ( 
    '/',
    validarPermisoGestionMetas,
    validarCamposActividad, 
    cargarActividad 
);
routerActividad.put ( 
    '/',
    validarPermisoGestionMetas,
    [
        ...validarCampos,
        validarSchema,
      
    ], 
    validarActividadExistente,
    validarCamposActividad, 
    editarActividad 
);

routerActividad.put (
    '/restore',
    validarActividadSuspendida,
    restaurarActividad
);

routerActividad.put (
    '/cancel',
    validarActividadExistente,
    validarMotivoSuspension,
    suspenderActividad
);

routerActividad.delete (
    '/',
    validarPermisoGestionMetas,
    validarActividadExistente,
    darDeBajaActividad
);

export default routerActividad;