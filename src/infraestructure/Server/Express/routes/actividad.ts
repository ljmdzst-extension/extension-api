
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
    validarPermisoAccesoMetas,
    validarPermisoEdicionMetas 
} from "../middlewares/permisos";

import { 
    cargarActividad, 
    darDeBajaActividad, 
    editarActividad, 
    restaurarActividad, 
    suspenderActividad, 
    verActividad 
} from "../controllers/actividad";

import {check} from 'express-validator';

const routerActividad = Router();

routerActividad.get ( 
    '/:idActividad',
    check('idActividad','Debe ingresar un id de actividad como parámetro').isNumeric(),
    validarPermisoAccesoMetas,
    validarParametros, 
    verActividad 
);

routerActividad.post ( 
    '/',
    validarPermisoEdicionMetas,
    validarCamposActividad, 
    cargarActividad 
);
routerActividad.put ( 
    '/',
    validarPermisoEdicionMetas,
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
    validarPermisoEdicionMetas,
    validarActividadSuspendida,
    restaurarActividad
);

routerActividad.put (
    '/cancel',
    validarPermisoEdicionMetas,
    validarActividadExistente,
    validarMotivoSuspension,
    suspenderActividad
);

routerActividad.delete (
    '/',
    validarPermisoEdicionMetas,
    validarActividadExistente,
    darDeBajaActividad
);

export default routerActividad;