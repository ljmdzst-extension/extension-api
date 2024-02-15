import sequelize, { Transaction } from 'sequelize';
import { initModels } from '../models/init-models';
import {data_inicial} from './data_inicial.json';

const sequelizeExtension = new sequelize.Sequelize({
    host : process.env.DB_HOST,
    username : process.env.DB_USER,
    password : process.env.DB_PASS,
    port : Number(process.env.DB_PORT) || 3306,
    database : process.env.DB_NAME,
    dialect : 'mysql',
    logging : process.env.NODE_ENV === 'development' ? console.log : undefined,
    timezone : '-03:00'
});

export const BD = initModels(sequelizeExtension);

// const iniciarTablas = async( transaction : Transaction)=>{

    
//     const cargaValoraciones = data_inicial.Valoracion.map(
//          item =>  BD.Valoracion.findOrCreate({ defaults : { ...item }, where : {idValoracion : item.idValoracion}, transaction })
//       );
//     const cargaTipoObjetivos = data_inicial.TipoObjetivo.map(
//          item =>  BD.TipoObjetivo.findOrCreate({ defaults : { ...item }, where : {idTipoObj : item.idTipoObj}, transaction })
//       );
//     const cargaTipoRelaciones = data_inicial.TipoRelacion.map(
//          item =>  BD.TipoRelacion.findOrCreate({ defaults : { ...item }, where : {idTipoRelacion : item.idTipoRelacion}, transaction })
//       );
//     const cargaObjtetivos = data_inicial.Objetivo.map(
//          item =>  BD.Objetivo.findOrCreate({ defaults : { ...item }, where : {idObjetivo : item.idObjetivo}, transaction })
//       );
//     const cargarRelaciones = data_inicial.Relacion.map(
//          item =>  BD.Relacion.findOrCreate({ defaults : { ...item }, where : {idRelacion : item.idRelacion}, transaction })
//       );
//     const cargarProgramas = data_inicial.Programa.map(
//          item =>  BD.Programa.findOrCreate({ defaults : { ...item }, where : {idPrograma : item.idPrograma}, transaction })
//       );
//     const cargarAreas = data_inicial.Area.map(
//          item =>  BD.Area.findOrCreate({ defaults : { ...item }, where : {idArea : item.idArea}, transaction })
//       );
//     const cargarProgramasSIPPE = data_inicial.ProgramaSIPPE.map(
//          item =>  BD.ProgramaSippe.findOrCreate({ defaults : { ...item }, where : {idProgramaSippe : item.idProgramaSIPPE}, transaction })
//       );

//     await Promise.all(cargarProgramas);
//     await Promise.all(cargarAreas);
//     await Promise.all(cargarProgramasSIPPE);
//     await Promise.all(cargaTipoObjetivos);
//     await Promise.all(cargaTipoRelaciones);
//     await Promise.all(cargaObjtetivos);
//     await Promise.all(cargarRelaciones);
//     await Promise.all(cargaValoraciones);
// }

export default sequelizeExtension;