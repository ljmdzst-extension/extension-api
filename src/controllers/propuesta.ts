import { request, response } from "express";
import { Propuesta } from "../models/Propuesta";
import sequelizePropuestas from "../config/dbConfig";
import logger from '../config/logsConfig';
import { TPropuesta, TPutPropuesta } from "../types/propuesta";
import { Usuario } from "../models/Usuario";
import { Relacion } from "../models/Relacion";
import { armarCantPropuestasXModalidad } from "../helpers/general";
import sequelizeExtension from "../config/dbConfig";

export const verPropuesta = async(req : typeof request , res : typeof response)=>{
    
    const transaction = await sequelizePropuestas.transaction({logging : msg => console.log(msg)});
    
    try {

        /**... */

        let salida : TPropuesta = {
            codigoPropuesta : '',
            idUsuario : '',
            titulo : '',
            modalidad : '',
            lInstituciones : [],
            lIntegrantes : [],
            planificacion : {lObjetivosEspecificos : []},
            lPropuestasPrevias : [],
            lPropuestasRelacionadas : [],
            lGeolocalizaciones : [],
            lProgramasExtension : [],
            lCapacitaciones : [],
            lLineasTematicas : [],
            lPalabrasClave : []
        }
        
        const { codigoPropuesta } = req.params;

        const iPropuesta = await Propuesta.initModel(sequelizePropuestas).findByPk(codigoPropuesta,{transaction});
        
        if( ! iPropuesta ) throw {status : 400 , message : 'Proyecto no encontrado.'}

        salida = {...salida , ...iPropuesta.dataValues}

        const lPropuestasPrevias =  iPropuesta.verPropuestasPrevias(sequelizePropuestas,transaction);
        const lPropuestasRelacionadas =  iPropuesta.verPropuestasRelacionadas(sequelizePropuestas,transaction);
        const lGeolocalizaciones =  iPropuesta.verGeolocalizaciones(sequelizePropuestas,transaction);
        const lProgramasExtension =  iPropuesta.verProgramasExtension(sequelizePropuestas,transaction);
        const lCapacitaciones =  iPropuesta.verCapacitaciones(sequelizePropuestas,transaction);
        const lLineasTematicas =  iPropuesta.verLineasTematicas(sequelizePropuestas,transaction);
        const lPalabrasClave =  iPropuesta.verPalabrasClave(sequelizePropuestas,transaction);

        salida = {
            ...salida,
            lPropuestasPrevias : await lPropuestasPrevias,
            lPropuestasRelacionadas : await lPropuestasRelacionadas,
            lProgramasExtension : (await lProgramasExtension).map( item => item.idProgramaExtension),
            lCapacitaciones : (await lCapacitaciones).map(item => item.idCapacitacion),
            lLineasTematicas : (await lLineasTematicas).map(item => item.idLineaTematica),
            lGeolocalizaciones : await lGeolocalizaciones,
            lPalabrasClave : await lPalabrasClave
        }
        
        transaction.afterCommit(()=>{
            res.status(200).json({
                ok : true,
                data : salida,
                error : null
            })
        })

        await transaction.commit();

    } catch (error : any) {
        await transaction.rollback();
        logger.log('error',error.status,' - ',error.message);
        res.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.message
        })
    }
}
export const crearPropuesta = async(req : typeof request , res : typeof response)=>{
    const transaction = await sequelizePropuestas.transaction();
    try {
        /**... */
        const {idUsuario, titulo , modalidad, idUnidadAcademica} = req.body;

        const getUsuario =  Usuario.initModel(sequelizePropuestas).findByPk(idUsuario,{transaction});
        const getCantPropuestasPorModalidad =  Propuesta.initModel(sequelizePropuestas).count({where : {modalidad}, transaction});
        const getUnidadAcademica =  Relacion.initModel(sequelizePropuestas).findByPk(idUnidadAcademica,{transaction});


        const iUsuario = await getUsuario;
        if(!iUsuario) throw { status : 500 , message : 'No se encontro el usuario'}
        
        const unidadAcademica = await getUnidadAcademica;
        if(!unidadAcademica) throw { status : 500 , message : 'No se encontro la unidad academica'}
        
        const cantPropuestasPorModalidad = armarCantPropuestasXModalidad((await getCantPropuestasPorModalidad) + 1);
        const datosPersonalesUsuario = await iUsuario.verDatos(sequelizePropuestas,transaction);
        if(!datosPersonalesUsuario) throw { status : 500 , message : 'Error al cargar datos personales del usuario'}
        
        const {ape,nom} = datosPersonalesUsuario;
        const {nom : UA} = unidadAcademica.dataValues;
        const anioActual = new Date(Date.now()).getFullYear().toString();
        
        const codigoPropuesta = `${anioActual[2]}${anioActual[3]}-${cantPropuestasPorModalidad}-${modalidad}-${UA}-${ape[0]}${nom[0]}`

        const nuevaPropuesta = await Propuesta.initModel(sequelizePropuestas).create({
                codigoPropuesta ,
                titulo,
                modalidad,
                idUsuario
            },
            {transaction}
        );
        
        transaction.afterCommit(()=>{
            res.status(200).json({
                ok : true,
                data : nuevaPropuesta.dataValues,
                error : null
            })
        })

        await transaction.commit();

    } catch (error : any) {
        await transaction.rollback();
        logger.log('error',error.status,' - ',error.message);
        res.status(500).json({
            ok : false,
            data : null,
            error : 'Error de servidor'
        })
    }
}
export const editarPropuesta = async(req : typeof request , res : typeof response)=>{
    const transaction = await sequelizePropuestas.transaction({logging : msg => console.log(msg)});
    try {
        /**... */

        const {codigoPropuesta } = req.params;
        const {
            idUsuario,
            lCapacitaciones,
            lGeolocalizaciones,
            lLineasTematicas,
            lPalabrasClave,
            lProgramasExtension,
            lPropuestasPrevias,
            lPropuestasRelacionadas,
            ...datosActualizar
        } : TPutPropuesta = req.body;

        const iPropuesta = await Propuesta.initModel(sequelizePropuestas).findByPk(codigoPropuesta,{transaction});

        if(!iPropuesta) throw { status : 500 , message : 'Propuesta no encontrada'}

        const tareas = new Array<Promise<any>>();

        if(lProgramasExtension.length) tareas.push( iPropuesta.editarProgramasExtension(lProgramasExtension,sequelizeExtension,transaction) );
        if(lCapacitaciones.length) tareas.push(iPropuesta.editarCapacitaciones(lCapacitaciones,sequelizeExtension,transaction));
        if(lLineasTematicas.length) tareas.push(iPropuesta.editarLineasTematicas(lLineasTematicas,sequelizeExtension,transaction));
        if(lCapacitaciones.length) tareas.push(iPropuesta.editarCapacitaciones(lCapacitaciones,sequelizeExtension,transaction));
        if(lPalabrasClave) tareas.push(iPropuesta.editarPalabrasClave(lPalabrasClave,sequelizeExtension,transaction));
        if(lGeolocalizaciones) tareas.push(iPropuesta.editarGeolocalizaciones(lGeolocalizaciones,sequelizeExtension,transaction));
        await iPropuesta.update(datosActualizar,{transaction});

        if(tareas.length){
            await Promise.all(tareas);
        }   

        transaction.afterCommit(()=>{
            res.status(200).json({
                ok : true,
                data : null,
                error : null
            })
        });
        
        await transaction.commit();


    } catch (error : any) {
        await transaction.rollback();
        logger.log('error',error.status,' - ',error.message);
        res.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.message
        })
    }
}
export const bajaPropuesta = async(req : typeof request , res : typeof response)=>{
    try {
        /**... */
        const {codigoPropuesta,idUsuario}= req.params;

        const count = await Propuesta.initModel(sequelizePropuestas).destroy({ where : {codigoPropuesta,idUsuario}});

        if(count === 0) throw { status : 500 , message : 'No se pudo eliminar la propuesta'}

        res.status(200).json({
            ok : true,
            data : null,
            error : null
        })

    } catch (error : any) {
        logger.log('error',error.status,' - ',error.message);
        res.status(error.status || 500).json({
            ok : false,
            data : null,
            error : error.message
        })
    }
}

