
import validator from "validator";
import { Transaction } from "sequelize";
import { ID_ACT } from "./Actividad";
import { BD } from "../config/dbConfig";
import { ERROR } from "../logs/errores";
import { INVALIDO } from "../logs/validaciones";


type ID_VALORACION = number;

interface IValoracion {
    idValoracion : ID_VALORACION,
    nom : string,
}

class Valoracion {
    
    constructor(
        private data : IValoracion
    ){}

    public verDatos() : IValoracion 
    {
        return this.data;
    }
    
    public verID() : ID_VALORACION 
    { 
        return this.data.idValoracion;
    }

    public static validar( data : IValoracion ) : void {
        if(!validator.isLength(data.nom,{min : 1, max : 256})) throw INVALIDO.NOM_VALORACION;
        if(!(data.idValoracion > 0) ) throw INVALIDO.ID_VALORACION;
    }

    /**------------------ CONEXION BD ---------------------*/
    
    public static async buscarPorIDBD(id: ID_VALORACION, transaction?: Transaction ): Promise<Valoracion> {
        const bdValoracion = await BD.Valoracion.findByPk(id,{transaction}) ;

        if(!bdValoracion ) throw ERROR.VALORACION_INEXISTENTE;

        return new Valoracion(bdValoracion.dataValues);    
    }

    public static async verListaBD(transaction?: Transaction ): Promise<IValoracion[]> { 
        let salida : IValoracion[] = [];

        salida = await BD.Valoracion.findAll({transaction});

        return salida;
    } ;
}


export { ID_VALORACION, IValoracion}

export default Valoracion;