import { Transaction } from "sequelize";
import { BD } from "../config/dbConfig";
import { ERROR } from "../logs/errores";
import { INVALIDO } from "../logs/validaciones";

type ID_TIPO_REL = number;

interface ITipoRelacion {
    idTipoRelacion : ID_TIPO_REL,  
    nom ?: string,
}

class TipoRelacion  {
    constructor 
    (
       private data : ITipoRelacion
    ){ }

    public verDatos () : ITipoRelacion {
        return {
            idTipoRelacion : this.data.idTipoRelacion,
            nom : this.data.nom
        }
    }

    public static async validar(data : ITipoRelacion, transaction ?: Transaction) : Promise<void> {
        if(data.idTipoRelacion < 1 ) throw INVALIDO.ID_TIPO_REL; 
        if(! await BD.TipoRelacion.findByPk(data.idTipoRelacion,{transaction}) ) throw INVALIDO.ID_TIPO_REL;
     }

    public static async verListaBD(transaction?: Transaction | undefined): Promise<ITipoRelacion[]> { 
        let salida : ITipoRelacion[] = [];

        const bdListaTipoRelacion = await BD.TipoRelacion.findAll({transaction});

        if(bdListaTipoRelacion.length > 0) {
            bdListaTipoRelacion.forEach( tipoRel => {
                salida.push(tipoRel.dataValues);
            } )
        }

        return salida;
    } ;

    public static async buscarPorIDBD(id: ID_TIPO_REL, transaction?: Transaction | undefined): Promise<TipoRelacion> {
        const bdTipoRelacion = await BD.TipoRelacion.findByPk(id,{transaction}) ;

        if(!bdTipoRelacion ) throw ERROR.TIPO_RELACION_INEXISTENTE;

        return new TipoRelacion(bdTipoRelacion.dataValues) ;   
    }
}
    


export {  
    ITipoRelacion, 
    ID_TIPO_REL
}

export default TipoRelacion;