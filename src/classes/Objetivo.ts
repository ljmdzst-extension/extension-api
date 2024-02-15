import { Op, Transaction } from "sequelize";
import { BD } from "../config/dbConfig";
import { ERROR } from "../logs/errores";
import  TipoObjetivo, { ID_TIPO_OBJ, ITipoObjetivo }  from "./TipoObjetivo";
import Actividad from "./Actividad";
import { INVALIDO } from "../logs/validaciones";
import { ESTADO_BD } from "../types/general";



type ID_OBJETIVO= number;


interface IObjetivo {
    idObjetivo : ID_OBJETIVO,
    nom ?: string,
    tipoObjetivo ?: ITipoObjetivo,
    detalle ?: string
}

class Objetivo {


    public estadoEnBD !: number;

    constructor 
    (
        private data : IObjetivo,
        private iTipoObjetivo ?: TipoObjetivo,
        private iActividad ?: Actividad
    ){
        this.data.tipoObjetivo = iTipoObjetivo?.verDatos();
        this.estadoEnBD = ESTADO_BD.A;
    }

    public verID() : number 
    {
        return this.data.idObjetivo;
    }

    public verDatos() : IObjetivo
    {
        return this.data;
    }

    public cargarActividad ( iActividad : Actividad ){ 
        this.iActividad = iActividad;
    }

    public static async validar( data : IObjetivo, transaction ?: Transaction ) : Promise<void> {
        if(data.tipoObjetivo){
           await TipoObjetivo.validar(data.tipoObjetivo,transaction);
        }
        await new BD.ObjetivoActividad({idObjetivo : data.idObjetivo, idActividad : 0}).validate({skip : ['createdAt','updatedAt','deletedAt']});
     }

    public verTipoObjetivo() : ID_TIPO_OBJ 
    { 
        return this.iTipoObjetivo?.verDatos().idTipoObj || 0; 
    } 

     /** ConexionBD */

     public darDeAltaBD()
     {
         this.estadoEnBD = ESTADO_BD.A;
     }
     public darDeBajaBD()
     {
        this.estadoEnBD = ESTADO_BD.B;
     }

     public estaDeBaja() : boolean 
     { 
        return this.estadoEnBD === ESTADO_BD.B;
    }
 
     public async guardarEnBD(transaction ?: Transaction ) : Promise<void> {
         console.log('Objetivo.guardarEnBD');
        
         if(!this.iActividad) throw { status : 500, msg : `La Objetivo ${this.verID()} no tienne una actividad asociada`}
         
         const registro = { idActividad : this.iActividad.verID(), idObjetivo : this.verID() }
    
         switch (this.estadoEnBD) {
             case ESTADO_BD.A:
                if(await BD.ObjetivoActividad.findOne({where : registro, paranoid : false, transaction})){
                    await BD.ObjetivoActividad.restore({ where :registro, transaction });
                 } else {
                    await BD.ObjetivoActividad.create(registro, { transaction});
                 }
                 break;
             case ESTADO_BD.B:
                 await BD.ObjetivoActividad.destroy({where : registro , transaction });
                 break;
             default:
                 break;
         }
     }
     
 
     public static async buscarPorIDBD(id: number, transaction?: Transaction | undefined): Promise<Objetivo> 
     {
         const bdObjetivo = await BD.Objetivo.findByPk(id,{transaction}) ;
 
         if(!bdObjetivo ) throw ERROR.OBJETIVO_INEXISTENTE;
 
         const iTipoObjetivo = await TipoObjetivo.buscarPorIDBD(bdObjetivo.tipoObjId,transaction);
 
         return new Objetivo(bdObjetivo.dataValues,iTipoObjetivo) ;
     } ;
     public static async buscarPorActBD(iAct: Actividad, transaction?: Transaction | undefined): Promise<number[]> 
     {
 
         let salida : number[] = [];
 
         const bdObjetivosActividad = await BD.ObjetivoActividad.findAll({where : {idActividad : iAct.verID()},transaction});
        
         if(bdObjetivosActividad.length > 0) {
 
             await Promise.all(
                 bdObjetivosActividad.map( async bdRelAct => {
                     const dbObj = await BD.Objetivo.findByPk(bdRelAct.idObjetivo,{transaction});
                     if(dbObj){
                         salida.push( dbObj.idObjetivo );
                     }
                    
                 } )
             )
         
         }
 
         return salida;
 
     }
     public static async verListaBD(transaction?: Transaction | undefined): Promise<IObjetivo[]> 
     { 
        let salida : IObjetivo[] = [];
 
        const bdListaObjetivos = await BD.Objetivo.findAll({transaction});
        
        await Promise.all( 
            bdListaObjetivos.map( async bdObj => salida.push( { 
                idObjetivo : bdObj.idObjetivo,
                nom : bdObj.nom,
                detalle : bdObj.detalle,
                tipoObjetivo : (await TipoObjetivo.buscarPorIDBD(bdObj.tipoObjId,transaction)).verDatos() 
            } )) 
        )

        return salida;
     } ;
     public static async guardarPorActBD( iActividad :Actividad , listaIds : Map<ID_OBJETIVO,ESTADO_BD>, transaction ?: Transaction) : Promise<void> {

        if( listaIds.size < 0) {
            console.log('lista ids vacía , omitiendo...');
            return;
        }


        const listaObjetivos = await Promise.all( Array.from(listaIds.keys()).map( async id => await Objetivo.buscarPorIDBD(id,transaction)) );

        if( listaObjetivos.length > 0) {
            listaObjetivos.forEach( iObjetivo => {
                
                iObjetivo.cargarActividad(iActividad);

                switch(listaIds.get(iObjetivo.verID())){
                    case ESTADO_BD.A : iObjetivo.darDeAltaBD(); break;
                    case ESTADO_BD.B : iObjetivo.darDeBajaBD(); break;
                    default: break;
                } 
            }  );
            
            await Promise.all(listaObjetivos.map( async iObjetivo => await iObjetivo.guardarEnBD(transaction)))
        }
        


     }
    
 } 
    

export {IObjetivo,ID_OBJETIVO}
export default Objetivo;