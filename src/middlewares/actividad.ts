import Actividad, { IActividad } from "../classes/Actividad";
import { INVALIDO } from "../logs/validaciones";
import { BD } from "../config/dbConfig";
import { Transaction } from 'sequelize';
import { ERROR } from "../logs/errores";
import { NextFunction, request, response } from "express";
import {checkSchema,body, validationResult} from 'express-validator'



export const validarCamposActividad = async(data : IActividad, transaction ?: Transaction, transactionInsituciones ?: Transaction)=> {
 
    console.log('validando campos actividad ..')
    await Actividad.validar(data,transaction);
}

export const validarActividadExistente = async(data : IActividad, transaction ?: Transaction,transactionInsituciones ?: Transaction)=>{
    if(!await BD.Actividad.findByPk(Number(data.idActividad),{attributes : ['idActividad'], transaction})){
        throw ERROR.ACTIVIDAD_INEXISTENTE;
    }
}

export const validarActividadSuspendida = async(data : IActividad, transaction ?: Transaction,transactionInsituciones ?: Transaction)=>{
    const iActividad = await BD.Actividad.findByPk(Number(data.idActividad),{attributes : ['idActividad','motivoCancel'], transaction})
    if(!iActividad){
        throw ERROR.ACTIVIDAD_INEXISTENTE;
    }

    if(!iActividad.motivoCancel) {
        throw ERROR.ACTIVIDAD_NO_SUSPENDIDA;
    }

}

export const validarParametros = async( data : {idActividad : string}, transaction ?: Transaction, transactionInsituciones ?: Transaction) => {
 
    if((!Number(data.idActividad)) || (Number(data.idActividad) < 1)) throw INVALIDO.ID_ACT;
   
}

export const validarMotivoSuspension = async( data : IActividad,  transaction ?: Transaction, transactionInsituciones ?: Transaction )=>{

    console.log('validando motivo cancel');

    if( ! data.motivoCancel) throw INVALIDO.MOT_CANCEL_ACT;

    if( data.motivoCancel.length < 1 || data.motivoCancel.length > 500  ) {
        throw INVALIDO.MOT_CANCEL_ACT;
    }

}

export const validarSchema = (req : typeof request, resp : typeof response, next : NextFunction) =>{

    const errores = validationResult(req);

    if( ! errores.isEmpty() ) {
        const listaErrores = errores.mapped();
        return resp.status(400).json({
            ok: false,
            data : null,
            error : Object.keys(listaErrores).map( campo => listaErrores[campo].msg ),
        })
    }

    next();
}

export const validarCampos = checkSchema({
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
    motivoCancel : { 
        isString : {
            if : body('motivoCancel').not().isEmpty(),
            errorMessage : 'motivoCancel debe ser texto',
            
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
},['body']);