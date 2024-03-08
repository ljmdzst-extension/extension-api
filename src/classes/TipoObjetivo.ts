import { Transaction } from "sequelize";
import { BD } from "../config/dbConfig";
import { ERROR } from "../logs/errores";
import { INVALIDO } from "../logs/validaciones";


type ID_TIPO_OBJ = number;

interface ITipoObjetivo {
    idTipoObj : ID_TIPO_OBJ,
    nom ?: string,
}

class TipoObjetivo {

    constructor
    (
       private data : ITipoObjetivo
    ){ }

    public verDatos () : ITipoObjetivo {
        return this.data;
    }

    public static async validar(data : ITipoObjetivo, transaction ?: Transaction) : Promise<void> {
        if(data.idTipoObj < 1 ) throw INVALIDO.ID_TIPO_OBJ; 
        if(! await BD.TipoObjetivo.findByPk(data.idTipoObj,{transaction}) ) throw INVALIDO.ID_TIPO_OBJ;
     }

    public static async verListaBD(transaction?: Transaction | undefined): Promise<ITipoObjetivo[]> { 
        let salida : ITipoObjetivo[] = [];

        salida = await BD.TipoObjetivo.findAll({transaction});

        return salida;
    } ;
    public static async buscarPorIDBD(id: ID_TIPO_OBJ, transaction?: Transaction | undefined): Promise<TipoObjetivo> {
        const bdTipoObjetivo = await BD.TipoObjetivo.findByPk(id,{transaction}) ;

        if(!bdTipoObjetivo ) throw ERROR.TIPO_OBJ_INEXISTENTE;

        return new TipoObjetivo(bdTipoObjetivo.dataValues) ;   
    }
}

export {
    ITipoObjetivo,
    ID_TIPO_OBJ
};

export default TipoObjetivo;