

import { Transaction } from "sequelize";
import { BD } from "../config/dbConfig";
import { ERROR } from "../logs/errores";
import  Actividad, { IItemActividad }  from "./Actividad";
import { ID_PROG } from "./Programa";


export type ID_AREA = number;
export interface IArea {
    idArea : ID_AREA,
    idPrograma : number,
    nom : string,
    listaActividades ?: Array<IItemActividad>
}


class Area {

    private listaActividades !: Array<Actividad>;

    constructor
    (
        private data : IArea
    ){
        this.listaActividades = [];
    }

    public verActividaesPorEjeTrans()
    {

    }
    public verActividadesPorObjEst( )
    {

    }
    public verIndiceRelacionConAreasInternas()
    {

    }
    public verActividadesPorLie()
    {

    }
    public verDatos() : IArea 
    {
        return {
            ...this.data,
            listaActividades : this.listaActividades?.map(iAct => iAct.verDatos())
        };
    }

    public verID() : ID_AREA {
        return this.data.idArea;
    }

    /**Conexion BD */

    public static async buscarPorID(idArea : ID_AREA,transaction ?: Transaction):Promise<Area>{
        let salida : Area = new Area({idArea:0,idPrograma:0,nom:''});

        const bdArea = await BD.Area.findByPk(idArea,{transaction});

        if(!bdArea) throw ERROR.AREA_INEXISTENTE;

        salida = new Area(bdArea.dataValues);

        return salida;
    }
    public static async buscarPorProgID(idProg : ID_PROG,transaction ?: Transaction):Promise<Area[]>{
        let salida : Area[] = [];

        const bdAreas = await BD.Area.findAll({ where : { idPrograma : idProg }, transaction});

        if(bdAreas.length) {

            salida = bdAreas.map( item => new Area(item.dataValues));
        }


        return salida;
    }
    
    public static async buscarPorIDConAct (idArea : ID_AREA,transaction ?: Transaction): Promise<IItemActividad[]>{
        let salida : IItemActividad[] = [];

        const bdActividades = await Actividad.buscarPorAreaID(idArea,transaction);

        if(bdActividades.length){
           salida = bdActividades;
        }

        return salida;
    }
   
}


export default Area;