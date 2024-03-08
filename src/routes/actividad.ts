
import { Router } from "express";

import { endpoint } from "../controllers/endpoint";

import { 
    validarActividadExistente,
    validarActividadSuspendida,
    validarCampos,
    validarCamposActividad, 
    validarMotivoSuspension, 
    validarParametros, 
    validarSchema
} from "../middlewares/actividad";

import ControllerActividad from "../controllers/actividad";

import { middleware } from "../middlewares/middleware";
import {check} from 'express-validator';
import { extraerToken } from "../middlewares/auth";
import { validarPermisoGestionMetas } from "../middlewares/permisos";

const routerActividad = Router();

routerActividad.get ( 
    '/:idActividad',
    check('idActividad','Debe ingresar un id de actividad como parámetro').isNumeric(),
    middleware(validarParametros), 
    endpoint( ControllerActividad.verActividad ) 
);

routerActividad.post ( 
    '/',
    validarPermisoGestionMetas,
    middleware(validarCamposActividad), 
    endpoint( ControllerActividad.cargarActividad ) 
);

routerActividad.put ( 
    '/',
    validarPermisoGestionMetas,
    [
        ...validarCampos,
        validarSchema,
      
    ], 
    middleware(validarActividadExistente),
    middleware(validarCamposActividad), 
    endpoint( ControllerActividad.editarActividad ) 
);

routerActividad.put (
    '/cancel',
    middleware(validarActividadExistente),
    middleware(validarMotivoSuspension),
    endpoint( ControllerActividad.suspenderActividad)
);

routerActividad.put (
    '/restore',
    middleware(validarActividadSuspendida),
    endpoint( ControllerActividad.restaurarActividad)
);


routerActividad.delete (
    '/',
    validarPermisoGestionMetas,
    middleware(validarActividadExistente),
    endpoint( ControllerActividad.darDeBajaActividad)
);

export default routerActividad;