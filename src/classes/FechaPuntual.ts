import { Transaction } from "sequelize";
import { BD } from "../config/dbConfig";
import Actividad from "./Actividad";
import { ERROR } from "../logs/errores";
import { INVALIDO } from "../logs/validaciones";
import { ESTADO_BD } from "../types/general";

export type ID_MES = number;
export type ID_FECHA = number; 

export interface IFecha {
    idFecha : ID_FECHA,
    fecha : string
}

class FechaPuntual{
  
    public estadoEnBD !: number;
    constructor(
        private data : IFecha,
        private iActividad ?: Actividad
    ){
        this.estadoEnBD = ESTADO_BD.A;
    }

    public estaEnRango(desde : Date, hasta : Date) : boolean {
        const msDesde = Date.parse(desde.toString());
        const msHasta = Date.parse(hasta.toString());
        const msFecha = Date.parse(this.data.fecha.toString());
        return  msDesde <= msFecha && msFecha <= msHasta;
    }
    
    public verDatos (): IFecha 
    {
        return this.data;
    }
    public static validar( data : IFecha, desde : Date, hasta : Date ){
        const fecha = new FechaPuntual(data);
        if(! fecha.estaEnRango(desde,hasta) ) throw INVALIDO.RANGO_FECHA_PUNTUAL ;
    }

    /** Conexion BD */
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
        console.log('FechaPuntual.guardarEnBD');
       
        if(!this.iActividad) throw { status : 500, msg : `La FechaPuntual ${this.data.idFecha} no tienne una actividad asociada`}
        
        switch (this.estadoEnBD) {
            case ESTADO_BD.A:
                await this.darDeAlta(transaction);
                break;
            case ESTADO_BD.B:
                await BD.FechaPuntualActividad.destroy({where : {idFecha : this.data.idFecha, idActividad : this.iActividad.verID()} , transaction });
                break;
            default:
                break;
        }
    }

    private async darDeAlta( transaction ?: Transaction) {
        if(!this.iActividad) throw { status : 500, msg : `La FechaPuntual ${this.data.idFecha} no tienne una actividad asociada`}

        const fechaCargada = await BD.FechaPuntual.findOne({ where : {fecha : this.data.fecha} ,transaction});
        if(!fechaCargada) {
            this.data.idFecha = (await BD.FechaPuntual.create(this.data, { transaction})).dataValues.idFecha;
        } else {
            this.data.idFecha = fechaCargada.idFecha;
        }


        const registroRelacion = {idFecha : this.data.idFecha, idActividad : this.iActividad.verID() }
        if(await BD.FechaPuntualActividad.findOne({where : registroRelacion, paranoid : false,transaction})){
            await BD.FechaPuntualActividad.restore({where : registroRelacion, transaction });
        }else {
            await BD.FechaPuntualActividad.create(registroRelacion,{ transaction });
        }
        
    }
    public static async buscarPorIDBD(id: number, transaction?: Transaction | undefined): Promise<FechaPuntual> { 
        const bdFechaPuntual = await BD.FechaPuntual.findByPk(id,{transaction});
        if(!bdFechaPuntual ) throw ERROR.FECHA_PUNTUAL_INEXISTENTE;
        return new FechaPuntual(bdFechaPuntual.dataValues);
    } ;
    public static async buscarPorActBD(iAct: Actividad, transaction?: Transaction | undefined): Promise<Array<FechaPuntual>> {

        let salida : FechaPuntual[] = [];

        const bdFechasPuntualesActividad = await BD.FechaPuntualActividad.findAll({where : {idActividad : iAct.verID()},transaction});

        if(bdFechasPuntualesActividad.length > 0) {

           await Promise.all(
            bdFechasPuntualesActividad.map( async bdFechaPuntualActividad => {
                const bdFechaPuntual = await BD.FechaPuntual.findByPk(bdFechaPuntualActividad.idFecha,{transaction});
                if(bdFechaPuntual){
                    salida.push( new FechaPuntual(bdFechaPuntual.dataValues,iAct) )
                } else 
                    console.log(`fecha puntual ${bdFechaPuntualActividad.idFecha} no existe en bd`);
            } )
           )
        
        }

        return salida;

    }
}

export default FechaPuntual;