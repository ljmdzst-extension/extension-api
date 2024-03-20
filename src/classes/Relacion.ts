
import {  Transaction } from "sequelize";
import { BD } from "../config/dbConfig";
import Actividad from "./Actividad";
import TipoRelacion, { ID_TIPO_REL, ITipoRelacion }  from "./TipoRelacion";
import { ERROR } from "../logs/errores";
import { INVALIDO } from "../logs/validaciones";
import { ESTADO_BD } from "../types/general";


type ID_RELACION = number;

interface IRelacion {
    idRelacion : ID_RELACION;
    nom ?: string;
    tipoRelacion ?: ITipoRelacion;
}



class Relacion{
    
    public estadoEnBD !: number; 

    constructor
    (
        private data : IRelacion,
        private iTipoRelacion ?: TipoRelacion  /**Relacion -> TipoRelacion */,
        private iActividad ?: Actividad /**Relacion -> Actividad */
    ){
        this.data.tipoRelacion = iTipoRelacion?.verDatos();
        this.estadoEnBD = ESTADO_BD.A;
     }
    
    public verID() : number 
    {
        return this.data.idRelacion;
    }
    
    public verDatos () : IRelacion
    {
        return this.data;
    }

    public verTipoRelacion() : ID_TIPO_REL 
    { 
        return this.iTipoRelacion?.verDatos().idTipoRelacion || 0 
    } 

    public static async validar( data : IRelacion, transaction ?: Transaction ) : Promise<void> {
        if(data.tipoRelacion){
            await TipoRelacion.validar(data.tipoRelacion,transaction);
         }
         await new BD.RelacionActividad({idRelacion : data.idRelacion, idActividad : 0}).validate({skip : ['createdAt','updatedAt','deletedAt']});

    }
    public cargarActividad ( iActividad : Actividad ){ 
        this.iActividad = iActividad;
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
    public estaDeBaja() : boolean { 
        return this.estadoEnBD === ESTADO_BD.B;
    }
    public async guardarEnBD(transaction ?: Transaction ) : Promise<void> {
        console.log('Relacion.guardarEnBD');
       
        if(!this.iActividad) throw { status : 500, msg : `La relacion ${this.verID()} no tienne una actividad asociada`}
        
        const registro = { idActividad : this.iActividad.verID(), idRelacion : this.verID() }
        
        switch (this.estadoEnBD) {
            case ESTADO_BD.A:
                if(await BD.RelacionActividad.findOne({where : registro, paranoid : false, transaction})){
                    await BD.RelacionActividad.restore({ where :registro, transaction });
                 } else {
                    await BD.RelacionActividad.create(registro, { transaction});
                 }
                break;
            case ESTADO_BD.B:
                await BD.RelacionActividad.destroy({where : registro , transaction });
                break;
            default:
                break;
        }
    }

    public static async buscarPorIDBD(id: number, transaction?: Transaction | undefined): Promise<Relacion> 
    {
        const bdRelacion = await BD.Relacion.findByPk(id,{transaction}) ;

        if(!bdRelacion ) throw ERROR.RELACION_INEXISTENTE;

        const iTipoRelacion = await TipoRelacion.buscarPorIDBD(bdRelacion.idTipoRelacion,transaction);

        return new Relacion({...bdRelacion.dataValues, tipoRelacion : iTipoRelacion.verDatos()},iTipoRelacion) ;
    } ;
    public static async buscarPorActBD(iAct: Actividad, transaction?: Transaction | undefined): Promise<number[]> 
    {

        let salida : number[] = [];

        const bdRelacionesActividad = await BD.RelacionActividad.findAll({where : {idActividad : iAct.verID()},transaction});

        if(bdRelacionesActividad.length > 0) {

            await Promise.all(
                bdRelacionesActividad.map( async bdRelAct => {
                    const dbRel = await BD.Relacion.findByPk(bdRelAct.idRelacion,{transaction});
                    if(dbRel){
                        salida.push( dbRel.idRelacion );
                    }
                   
                } )
            )
        
        }

        return salida;

    }
    public static async verListaBD(transaction?: Transaction | undefined): Promise<IRelacion[]> 
    { 
        let salida : IRelacion[] = [];

        const bdListaRelaciones = await BD.Relacion.findAll({transaction});

        await Promise.all(

            bdListaRelaciones.map( async rel => {
                salida.push({
                    idRelacion : rel.dataValues.idRelacion,
                    nom : rel.dataValues.nom,
                    tipoRelacion : (await TipoRelacion.buscarPorIDBD(rel.idTipoRelacion)).verDatos()
                })
            })
        )


        return salida;
    } ;
    
    public static async guardarPorActBD( iActividad :Actividad , listaIds : Map<ID_RELACION,ESTADO_BD>, transaction ?: Transaction) : Promise<void> {

        if( listaIds.size < 0) {
            console.log('lista ids vacía , omitiendo...');
            return;
        }

        const ids = Array.from(listaIds.keys());
        const listaRelacions = await Promise.all( ids.map( async id => await Relacion.buscarPorIDBD(id,transaction)) );

        if( listaRelacions.length > 0) {
            listaRelacions.forEach( iRelacion => {
                iRelacion.cargarActividad(iActividad);
                if(listaIds.get(iRelacion.verID()) === ESTADO_BD.A ){
                    iRelacion.darDeAltaBD(); 
                }else {
                    iRelacion.darDeBajaBD();
                }
            
            } )
            
            await Promise.all(listaRelacions.map( async iRelacion => await iRelacion.guardarEnBD(transaction)))
        }
        


     }
    
} 

export { ID_RELACION,IRelacion }

export default Relacion;