import { Transaction } from "sequelize";
import Actividad from "./Actividad";
import { BD } from "../config/dbConfig";
import { ERROR } from "../logs/errores";
import { ESTADO_BD } from "../types/general";


type ID_META = number;

interface IMeta {
    idMeta : ID_META; 
    descripcion : string; 
    resultado ?: string; 
    observaciones ?: string; 
    valoracion ?: number;
}

class Meta {
    
    public estadoEnBD !: ESTADO_BD;
    

    constructor
    (
        private data : IMeta,
        private iActividad ?: Actividad
    ){
        this.estadoEnBD = ESTADO_BD.A;
        
    }
    public darDeBaja() {
        this.estadoEnBD = ESTADO_BD.B;
    }
    public darDeAlta() {
        this.estadoEnBD = ESTADO_BD.A;
    }
    public estaDeBaja() : boolean { 
        return this.estadoEnBD === ESTADO_BD.B;
    }

    public verDatos(): IMeta
    {
        return {
            idMeta : this.data.idMeta, 
            descripcion : this.data.descripcion, 
            resultado  : this.data.resultado, 
            observaciones  : this.data.observaciones,
            valoracion : this.data.valoracion
        };
    }

    
    public editarDatos( data : IMeta ){
  
        this.data = data;
       
        this.estadoEnBD = ESTADO_BD.M;
    }

    public static async validar( data : IMeta) : Promise<void> {
        await new BD.Meta({...data,idActividad : 0}).validate({ skip : ['createdAt','updatedAt','deletedAt']})
    }
    /** Conexion BD */
    private async darDeAltaBD( registro : IMeta & {idActividad : number} , transaction ?: Transaction)
     {
        this.data.idMeta = (await BD.Meta.create({...registro, idValoracion : registro.valoracion}, { transaction})).dataValues.idMeta;
     }
     private async  darDeBajaBD(transaction ?: Transaction)
     {
        await BD.Meta.destroy({where : {idMeta : this.data.idMeta} , transaction });
     }
     private async  modificarBD(registro : IMeta & {idActividad : number}, transaction ?: Transaction){
        
        if(!await BD.Meta.findByPk(registro.idMeta,{transaction})){
            console.log(`meta ${this.data.idMeta} posiblemente dada de baja, restaurando...`)
            await BD.Meta.restore({ where : {idMeta : registro.idMeta}, transaction });
        }
        await BD.Meta.update({...registro , idValoracion : registro.valoracion},{where : {idMeta : registro.idMeta}, transaction});
        
     }
     public async guardarEnBD(transaction ?: Transaction ) : Promise<void> {
         console.log('Meta.guardarEnBD');

         if(!this.iActividad) throw { status : 500, msg : `La Meta ${this.data.idMeta} no tiene una actividad asociada`}
        
         const registro = { ...this.verDatos(), idActividad : this.iActividad.verID() }
         
         switch (this.estadoEnBD) {
             case ESTADO_BD.A:
                 await this.darDeAltaBD(registro,transaction);
                 break;
             case ESTADO_BD.M:
                 await this.modificarBD(registro,transaction);
                 break;
             case ESTADO_BD.B:
                 await this.darDeBajaBD(transaction);
                 break;
             default:
                 break;
         }
     }
    
    public static async buscarPorIDBD(id: number, transaction?: Transaction | undefined): Promise<Meta> { 
        const bdMeta = await BD.Meta.findByPk(id,{transaction});
        if(!bdMeta ) throw ERROR.META_INEXISTENTE;
        return new Meta({...bdMeta.dataValues, valoracion : bdMeta.idValoracion});
    } ;


    public static async buscarPorActBD(iAct: Actividad, transaction?: Transaction | undefined): Promise<void> {

        if(process.env.NODE_ENV === "development") console.log('cargando metas ..');

        const metas = await BD.Meta.findAll({where : {idActividad : iAct.verID()},transaction})
        iAct.cargarMetas( metas.map( meta => ({...meta.dataValues, valoracion : meta.idValoracion})) );

    }
    


}

export {IMeta,ID_META}
export default Meta;




























































































































































































