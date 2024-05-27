import { Op, Transaction } from "sequelize";
import sequelizeExtension, { BD } from "../config/dbConfig";
import { Actividad } from "../models/Actividad";
import { AreaPrograma } from "../models/AreaPrograma"
import { Objetivo } from "../models/Objetivo";
import { ObjetivoActividad } from "../models/ObjetivoActividad";
import { TipoObjetivo, TipoObjetivoId } from "../models/TipoObjetivo";
import { Relacion } from "../models/Relacion";
import { TipoRelacion } from "../models/TipoRelacion";
import { RelacionActividad } from "../models/RelacionActividad";


export const verGraficosDeAnio = async( anio : number)=>{
    
    let salida : any = {};

    const t = await sequelizeExtension.transaction({logging : sql => console.log(sql)});

    const areasPrograma = await  BD.AreaPrograma.findAll({where : {anio}, transaction : t});
    
    const cActividad = await BD.Actividad.findAll({
        where : { 
            idArea : areasPrograma.map( ap => ap.idArea) , 
            createdAt : {[Op.gt] : new Date(`${anio}-01-01`)} 
        }, transaction : t});
   
    await t.commit();
    
    // objetivos 
       salida = {...salida , ...(await calcularCrucesObjetivos(cActividad))}

    // uuaa
    salida = {...salida,...(await calcularCrucesUUAA())}
    

  
    
    return salida;

    

}


const calcularCrucesUUAA = async( ) => {
    let salida : any = { }
    const t  = await sequelizeExtension.transaction({logging : sql => console.log(sql)});

    const tipoUA = await BD.TipoRelacion.findOne({ where : {nom : 'U.A.'} , transaction : t});
    
    if(tipoUA) {
        const cUUAA = await BD.Relacion.findAll( {where : { idTipoRelacion : tipoUA.idTipoRelacion }, transaction : t});

        const cRelacionActividad = await BD.RelacionActividad.findAll( { where : { idRelacion : cUUAA.map( ua => ua.idRelacion) }, transaction : t});

        salida = {
       
            dataGraficoUUAA : cUUAA.map( ua => ({ 
                ua : ua.nom , 
                cantActividades : cRelacionActividad.filter( ra => ra.idRelacion === ua.idRelacion ).length 
            }) )
    
        }
    } 
  
    await t.commit();

   

    return salida;
}

const calcularCrucesObjetivos = async( cActividad : Actividad[])=>{
    let salida  : any= {}
    const t = await sequelizeExtension.transaction({logging : sql => console.log(sql)});

    const cTipoObj = await BD.TipoObjetivo.findAll({transaction :t});
    const cObjetivo = await BD.Objetivo.findAll({transaction : t});

    const cObjetivoActividad = await BD.ObjetivoActividad.findAll( { where : { idActividad : cActividad.map( a => a.idActividad) }} )
    
    t.afterCommit(()=>{
        const tipoEje = cTipoObj.find( to => to.nom === 'Eje Transversal' );
        if(tipoEje) {
            const cEjes = cObjetivo.filter( o => o.tipoObjId === tipoEje.idTipoObj );
        
            const dataGraficoEjes = cEjes.map( eje => ({
                eje : eje.nom,
                cantActividades : cObjetivoActividad.filter( oa => oa.idObjetivo === eje.idObjetivo ).length 
            }));
    
            salida = {...salida, dataGraficoEjes : dataGraficoEjes }
        }
    
        const tipoLie = cTipoObj.find( to => to.nom === 'Línea Institucional Estratégica' );
        if(tipoLie) {
            const cLies = cObjetivo.filter( o => o.tipoObjId === tipoLie.idTipoObj );
            const dataGraficoLies = cLies.map( lie => ({
                lie : lie.nom,
                cantActividades : cObjetivoActividad.filter( oa => oa.idObjetivo === lie.idObjetivo ).length 
            }));
            salida = {...salida, dataGraficoLies : dataGraficoLies }
        }
        const tipoObjEst = cTipoObj.find( to => to.nom === 'Objetivo Estratégico' );
        if(tipoObjEst) {
            const cObjEst = cObjetivo.filter( o => o.tipoObjId === tipoObjEst.idTipoObj );
            const dataGraficoObjEst = cObjEst.map( objEst => ({
                objEst : objEst.nom,
                cantActividades : cObjetivoActividad.filter( oa => oa.idObjetivo === objEst.idObjetivo ).length 
            }));
            salida = {...salida, dataGraficoObjEst : dataGraficoObjEst }
        }
    })
    await t.commit();

   

    return salida;
}