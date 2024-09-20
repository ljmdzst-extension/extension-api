import { Transaction } from "sequelize";
import { BD } from "../../infraestructure/db/mysql-sequelize/config/dbConfig";
import { ERROR } from "../../infraestructure/server/express/logs/errores";
import { INVALIDO } from "../../infraestructure/server/express/logs/validaciones";


type ID_TIPO_OBJ = number;

type TDataTipoObjetivo = {
    idTipoObj : ID_TIPO_OBJ,
    nom ?: string,
}

class TipoObjetivo {

    constructor
    (
       private data : TDataTipoObjetivo
    ){ }

    public verDatos () : TDataTipoObjetivo {
        return this.data;
    }

   
}

export {
    TDataTipoObjetivo,
    ID_TIPO_OBJ
};

export default TipoObjetivo;