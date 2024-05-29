import Area, { IArea, ID_AREA }  from "./Area";
import { Transaction } from "sequelize";
import { BD } from "../config/dbConfig";
import { ERROR } from "../logs/errores";
import { INVALIDO } from "../logs/validaciones";

export type ID_PROG = number;

export interface IPrograma {
    idPrograma : number,
    nom : string,
    listaAreas : IArea[]
}

 class Programa {

    private listaAreas !: Area[];

    constructor(
        private data : IPrograma
    ){
        this.listaAreas = [];
    }

    public verListaAreas (  ) : Area[]{
   
        return this.listaAreas;
    }
    
    public verDatos () : IPrograma{
        return {
            ...this.data,
            listaAreas :  this.listaAreas.map(iArea => iArea.verDatos())
        }
    }

    /**Conexion BD */

    private async leerAreasDeBD ( ids : ID_AREA[], transaction ?: Transaction ) : Promise<Area[]>{
       return Area.buscarPorListaID( ids,transaction).then( resp => this.listaAreas = resp ); 
    }

    public static async buscarPorID(idPrograma : ID_PROG , transaction ?: Transaction) : Promise<Programa> {
        let salida : Programa = new Programa({idPrograma : 0,nom : '', listaAreas : []});

        const bdPrograma = await BD.Programa.findByPk(idPrograma,{transaction});

        if(!bdPrograma) throw ERROR.PROGRAMA_INEXISTENTE;

        salida = new Programa({...bdPrograma.dataValues, listaAreas : []});

        return salida;
    }

    public static async verTodosConAreas( anio : number, idUsuario ?: string ,idCategoriaUsuario ?: number ,transaction ?: Transaction) : Promise<Programa[]>{
        let salida : Programa[] = [];

        const areasProgramas = await BD.AreaPrograma.findAll({where : {anio}, transaction});
  
        // if(idCategoriaUsuario) {
        //     const areasDeUsuario  = await BD.AreaProgramaCategoriaUsuario.findAll({
        //         where : {
        //             idCategoria : idCategoriaUsuario , 
        //             idUsuario : idUsuario,
        //             anio
        //         }, 
        //         transaction});
        //     areasProgramas = areasProgramas.filter( areaProg => 
        //             areasDeUsuario.find( ({idArea,idPrograma,anio}) => 
        //                 idArea === areaProg.idArea && 
        //                 idPrograma === areaProg.idPrograma && 
        //                 anio === areaProg.anio 
        //             ));
        // }

        const programas = await BD.Programa.findAll({ 
            where : {
                idPrograma : areasProgramas.map( areaProg => areaProg.idPrograma)
            }, 
            transaction
        });

        if(programas.length) {
         
            programas.forEach( iProg => {
                salida.push( new Programa({...iProg.dataValues , listaAreas: []}) );
            })

            await Promise.all(  
                salida.map( prog => prog.leerAreasDeBD(
                    areasProgramas.filter(areaProg => areaProg.idPrograma === prog.verDatos().idPrograma)
                                .map( areaProg => areaProg.idArea )
                    ),
                    transaction 
                )  
            );

       }
       
       return salida;
    }


}


export default Programa;