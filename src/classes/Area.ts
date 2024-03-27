

import { Transaction } from "sequelize";
import sequelizeExtension, { BD } from "../config/dbConfig";
import { ERROR } from "../logs/errores";
import  Actividad, { IItemActividad, IRequestActividad, IResponseActividad }  from "./Actividad";
import { ColaDeTareas } from "../helpers/tareas";


export type ID_AREA = number;
export interface IArea {
    idArea : ID_AREA,
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
        let salida = {
            ...this.data,
           
        };

        if(this.listaActividades?.length) {
            salida = {...salida ,  listaActividades : this.listaActividades?.map(iAct => iAct.verDatos())}
        }

        return salida; 
    }

    public verID() : ID_AREA {
        return this.data.idArea;
    }

    /**Conexion BD */


    public static async verResumen( idArea : ID_AREA, anio : number, offset ?: number, limit ?: number ) : Promise<IResponseActividad[]>{

        let salida : IResponseActividad[] = [];

        const listaActividades = await Area.buscarPorIDConAct(Number(idArea), Number(anio) ,offset,limit);
        
        if(listaActividades.length > 0){

            const cola = new ColaDeTareas();

            listaActividades.forEach( act => 
                    cola.push( ()=> Actividad.buscarPorIDBD(act.idActividad).then( act => salida.push(act.verDatos() ) ) )
            );
            
            await cola.resolverSinDelay();
        }

        return salida;
    }

    public static async buscarPorID(idArea : ID_AREA,transaction ?: Transaction):Promise<Area>{
        let salida : Area = new Area({idArea:0,nom:''});

        const bdArea = await BD.Area.findByPk(idArea,{transaction});

        if(!bdArea) throw ERROR.AREA_INEXISTENTE;

        salida = new Area(bdArea.dataValues);

        return salida;
    }

    public static async buscarPorListaID(ids : ID_AREA[],transaction ?: Transaction):Promise<Area[]>{
        let salida : Area[] = [];

        const bdAreas = await BD.Area.findAll({ where : { idArea : ids }, transaction});

        if(bdAreas.length) {

            salida = bdAreas.map( item => new Area(item.dataValues));
        }


        return salida;
    }
    
    public static async buscarPorIDConAct (idArea : ID_AREA,anio : number, offset ?: number, limit ?: number, transaction ?: Transaction): Promise<IItemActividad[]>{
        let salida : IItemActividad[] = [];

        const bdActividades = await Actividad.buscarPorAreaID(idArea,anio,offset,limit,transaction);

        if(bdActividades.length){
           salida = bdActividades;
        }

        return salida;
    }


    
}


export default Area;