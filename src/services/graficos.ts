import { Op } from "sequelize";
import sequelizeExtension, { BD } from "../config/dbConfig";
import { Actividad } from "../models/Actividad";
import { RelacionActividad } from "../models/RelacionActividad";
import { ERROR } from "../logs/errores";


export const verGraficosGeneral = async( anio : number)=>{
    
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
    salida = {...salida,...(await calcularCrucesUUAA(cActividad))}
    

  
    
    return salida;

}

export const verGraficosDeArea = async( anio : number, idArea: number)=>{
    
    let salida : any = {};

    const t = await sequelizeExtension.transaction({logging : sql => console.log(sql)});

    const ap = await BD.AreaPrograma.findOne({where : {anio,idArea}, transaction : t});
    
    if(ap) {
        const cActividad = await BD.Actividad.findAll({
            where : { 
                idArea : ap.idArea , 
                createdAt : {[Op.gt] : new Date(`${anio}-01-01`)} 
            }, transaction : t});

        await t.commit();
         
        // objetivos 
        salida = {...salida , ...(await calcularCrucesObjetivos(cActividad))}

        // uuaa
        salida = {...salida,...(await calcularCrucesUUAA(cActividad))}
     
       
    } else {

        await t.rollback();
        
        throw ERROR.AREA_INEXISTENTE;
    }
   
    
    return salida;

}


const calcularCrucesUUAA = async( cActividad : Actividad[] ) => {
    let salida : any = { }
    const t  = await sequelizeExtension.transaction({logging : sql => console.log(sql)});

    try {
        const tipoUA = await BD.TipoRelacion.findOne({ where : {nom : 'U.A.'} , transaction : t});
        
        if(!tipoUA) throw { status : 500 , message : 'No se encontro en BD tipoRel U.A.' }  

        const cUUAA = await BD.Relacion.findAll( {where : { idTipoRelacion : tipoUA.idTipoRelacion }, transaction : t});

        const cRelacionActividad : RelacionActividad[] = [] ;
        
        await Promise.all(
            cActividad.map( a =>  
                BD.RelacionActividad
                .findAll( { where : { idRelacion : cUUAA.map( ua => ua.idRelacion) ,idActividad : a.idActividad  },  transaction : t })
                .then( resp => cRelacionActividad.push(...resp))
                .catch( e => console.log(e))
            )
        );

        salida = {
    
            dataGraficoUUAA : cUUAA.map( ua => ({ 
                ua : ua.nom , 
                cantActividades : cRelacionActividad.filter( ra => ra.idRelacion === ua.idRelacion ).length 
            }) )

        }
    
        await t.commit();
    } catch (error) {
        await t.rollback();
        throw error;
    }

   

    return salida;
}

const calcularCrucesObjetivos = async( cActividad : Actividad[])=>{
    let salida  : any= {}
    const t = await sequelizeExtension.transaction({logging : sql => console.log(sql)});

    try {
        const cTipoObj = await BD.TipoObjetivo.findAll({transaction :t});
        const cObjetivo = await BD.Objetivo.findAll({transaction : t});
    
        const cObjetivoActividad = await BD.ObjetivoActividad.findAll( { where : { idActividad : cActividad.map( a => a.idActividad) }, transaction : t} )
        
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
    
    } catch (error) {
        await t.rollback();
        throw error;

    }
   

}