
import { Router } from "express";

import { endpoint } from "../controllers/endpoint";

import { 
    validarActividadExistente,
    validarCamposActividad, 
    validarMotivoSuspension, 
    validarParametros, 
    validarSchema
} from "../middlewares/actividad";

import ControllerActividad from "../controllers/actividad";

import { middleware } from "../middlewares/middleware";
import {check,body,checkSchema} from 'express-validator';

const routerActividad = Router();

routerActividad.get ( 
    '/:idActividad',
    [
        check('idActividad','Debe ingresar un id de actividad como parámetro').isNumeric(),
        middleware(validarParametros)
    ], 
    endpoint( ControllerActividad.verActividad ) 
);

routerActividad.post ( 
    '/',
    [
        middleware(validarCamposActividad)
    ], 
    endpoint( ControllerActividad.cargarActividad ) 
);

routerActividad.put ( 
    '/',
    [
        ...checkSchema({
            idActividad : { isNumeric : true, errorMessage : 'idActivdad obligatorio' },
            idArea : { isNumeric : true, errorMessage : 'idArea obligatorio'   },
            desc : { escape : true, isString : true, isEmpty : { negated : true }, errorMessage : 'desc obligatorio' },
            fechaDesde : { 
                // isDate : { 
                //     if : body('fechaHasta').not().isEmpty(),
                //     options : { format : 'YYYY-MM-DD' }, 
                //     errorMessage : 'fechaDesde debe ser : YYYY-MM-DD' 
                // }
            },
            fechaHasta : { 
                // isDate : {
                //     if : body('fechaDesde').not().isEmpty(),
                //     options : { format : 'YYYY-MM-DD' }, 
                //     errorMessage : 'fechaHasta debe ser : YYYY-MM-DD' 
                // }
            },
            mot_cancel : { 
                isString : {
                    if : body('mot_cancel').not().isEmpty(),
                    errorMessage : 'mot_cancel debe ser texto',
                    
                }, 
                escape : true
               
            },
            listaRelaciones : { isArray : { options : { min : 0, max: 60 } }, errorMessage : 'listaRelaciones debe ser lista de ids' },
            'listaRelaciones.*' : { isInt : true},
            listaObjetivos : { isArray : { options : { min : 0, max: 20 } }, errorMessage : 'listaObjetivos debe ser lista de ids' },
            'listaObjetivos.*' : { isInt : true},
            listaProgramasSIPPE : { isArray : { options : { min : 0, max: 8 } }, errorMessage : 'listaProgramasSIPPE debe ser lista de ids' },
            'listaProgramasSIPPE.*' : { isInt : true},
            listaMetas : { isArray : true, errorMessage : 'listaMetas debe ser una lista' },
            'listaMetas.*.idMeta' : { isInt : true, isEmpty : { negated : true}, errorMessage : 'idMeta obligatorio, 0 si es nueva' },
            'listaMetas.*.descripcion' : {isString : {
                if : body('listaMetas.*.descripcion').not().isEmpty(),
                errorMessage : 'descripcion debe ser texto'
            }, escape : true, errorMessage : 'descripcion debe ser texto'},
            'listaMetas.*.resultado' : {isString : {
                if : body('listaMetas.*.resultado').not().isEmpty(),
                errorMessage : 'resultado debe ser texto'
            }, escape : true, errorMessage : 'resultado debe ser texto'},
            'listaMetas.*.observaciones' : {
                isString : {
                    if : body('listaMetas.*.observaciones').not().isEmpty(),
                    errorMessage : 'observaciones debe ser texto'
                }, 
                escape : true, 
               
            },
            'listaMetas.*.valoracion' : {
                isInt : {
                    if : body('listaMetas.*.valoracion').not().isEmpty(),
                    options : { min : 1, max : 4},
                    errorMessage : 'valoración debe ser número entre 1 y 4'
                
                },
                
                escape : true, 
               
            },
            listaUbicaciones : { isArray : true, errorMessage : 'listaUbicaciones debe ser una lista' },
            'listaUbicaciones.*.idUbicacion' :  { isInt : true, isEmpty : { negated : true}, errorMessage : 'idUbicacion obligatorio, 0 si es nueva' },
            'listaUbicaciones.*.enlace' :  {isEmpty : { negated : true}, errorMessage : 'enlace obligatorio ' },
            listaInstituciones : { isArray : true, errorMessage : 'listaInstituciones debe ser una lista' },
            'listaInstituciones.*.idInstitucion' :  { isInt : true, isEmpty : { negated : true}, errorMessage : 'idInstitucion obligatorio, 0 si es nueva' },
            'listaInstituciones.*.nom' :  {isEmpty : { negated : true}, errorMessage : 'nom obligatorio ' },
            'listaInstituciones.*.ubicacion' :  {isEmpty : { negated : true}, errorMessage : 'ubicacion obligatorio ' },
            listaFechasPuntuales : { isArray : true, errorMessage : 'listaFechasPuntuales debe ser una lista' },
            'listaFechasPuntuales.*.idFecha' :  { isInt : true, isEmpty : { negated : true}, errorMessage : 'idFecha obligatorio, 0 si es nueva' },
            'listaFechasPuntuales.*.fecha' :  {isEmpty : { negated : true}, errorMessage : 'fecha obligatorio ' },
            listaEnlaces : { isArray : true, errorMessage : 'listaEnlaces debe ser una lista' }
        },['body']),
        validarSchema,
        middleware(validarActividadExistente),
        middleware(validarCamposActividad)
    ], 
    endpoint( ControllerActividad.editarActividad ) 
);

routerActividad.put (
    '/cancel',
    [
        middleware(validarActividadExistente),
        middleware(validarMotivoSuspension)
    ],
    endpoint( ControllerActividad.suspenderActividad)
);

routerActividad.delete (
    '/',
    [
        middleware(validarActividadExistente)
    ],
    endpoint( ControllerActividad.darDeBajaActividad)
);

export default routerActividad;