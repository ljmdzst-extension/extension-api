import Area, { IArea, ID_AREA }  from "./Area";
import { Transaction } from "sequelize";
import { BD } from "../config/dbConfig";
import { ERROR } from "../logs/errores";
import { INVALIDO } from "../logs/validaciones";

export type ID_PROG = number;

export interface IPrograma {
    idPrograma : number,
    nom : string,
    anio : number,
    listaAreas ?: IArea[]
}

 class Programa {

    private listaAreas !: Area[];

    constructor(
        private data : IPrograma
    ){
        this.listaAreas = [];
    }

    public async verListaAreas ( transaction ?: Transaction ) : Promise<Area[]>{
   
        return await this.buscarAreas(transaction);
    }
    
    public verDatos () : IPrograma{
        return {
            ...this.data,
            listaAreas :  this.listaAreas.map(iArea => iArea.verDatos())
        }
    }

    /**Conexion BD */

    private async buscarAreas(transaction ?: Transaction) : Promise<Area[]> {
        this.listaAreas = await Area.buscarPorProgID(this.data.idPrograma,transaction) 
        return this.listaAreas;
    }

    public static async buscarPorID(idPrograma : ID_PROG,transaction ?: Transaction) : Promise<Programa> {
        let salida : Programa = new Programa({idPrograma : 0,nom : '',anio:0});

        const bdPrograma = await BD.Programa.findByPk(idPrograma,{transaction});

        if(!bdPrograma) throw ERROR.PROGRAMA_INEXISTENTE;

        salida = new Programa(bdPrograma.dataValues);

        salida.listaAreas = await Area.buscarPorProgID(idPrograma,transaction);

        return salida;
    }

    public static async verTodosConAreas( anio : number, transaction ?: Transaction) : Promise<Programa[]>{
        let salida : Programa[] = [];

        const bdPrograma = await BD.Programa.findAll({ where : {anio}, transaction});

        if(!bdPrograma) throw ERROR.PROGRAMA_INEXISTENTE;

        bdPrograma.forEach( iProg => {
            salida.push( new Programa(iProg.dataValues));
        })

        await Promise.all(  salida.map( async prog => await prog.buscarAreas(transaction) ) );

        return salida;
    }
    public static async validarAnio ( anio : number, transaction ?: Transaction) : Promise<boolean> {
        return (await BD.Programa.findOne({where : {anio : anio},transaction})) !== null;
        
    }

}


export default Programa;